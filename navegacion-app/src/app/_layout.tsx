import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "WorkSans-Black": require("../../assets/fonts/WorkSans-Black.ttf"),
    "WorkSans-Light": require("../../assets/fonts/WorkSans-Light.ttf"),
    "WorkSans-MediumItalic": require("../../assets/fonts/WorkSans-MediumItalic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
    SplashScreen.hide();
  }

  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Slot></Slot>
    </GestureHandlerRootView>
  );
}

export default RootLayout;