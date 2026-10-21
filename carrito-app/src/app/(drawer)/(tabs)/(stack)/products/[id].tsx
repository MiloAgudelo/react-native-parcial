import CustomButton from '@/components/shared/CustomButton';
import { formatPrice } from '@/helpers/format-price';
import { useCart } from '@/store/cart.store';
import { products } from '@/store/products.store';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';


const ProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    navigation.setOptions({
      title: product?.title ?? "Producto",
    });
  }, [product]);

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="px-5 mt-2">
      <Text className="font-bold text-2xl">{product.title}</Text>
      <Text>{product.description}</Text>
      <Text className="font-bold">{formatPrice(product.price)}</Text>

      <CustomButton className="mt-5" onPress={() => addToCart(product)}>
        Agregar al carrito
      </CustomButton>
    </View>
  );
};

export default ProductScreen;
