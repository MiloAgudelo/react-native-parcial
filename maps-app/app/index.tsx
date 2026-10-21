import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
export default function MapsApp() {
  return <View style={s.container}>
    <Text style={s.title}>Mapas con Expo SDK 57</Text>
    <Text style={s.info}>Parte 1: mapa estático de Dosquebradas</Text>
    <Link href="/map-simple" style={s.link}>Ver mapa con marcadores</Link>
  </View>;
}
const s=StyleSheet.create({ container:{flex:1,justifyContent:'center',padding:25,gap:24}, title:{fontSize:27,fontWeight:'bold'}, info:{fontSize:16}, link:{fontSize:18,color:'#173f73',fontWeight:'bold'} });
