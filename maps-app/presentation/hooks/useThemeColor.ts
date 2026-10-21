import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/presentation/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // React Native puede devolver 'unspecified'; en ese caso se usa el tema claro.
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
