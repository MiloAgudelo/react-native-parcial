import {
  deleteMessage,
  fetchRecentMessages,
  insertMessage,
  type MessageRow,
  subscribeToMessagesRealtime,
  updateMessage,
} from '@/lib/messages';
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import {
  getChatGreetingTypewriterWords,
  getCoupleDisplayName,
  getInputPlaceholder,
  getTimeOfDayGreeting,
} from '@/constants/couple';
import { bubblePaperShadow, Paper, paperRoundedFont } from '@/constants/paper-theme';
import { ChatMessageText } from '@/components/chat-message-text';
import { LoginTypewriterLine } from '@/components/auth/login-typewriter-line';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const SWIPE_REVEAL = 88;
const SWIPE_THRESHOLD = -44;
const SNAP_CONFIG = { duration: 200, easing: Easing.out(Easing.quad) };

function makeTempId(): string {
  const c = globalThis.crypto;
  return `temp:${c?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
}

function SwipeableBubble({
  onEdit,
  onDelete,
  onSwipeOpen,
  children,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onSwipeOpen: (close: () => void) => void;
  children: ReactNode;
}) {
  const tx = useSharedValue(0);
  const startX = useSharedValue(0);

  const closeSwipe = useCallback(() => {
    tx.value = withTiming(0, SNAP_CONFIG);
  }, [tx]);

  const notifyOpen = useCallback(() => {
    void Haptics.selectionAsync();
    onSwipeOpen(closeSwipe);
  }, [onSwipeOpen, closeSwipe]);

  const pan = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .onBegin(() => {
      startX.value = tx.value;
    })
    .onUpdate((e) => {
      tx.value = Math.max(-SWIPE_REVEAL, Math.min(0, startX.value + e.translationX));
    })
    .onEnd(() => {
      if (tx.value < SWIPE_THRESHOLD) {
        tx.value = withTiming(-SWIPE_REVEAL, SNAP_CONFIG);
        runOnJS(notifyOpen)();
      } else {
        tx.value = withTiming(0, SNAP_CONFIG);
      }
    });

  const bubbleAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }],
  }));

  const actionsAnim = useAnimatedStyle(() => ({
    opacity: interpolate(tx.value, [-SWIPE_REVEAL, -16, 0], [1, 0.5, 0], 'clamp'),
  }));

  const handleEdit = useCallback(() => {
    closeSwipe();
    onEdit();
  }, [closeSwipe, onEdit]);

  const handleDelete = useCallback(() => {
    closeSwipe();
    onDelete();
  }, [closeSwipe, onDelete]);

  return (
    <View style={styles.swipeWrap}>
      <Animated.View style={[styles.swipeActions, actionsAnim]}>
        <Pressable
          style={styles.swipeBtn}
          onPress={handleEdit}
          accessibilityRole="button"
          accessibilityLabel="Editar mensaje">
          <Ionicons name="pencil" size={18} color={Paper.text} />
        </Pressable>
        <Pressable
          style={[styles.swipeBtn, styles.swipeBtnDanger]}
          onPress={handleDelete}
          accessibilityRole="button"
          accessibilityLabel="Eliminar mensaje">
          <Ionicons name="trash-outline" size={18} color="#B54545" />
        </Pressable>
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View style={bubbleAnim}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

function mergeInsert(prev: MessageRow[], row: MessageRow): MessageRow[] {
  if (prev.some((m) => m.id === row.id)) {
    return prev;
  }
  const tempIdx = prev.findIndex(
    (m) =>
      m.id.startsWith('temp:') &&
      m.sender_id === row.sender_id &&
      m.content === row.content,
  );
  if (tempIdx !== -1) {
    const next = [...prev];
    next[tempIdx] = row;
    return next;
  }
  return [row, ...prev];
}

export function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const draftBeforeEditRef = useRef<string | null>(null);
  const composerInputRef = useRef<TextInput>(null);
  const openSwipeCloseFnRef = useRef<(() => void) | null>(null);
  const inputTextRef = useRef('');

  const handleSwipeOpen = useCallback((close: () => void) => {
    openSwipeCloseFnRef.current?.();
    openSwipeCloseFnRef.current = close;
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null);
      setUserEmail(user?.email ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUserId(session?.user?.id ?? null);
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!editingMessageId) return;
    const id = setTimeout(() => composerInputRef.current?.focus(), 80);
    return () => clearTimeout(id);
  }, [editingMessageId]);

  const displayName = getCoupleDisplayName(userEmail);
  const saludo = getTimeOfDayGreeting();
  const typewriterWords = getChatGreetingTypewriterWords(displayName);
  const welcomeLine = displayName ? `${saludo}, ${displayName}` : saludo;
  const inputPlaceholder = getInputPlaceholder(displayName);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchRecentMessages(supabase, 20);
        if (!cancelled) setMessages(rows);
      } catch (e) {
        console.error(e);
        Alert.alert('Error', 'No se pudieron cargar los mensajes.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const unsub = subscribeToMessagesRealtime(supabase, {
      onInsert: (row) => {
        setMessages((prev) => mergeInsert(prev, row));
      },
      onUpdate: (row) => {
        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === row.id);
          if (idx === -1) return prev;
          const next = [...prev];
          next[idx] = row;
          return next;
        });
      },
      onDelete: (id) => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      },
    });
    return unsub;
  }, []);

  const handleDelete = useCallback(
    (item: MessageRow) => {
      if (!currentUserId) return;
      const id = item.id;
      let previous: MessageRow[] = [];
      setMessages((prev) => {
        previous = prev;
        return prev.filter((m) => m.id !== id);
      });
      void deleteMessage(supabase, { id, sender_id: currentUserId }).catch((e) => {
        console.error(e);
        setMessages(previous);
        Alert.alert('Error', 'No se pudo eliminar el mensaje.');
      });
    },
    [currentUserId],
  );

  const handleChangeText = useCallback((text: string) => {
    inputTextRef.current = text;
    setInput(text);
  }, []);

  const cancelEdit = useCallback(() => {
    const draft = draftBeforeEditRef.current ?? '';
    inputTextRef.current = draft;
    setInput(draft);
    draftBeforeEditRef.current = null;
    setEditingMessageId(null);
  }, []);

  const saveEdit = useCallback(async () => {
    if (!editingMessageId || !currentUserId) return;
    const text = inputTextRef.current.trim();
    if (!text) {
      Alert.alert('Vacío', 'Escribe algo o cancela.');
      return;
    }
    const id = editingMessageId;
    draftBeforeEditRef.current = null;
    setEditingMessageId(null);
    inputTextRef.current = '';
    setInput('');

    let previous: MessageRow[] = [];
    setMessages((prev) => {
      previous = prev;
      return prev.map((m) => (m.id === id ? { ...m, content: text } : m));
    });
    try {
      await updateMessage(supabase, { id, content: text, sender_id: currentUserId });
      Keyboard.dismiss();
    } catch (e) {
      console.error(e);
      setMessages(previous);
      Alert.alert('Error', 'No se pudo guardar el mensaje.');
    }
  }, [editingMessageId, currentUserId]);

  const send = useCallback(async () => {
    if (editingMessageId) return;
    const text = inputTextRef.current.trim();
    if (!text || sending || !currentUserId) return;

    const tempId = makeTempId();
    const now = new Date().toISOString();
    const optimistic: MessageRow = {
      id: tempId,
      created_at: now,
      content: text,
      sender_id: currentUserId,
    };

    inputTextRef.current = '';
    setInput('');
    setSending(true);
    setMessages((prev) => [optimistic, ...prev]);

    try {
      const saved = await insertMessage(supabase, { content: text, sender_id: currentUserId });
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === tempId);
        if (idx === -1) return mergeInsert(prev, saved);
        const next = [...prev];
        next[idx] = saved;
        return next;
      });
    } catch (e) {
      console.error(e);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      Alert.alert('Error', 'No se pudo enviar el mensaje.');
    } finally {
      setSending(false);
    }
  }, [sending, editingMessageId, currentUserId]);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? insets.top : 0;

  if (loading) {
    return (
      <SafeAreaView style={[styles.flex, styles.root]} edges={['top', 'bottom']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Paper.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, styles.root]} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={[styles.welcomeHeader, { paddingTop: Math.max(insets.top, 10) }]}>
          <Image
            source={require('@/assets/images/couple-picture.png')}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          {typewriterWords.length > 0 ? (
            <LoginTypewriterLine
              prefix={`${saludo}, `}
              words={typewriterWords}
              fontFamily={paperRoundedFont.fontFamily}
              fontFamilyBold={paperRoundedFont.fontFamily}
              compact
            />
          ) : (
            <Text style={[styles.welcomeText, paperRoundedFont]} numberOfLines={2}>
              {welcomeLine}
            </Text>
          )}
          <Pressable
            onPress={() => supabase.auth.signOut()}
            hitSlop={14}
            style={styles.signOutIconBtn}
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión">
            <Ionicons name="log-out-outline" size={22} color={Paper.textMuted} />
          </Pressable>
        </View>

        <FlatList
          style={styles.flex}
          data={messages}
          inverted
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const mine = currentUserId != null && item.sender_id === currentUserId;
            const canManage = mine && !item.id.startsWith('temp:');
            const bubble = (
              <View
                style={[
                  styles.bubble,
                  bubblePaperShadow,
                  mine ? styles.bubbleMine : styles.bubbleOther,
                ]}>
                <ChatMessageText
                  text={item.content}
                  playTypewriter={false}
                  onTypewriterDone={() => {}}
                />
              </View>
            );
            return (
              <View
                style={[styles.bubbleRow, mine ? styles.bubbleRowMine : styles.bubbleRowOther]}>
                {canManage ? (
                  <SwipeableBubble
                    onEdit={() => {
                      draftBeforeEditRef.current = inputTextRef.current;
                      setEditingMessageId(item.id);
                      inputTextRef.current = item.content;
                      setInput(item.content);
                    }}
                    onDelete={() => handleDelete(item)}
                    onSwipeOpen={handleSwipeOpen}>
                    {bubble}
                  </SwipeableBubble>
                ) : (
                  bubble
                )}
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={[styles.empty, paperRoundedFont]}>
              Aún no hay mensajes. ¡Escribe el primero!
            </Text>
          }
        />

        <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          {editingMessageId ? (
            <Pressable
              onPress={cancelEdit}
              style={styles.composerCancelBtn}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Cancelar edición">
              <Ionicons name="close-circle-outline" size={26} color={Paper.textMuted} />
            </Pressable>
          ) : null}
          <TextInput
            ref={composerInputRef}
            style={[styles.input, paperRoundedFont, editingMessageId && styles.inputEditing]}
            placeholder={editingMessageId ? 'Edita el mensaje…' : inputPlaceholder}
            placeholderTextColor={Paper.textMuted}
            value={input}
            onChangeText={handleChangeText}
            multiline
          />
          <Pressable
            style={[
              styles.sendBtn,
              sending && styles.sendBtnDisabled,
              editingMessageId && styles.sendBtnConfirm,
            ]}
            onPress={editingMessageId ? () => void saveEdit() : send}
            disabled={sending}
            accessibilityRole="button"
            accessibilityLabel={editingMessageId ? 'Confirmar edición' : 'Enviar mensaje'}>
            <Ionicons
              name={editingMessageId ? 'checkmark' : 'send'}
              size={26}
              color={editingMessageId ? Paper.text : Paper.sendHeart}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { backgroundColor: Paper.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 10,
    gap: 12,
    backgroundColor: Paper.background,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Paper.accent,
  },
  welcomeText: {
    flex: 1,
    color: Paper.text,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  signOutIconBtn: { padding: 6 },
  listContent: { paddingHorizontal: 14, paddingVertical: 8, flexGrow: 1 },
  bubbleRow: {
    marginVertical: 5,
    maxWidth: '100%',
  },
  bubbleRowMine: { alignItems: 'flex-end' },
  bubbleRowOther: { alignItems: 'flex-start' },
  bubble: {
    maxWidth: '85%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bubbleMine: {
    backgroundColor: Paper.bubbleMine,
  },
  bubbleOther: {
    backgroundColor: Paper.bubbleOtherBg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Paper.bubbleOtherBorder,
  },
  swipeWrap: {
    alignSelf: 'flex-end',
  },
  swipeActions: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 2,
  },
  swipeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Paper.inputBg,
    borderWidth: 1,
    borderColor: Paper.bubbleOtherBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeBtnDanger: {
    borderColor: '#EEC8C8',
    backgroundColor: '#FFF8F8',
  },
  empty: {
    textAlign: 'center',
    color: Paper.textMuted,
    padding: 24,
    fontSize: 15,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 10,
    backgroundColor: Paper.background,
  },
  input: {
    flex: 1,
    backgroundColor: Paper.inputBg,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    maxHeight: 220,
    color: Paper.text,
    borderWidth: 1,
    borderColor: Paper.bubbleOtherBorder,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Paper.inputBg,
    borderWidth: 1,
    borderColor: Paper.bubbleOtherBorder,
  },
  sendBtnDisabled: { opacity: 0.5 },
  sendBtnConfirm: {
    backgroundColor: Paper.bubbleMine,
    borderColor: Paper.accent,
  },
  composerCancelBtn: {
    paddingBottom: 10,
    justifyContent: 'center',
  },
  inputEditing: {
    borderColor: Paper.accent,
    borderWidth: 1.5,
  },
});
