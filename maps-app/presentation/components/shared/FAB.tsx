import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { useThemeColor } from '@/presentation/hooks/useThemeColor';

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function FAB({ iconName, onPress, style }: Props) {
  const primaryColor = useThemeColor({}, 'tint');
  const contentColor = useThemeColor({}, 'background');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: primaryColor, opacity: pressed ? 0.7 : 1 },
        style,
      ]}
    >
      <Ionicons name={iconName} size={28} color={contentColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
