import data from './products.json';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export const products: Product[] = data;
