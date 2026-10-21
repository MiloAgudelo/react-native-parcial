import { Paper } from '@/constants/paper-theme';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TYPING_MS = 75;
const PAUSE_AFTER_WORD_MS = 2600;
const DELETING_MS = 40;

type Mode = 'type' | 'erase';

type Props = {
  /** Texto fijo; la animación solo afecta la última palabra. Puede incluir `\n` para varios renglones. */
  prefix: string;
  /** Palabras que rotan (solo la última “frase” animada). */
  words: string[];
  /** Fuente del cuerpo (p. ej. Nunito semibold). */
  fontFamily?: string;
  /** Fuente de la palabra animada (p. ej. Nunito bold). */
  fontFamilyBold?: string;
  /** Tamaños más pequeños para cabeceras (p. ej. chat). */
  compact?: boolean;
};

/**
 * Muestra `prefix` + una palabra escrita/borrada al estilo máquina de escribir, luego pasa a la siguiente.
 */
export function LoginTypewriterLine({
  prefix,
  words,
  fontFamily,
  fontFamilyBold,
  compact,
}: Props) {
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState('');
  const [mode, setMode] = useState<Mode>('type');

  const target = words[wordIdx % words.length] ?? '';

  useEffect(() => {
    if (words.length === 0) return;

    let timer: ReturnType<typeof setTimeout>;

    if (mode === 'type') {
      if (visible.length < target.length) {
        timer = setTimeout(() => {
          setVisible(target.slice(0, visible.length + 1));
        }, TYPING_MS);
      } else {
        timer = setTimeout(() => setMode('erase'), PAUSE_AFTER_WORD_MS);
      }
    } else {
      if (visible.length > 0) {
        timer = setTimeout(() => {
          setVisible(target.slice(0, visible.length - 1));
        }, DELETING_MS);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setMode('type');
      }
    }

    return () => clearTimeout(timer);
  }, [mode, visible, target, words.length]);

  const baseFont = fontFamily ? { fontFamily } : undefined;
  const boldFont = fontFamilyBold ? { fontFamily: fontFamilyBold } : baseFont;

  const textSizing = compact ? styles.textCompact : styles.textLogin;
  const wrapSizing = compact ? styles.wrapCompact : styles.wrap;

  return (
    <View style={wrapSizing}>
      <Text
        style={[
          styles.text,
          textSizing,
          baseFont,
          compact && styles.textCompactWrap,
        ]}>
        {prefix}
        <Text style={[styles.accentWord, boldFont, compact && styles.accentWordCompact]}>
          {visible}
        </Text>
        <Text style={[styles.cursor, baseFont]}>|</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
    width: '100%',
    marginBottom: 32,
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  wrapCompact: {
    alignSelf: 'stretch',
    flex: 1,
    marginBottom: 0,
    justifyContent: 'center',
    minWidth: 0,
  },
  text: {
    color: Paper.text,
    textAlign: 'left',
  },
  textLogin: {
    fontSize: 28,
    lineHeight: 38,
  },
  textCompact: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  /** Evita que el saludo se recorte en la fila del header (flex + avatar). */
  textCompactWrap: {
    flexShrink: 1,
    width: '100%',
  },
  accentWord: {
    color: Paper.text,
  },
  accentWordCompact: {
    fontWeight: '700',
  },
  cursor: {
    color: Paper.accent,
    opacity: 0.85,
  },
});
