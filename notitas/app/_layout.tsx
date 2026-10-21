import { LoginScreen } from '@/components/auth/login-screen';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Paper } from '@/constants/paper-theme';
import { supabase } from '@/lib/supabase';
import { savePushToken, removePushToken } from '@/lib/push-tokens';
import type { Session } from '@supabase/supabase-js';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

/** Light navigation theme only — app is paper aesthetic; never use DarkTheme here. */
const paperNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Paper.background,
    card: Paper.background,
    text: Paper.text,
    primary: Paper.accent,
  },
};

// Show notifications even when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Android requires an explicit notification channel for HIGH importance
if (Platform.OS === 'android') {
  void Notifications.setNotificationChannelAsync('default', {
    name: 'Notitas',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
  });
}

async function registerPushToken(userId: string): Promise<string | null> {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;
  const { data: token } = await Notifications.getExpoPushTokenAsync({
    projectId: '77dd27a9-c17e-400a-b1cc-8345ac7628d8',
  });
  await savePushToken(supabase, userId, token);
  return token;
}

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const pushTokenRef = useRef<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setReady(true);
      if (s?.user) {
        void registerPushToken(s.user.id).then((t) => {
          pushTokenRef.current = t;
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) {
        void registerPushToken(s.user.id).then((t) => {
          pushTokenRef.current = t;
        });
      } else if (pushTokenRef.current) {
        void removePushToken(supabase, pushTokenRef.current);
        pushTokenRef.current = null;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={paperNavigationTheme}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Paper.background }}>
            <ActivityIndicator size="large" color={Paper.accent} />
          </View>
          <StatusBar style="dark" />
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  if (!session) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={paperNavigationTheme}>
          <LoginScreen />
          <StatusBar style="dark" />
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={paperNavigationTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Paper.background },
          }}>
          <Stack.Screen name="index" />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
