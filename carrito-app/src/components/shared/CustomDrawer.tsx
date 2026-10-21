import { Text, View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from 'expo-router/drawer';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View className="mb-4 border-b border-gray-200 px-4 pb-4">
        <Text className="text-2xl font-bold">Navegación</Text>
        <Text className="text-gray-500">Menú principal</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
