import { View, StyleSheet, Text } from 'react-native';
import OpenStreetMap from '@/presentation/components/maps/OpenStreetMap';

// Coordenadas iniciales de la práctica: Dosquebradas, Risaralda.
const DOSQUEBRADAS = { latitude: 4.834, longitude: -75.673 };

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <OpenStreetMap
        staticMode
        center={DOSQUEBRADAS}
        markers={[
          { ...DOSQUEBRADAS, title: 'Dosquebradas', description: 'Punto inicial de la práctica' },
          { latitude: 4.813, longitude: -75.696, title: 'Pereira', description: 'Segundo marcador de referencia' },
        ]}
      />
      <View style={styles.banner}>
        <Text style={styles.title}>Mapa fijo: Dosquebradas</Text>
        <Text>Latitud: {DOSQUEBRADAS.latitude.toFixed(3)} | Longitud: {DOSQUEBRADAS.longitude.toFixed(3)}</Text>
        <Text style={styles.note}>Coordenadas de ejemplo, no del GPS. Toca los marcadores.</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: { position: 'absolute', top: 16, left: 12, right: 12, padding: 12, backgroundColor: 'white', borderRadius: 10, elevation: 4 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#173f73' },
  note: { marginTop: 5, color: '#444' },
});
