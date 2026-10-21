import { useCart } from '@/store/cart.store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';

const CartButton = () => {
  const { count } = useCart();

  return (
    <Pressable
      accessibilityLabel="Ver carrito"
      className="flex-row items-center active:opacity-50"
      onPress={() => router.push('/cart')}
    >
      <Ionicons name="cart-outline" size={24} />
      <Text className="ml-1 font-bold">{count}</Text>
    </Pressable>
  );
};

export default CartButton;
