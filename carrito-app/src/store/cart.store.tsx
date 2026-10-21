import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Product } from './products.store';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  count: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<Cart | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((current) => {
      const exists = current.some((item) => item.product.id === product.id);

      if (!exists) {
        return [...current, { product, quantity: 1 }];
      }

      return current.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const removeFromCart = (id: string) => {
    setItems((current) => current.filter((item) => item.product.id !== id));
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext value={{ items, count, total, addToCart, removeFromCart }}>
      {children}
    </CartContext>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return cart;
};
