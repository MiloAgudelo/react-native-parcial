import CustomButton from '@/components/shared/CustomButton';
import { useCart } from '@/store/cart.store';
import { Link, router, useNavigation } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const drawerNavigation = useNavigation("/(drawer)") as any;
  const { count } = useCart();

  return (
    <SafeAreaView>
      <View className="px-10 mt-5">
        <CustomButton className="mb-2" onPress={() => router.push('/products')}>
          Productos
        </CustomButton>

        <CustomButton className="mb-2" onPress={() => router.push('/profile')}>
          Profile
        </CustomButton>

        <CustomButton className="mb-2" onPress={() => router.push('/settings')}>
          Ajustes
        </CustomButton>

        <CustomButton className="mb-2" onPress={() => router.push('/cart', { withAnchor: true })}>
          {`Carrito (${count})`}
        </CustomButton>

        <Link href="/products" asChild>
          <CustomButton variant="text-only" className="mb-10">
            Productos
          </CustomButton>
        </Link>

        <CustomButton onPress={() => drawerNavigation.openDrawer()}>
          Abrir menú
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
