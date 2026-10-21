import CustomButton from '@/components/shared/CustomButton';
import { Link, router, useNavigation } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const drawerNavigation = useNavigation("/(drawer)") as any;
  return (
    <SafeAreaView>
      <View className="px-10 mt-5">
        <CustomButton
          className="mb-2"
          color="primary"
          onPress={() => router.push('/products')}
        >
          Productos
        </CustomButton>

        <CustomButton
          onPress={() => router.push('/profile')}
          className="mb-2"
          color="secondary"
        >
          Profile
        </CustomButton>

        <CustomButton
          onPress={() => router.push('/settings')}
          className="mb-2"
          color="tertiary"
        >
          Ajustes
        </CustomButton>

        <Link href="/products" asChild>
          <CustomButton variant="text-only" className="mb-10" color="primary">
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
