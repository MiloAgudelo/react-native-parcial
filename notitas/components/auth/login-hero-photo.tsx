import { Paper } from '@/constants/paper-theme';
import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const PHOTO_SIZE = 120;
/** Contenedor suficiente para el halo + partículas fuera de la foto (radio ~60). */
const WRAP = 200;
const PARTICLE_SIZE = 10;
const PARTICLE_HALF = PARTICLE_SIZE / 2;
const PARTICLE_COUNT = 8;

function Particle({ index }: { index: number }) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const opacity = useSharedValue(0.25);
  const scale = useSharedValue(0.65);

  useEffect(() => {
    const angleDeg = (index * 360) / PARTICLE_COUNT;
    const angle = (angleDeg * Math.PI) / 180;
    // Radio foto ~60px: >60 para verse alrededor; <80 desde el centro caben en WRAP/2 (~100).
    const distance = 68 + (index % 4) * 5;
    const ox = Math.cos(angle) * distance;
    const oy = Math.sin(angle) * distance;
    const stagger = index * 320;

    opacity.value = withDelay(
      stagger,
      withRepeat(
        withSequence(
          withTiming(0.9, { duration: 1000, easing: Easing.out(Easing.quad) }),
          withTiming(0.25, { duration: 1200, easing: Easing.in(Easing.quad) }),
        ),
        -1,
        true,
      ),
    );

    tx.value = withDelay(
      stagger,
      withRepeat(
        withSequence(
          withTiming(ox, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );

    ty.value = withDelay(
      stagger,
      withRepeat(
        withSequence(
          withTiming(oy, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        false,
      ),
    );

    scale.value = withDelay(
      stagger,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1300 }),
          withTiming(0.4, { duration: 1300 }),
        ),
        -1,
        true,
      ),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        // Centro de la foto (arriba-izquierda): origen de las partículas.
        {
          left: PHOTO_SIZE / 2 - PARTICLE_HALF,
          top: PHOTO_SIZE / 2 - PARTICLE_HALF,
        },
        rStyle,
      ]}
    />
  );
}

export function LoginHeroPhoto() {
  return (
    <View style={styles.container}>
      <View style={styles.particleLayer} pointerEvents="none">
        {[...Array(PARTICLE_COUNT)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </View>

      <Image
        source={require('@/assets/images/couple-picture.png')}
        style={styles.photo}
        contentFit="cover"
        transition={400}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  /** Foto alineada a la izquierda. minHeight WRAP deja sitio a partículas; el margin negativo evita el hueco visual hasta el texto. */
  container: {
    width: WRAP,
    minHeight: WRAP,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    // 200 − 120 = 80; −70 deja ~10px entre el borde de la foto y el texto (sin montarse).
    marginBottom: -70,
  },
  particleLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
    width: PARTICLE_SIZE,
    height: PARTICLE_SIZE,
    borderRadius: PARTICLE_HALF,
    backgroundColor: Paper.accent,
    shadowColor: Paper.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 3,
    elevation: 4,
  },
  photo: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#FFF',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});
