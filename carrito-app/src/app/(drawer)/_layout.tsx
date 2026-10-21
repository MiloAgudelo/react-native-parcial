import CustomDrawer from '@/components/shared/CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        overlayColor: 'rgba(0,0,0,0.4)',
        drawerActiveTintColor: 'black',
        sceneStyle: { backgroundColor: 'white' },
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerLabel: 'Tabs + Stack',
          title: 'Tabs + Stack',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="albums-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="user/index"
        options={{
          drawerLabel: 'User',
          title: 'Usuario',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="schedule/index"
        options={{
          drawerLabel: 'Horario',
          title: 'Horario',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
