import type { PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = PropsWithChildren<{ scroll?: boolean }>;

export function Screen({ children, scroll = false }: Props) {
  const insets = useSafeAreaInsets();

  if (scroll) {
    return (
      <ScrollView
        className="flex-1 bg-zinc-950"
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 bg-zinc-950" style={{ paddingTop: insets.top }}>
      {children}
    </View>
  );
}
