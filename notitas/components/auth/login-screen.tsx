import { LoginHeroPhoto } from '@/components/auth/login-hero-photo';
import { LoginTypewriterLine } from '@/components/auth/login-typewriter-line';
import { supabase } from '@/lib/supabase';
import { DEV_LOGIN_PRESETS } from '@/constants/dev-login';
import { Paper, paperRoundedFont } from '@/constants/paper-theme';
import { Nunito_600SemiBold, Nunito_700Bold, useFonts } from '@expo-google-fonts/nunito';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Primera línea + salto; la segunda termina en “nuestra ” y sigue la palabra animada. */
const TYPEWRITER_PREFIX = 'Un rincón solo para\nnuestra ';
const TYPEWRITER_WORDS = ['historia', 'charla', 'risa', 'calma', 'complicidad'];

export function LoginScreen() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn() {
    if (!email.trim() || !password) {
      Alert.alert('Faltan datos', 'Introduce email y contraseña.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) Alert.alert('No se pudo entrar', error.message);
  }

  async function quickLogin(presetEmail: string, presetPassword: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: presetEmail,
      password: presetPassword,
    });
    setLoading(false);
    if (error) Alert.alert('Error', error.message);
  }

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={[styles.flex, styles.root]} edges={['top', 'bottom']}>
        <View style={styles.fontLoading}>
          <ActivityIndicator size="large" color={Paper.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, styles.root]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={0}>
        <View style={styles.container}>
          <View style={styles.heroBlock}>
            <LoginHeroPhoto />
            <LoginTypewriterLine
              prefix={TYPEWRITER_PREFIX}
              words={TYPEWRITER_WORDS}
              fontFamily="Nunito_600SemiBold"
              fontFamilyBold="Nunito_700Bold"
            />
          </View>

          <TextInput
            style={[styles.input, paperRoundedFont]}
            placeholder="Correo"
            placeholderTextColor={Paper.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, paperRoundedFont]}
            placeholder="Contraseña"
            placeholderTextColor={Paper.textMuted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={[styles.button, { backgroundColor: Paper.accent }]}
            onPress={signIn}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color={Paper.text} />
            ) : (
              <Text style={[styles.buttonText, paperRoundedFont]}>Ingresar</Text>
            )}
          </Pressable>

          {__DEV__ && DEV_LOGIN_PRESETS.length > 0 && (
            <View style={styles.devBox}>
              <View style={styles.devRow}>
                {DEV_LOGIN_PRESETS.map((p) => (
                  <Pressable
                    key={p.label}
                    style={[styles.chip, { borderColor: Paper.accent }]}
                    onPress={() => quickLogin(p.email, p.password)}
                    disabled={loading}>
                    <Text style={[styles.chipText, paperRoundedFont, { color: Paper.text }]}>
                      {p.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { backgroundColor: Paper.background },
  fontLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 14,
  },
  heroBlock: {
    alignSelf: 'stretch',
    width: '100%',
    alignItems: 'flex-start',
    gap: 0,
  },
  input: {
    borderWidth: 1,
    borderColor: Paper.bubbleOtherBorder,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: Paper.inputBg,
    color: Paper.text,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: Paper.text, fontWeight: '600', fontSize: 17 },
  devBox: { marginTop: 28 },
  devRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  chip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: Paper.inputBg,
  },
  chipText: { fontWeight: '500', fontSize: 14 },
});
