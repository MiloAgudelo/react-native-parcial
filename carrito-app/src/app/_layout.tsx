import { CartProvider } from "@/store/cart.store";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Slot />
      </CartProvider>
    </GestureHandlerRootView>
  );
}
