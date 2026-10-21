import CartButton from '@/components/shared/CartButton';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useNavigation } from 'expo-router';

const StackLayout = () => {
  const navigation = useNavigation();

  const onHeaderLeftClick = (canGoBack?: boolean) => {
    if (canGoBack) {
      router.back();
      return;
    }

    // El drawer es un navegador ancestro: se sube hasta encontrar el que tiene openDrawer.
    let drawerNavigation: any = navigation;
    while (drawerNavigation && typeof drawerNavigation.openDrawer !== 'function') {
      drawerNavigation = drawerNavigation.getParent?.();
    }
    drawerNavigation?.openDrawer();
  };

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: 'white' },
        headerLeft: ({ canGoBack }) => (
          <Ionicons
            name={canGoBack ? 'arrow-back-outline' : 'grid-outline'}
            size={24}
            style={{ marginRight: 20 }}
            onPress={() => onHeaderLeftClick(Boolean(canGoBack))}
          />
        ),
        headerRight: () => <CartButton />,
      }}
    >
      <Stack.Screen name="products/index" options={{ title: 'Productos' }} />
      <Stack.Screen name="products/[id]" options={{ title: 'Producto' }} />
      <Stack.Screen name="profile/index" options={{ title: 'Perfil' }} />
      <Stack.Screen name="settings/index" options={{ title: 'Ajustes' }} />
      <Stack.Screen name="cart/index" options={{ title: 'Carrito', headerRight: () => null }} />
    </Stack>
  );
};

export default StackLayout;
