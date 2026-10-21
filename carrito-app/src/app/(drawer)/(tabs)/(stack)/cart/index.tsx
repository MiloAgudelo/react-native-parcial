import CustomButton from '@/components/shared/CustomButton';
import { formatPrice } from '@/helpers/format-price';
import { useCart } from '@/store/cart.store';
import { router } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

const CartScreen = () => {
  const { items, total, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-xl font-bold">Tu carrito está vacío</Text>
        <Text className="mt-2 text-center">Todavía no has agregado productos.</Text>
        <CustomButton className="mt-5 px-10" onPress={() => router.dismissTo('/products')}>
          Ver productos
        </CustomButton>
      </View>
    );
  }

  return (
    <View className="flex-1 px-5">
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between border-b border-gray-200 py-4">
            <View>
              <Text className="text-lg font-bold">{item.product.title}</Text>
              <Text>
                {item.quantity} x {formatPrice(item.product.price)}
              </Text>
            </View>

            <CustomButton variant="text-only" onPress={() => removeFromCart(item.product.id)}>
              Eliminar
            </CustomButton>
          </View>
        )}
      />

      <View className="flex-row justify-between border-t border-black py-5">
        <Text className="text-xl font-bold">Total</Text>
        <Text className="text-xl font-bold">{formatPrice(total)}</Text>
      </View>
    </View>
  );
};

export default CartScreen;
