import { Paper, paperRoundedFont } from '@/constants/paper-theme';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

const TYPE_MS = 26;

type Props = {
  text: string;
  /** Si es true, escribe el texto letra a letra; si no, muestra el texto completo. */
  playTypewriter: boolean;
  onTypewriterDone: () => void;
};

/**
 * Texto de burbuja; opcionalmente anima el contenido como máquina de escribir al editar.
 */
export function ChatMessageText({ text, playTypewriter, onTypewriterDone }: Props) {
  const [visible, setVisible] = useState(() => (playTypewriter ? '' : text));
  const doneRef = useRef(onTypewriterDone);
  doneRef.current = onTypewriterDone;

  useEffect(() => {
    if (!playTypewriter) {
      setVisible(text);
      return;
    }

    setVisible('');
    const glyphs = Array.from(text);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisible(glyphs.slice(0, i).join(''));
      if (i >= glyphs.length) {
        clearInterval(id);
        doneRef.current();
      }
    }, TYPE_MS);

    return () => clearInterval(id);
  }, [text, playTypewriter]);

  return (
    <Text style={[styles.bubbleText, paperRoundedFont, Platform.OS === 'android' && styles.bubbleTextAndroid]}>
      {visible}
    </Text>
  );
}

const styles = StyleSheet.create({
  bubbleText: {
    color: Paper.text,
    fontSize: 16,
    lineHeight: 22,
  },
  /**
   * Android añade padding extra al texto (includeFontPadding) y suele recortar
   * la parte inferior si no se desactiva; lineHeight un poco mayor evita clipping.
   */
  bubbleTextAndroid: {
    includeFontPadding: false,
    lineHeight: 24,
    paddingVertical: 1,
  },
});
