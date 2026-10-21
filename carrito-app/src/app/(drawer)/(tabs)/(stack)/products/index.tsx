import { View, Text, FlatList } from 'react-native';
import { formatPrice } from '@/helpers/format-price';
import { products } from '@/store/products.store';
import { Link } from 'expo-router';

const ProductsScreen = () => {
  return (
    <View className="flex flex-1 px-4">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mt-10">
            <Text className="text-2xl font-bold">{item.title}</Text>
            <Text>{item.description}</Text>

            <View className="flex flex-row justify-between mt-2">
              <Text className="font-bold">{formatPrice(item.price)}</Text>
              <Link href={`/products/${item.id}`} asChild>
                <Text className="underline">Ver detalles</Text>
              </Link>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ProductsScreen;
