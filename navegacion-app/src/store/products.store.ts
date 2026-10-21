export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export const products: Product[] = [
  { id: '1', title: 'Camiseta', description: 'Camiseta de algodón 100%', price: 45000 },
  { id: '2', title: 'Pantalón', description: 'Pantalón de mezclilla azul', price: 89000 },
  { id: '3', title: 'Chaqueta', description: 'Chaqueta impermeable', price: 150000 },
  { id: '4', title: 'Zapatos', description: 'Zapatos deportivos', price: 210000 },
];
