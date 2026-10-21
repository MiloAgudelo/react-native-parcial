import { Platform, type TextStyle, type ViewStyle } from 'react-native';

const roundedFont = Platform.select({
  ios: 'ui-rounded',
  default: 'normal',
  web: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
});

/**
 * Soft aesthetic / paper palette — use consistently on login and chat (ignore system dark mode).
 */
export const Paper = {
  background: '#FAF9F6',
  accent: '#FFD1DC',
  bubbleMine: '#FFB7C5',
  bubbleOtherBg: '#FFFFFF',
  bubbleOtherBorder: '#E8E4E0',
  text: '#4A4A4A',
  textMuted: '#6B6B6B',
  inputBg: '#FFFFFF',
  sendHeart: '#FFB7C5',
} as const;

/**
 * Sombra suave para burbujas / botones.
 * En Android, `elevation` + `borderRadius` en la misma vista suele recortar el texto
 * multilínea; iOS mantiene sombra; Android queda plano (sin elevation).
 */
export const bubblePaperShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  android: {
    elevation: 0,
  },
  default: {},
});

export const paperRoundedFont: TextStyle = {
  fontFamily: roundedFont,
};
