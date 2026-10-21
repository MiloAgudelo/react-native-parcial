import { useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
interface LatLng { latitude: number; longitude: number; }

interface Point extends LatLng { title: string; description?: string; }
interface Props {
  center: LatLng;
  markers?: Point[];
  staticMode?: boolean;
  onReady?: () => void;
  onUserPan?: () => void;
}
// La capa OpenStreetMap se carga en una WebView. Leaflet controla mapa y marcadores.
// En producción use un proveedor de teselas adecuado al volumen de usuarios.
export default function OpenStreetMap({ center, markers = [], staticMode = false, onReady, onUserPan }: Props) {
  const webRef = useRef<WebView>(null);
  const html = useMemo(() => `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><style>html,body,#map{height:100%;margin:0;padding:0}</style></head><body><div id="map"></div><script>
(function(){const map=L.map('map',{dragging:${!staticMode},touchZoom:${!staticMode},scrollWheelZoom:false,doubleClickZoom:${!staticMode},boxZoom:${!staticMode},keyboard:${!staticMode},zoomControl:${!staticMode}}).setView([${center.latitude},${center.longitude}],13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
const userMarker=L.circleMarker(${JSON.stringify([center.latitude, center.longitude])},{radius:9,color:'#1857c9',weight:3,fillColor:'#3488f0',fillOpacity:0.6}).addTo(map);
${JSON.stringify(markers)}.forEach(p=>{const el=document.createElement('div');el.textContent=p.title;const description=p.description||'';if(description){const d=document.createElement('small');d.textContent=description;el.appendChild(document.createElement('br'));el.appendChild(d);}L.marker([p.latitude,p.longitude]).addTo(map).bindPopup(el);});
map.on('dragstart',()=>window.ReactNativeWebView?.postMessage('pan'));
window.moveTo=(lat,lng)=>{userMarker.setLatLng([lat,lng]);map.setView([lat,lng],16,{animate:true});};
window.updateUser=(lat,lng)=>userMarker.setLatLng([lat,lng]);
window.ReactNativeWebView?.postMessage('ready');})();
</script></body></html>`, [center.latitude, center.longitude, markers, staticMode]);
  return <View style={styles.container}><WebView ref={webRef} originWhitelist={['*']} source={{ html, baseUrl: 'https://localhost/' }} javaScriptEnabled onMessage={(event) => { if (event.nativeEvent.data === 'ready') onReady?.(); if (event.nativeEvent.data === 'pan') onUserPan?.(); }} />
  </View>;
}
const styles=StyleSheet.create({container:{flex:1}});
