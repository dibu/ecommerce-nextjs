export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'seller' | 'user';
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  sellerId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  userId: string;
  month: string;
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
}
