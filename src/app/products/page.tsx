'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { useState, useEffect } from 'react';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Electronics',
    sellerId: 'seller1',
    stock: 15,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'Electronics',
    sellerId: 'seller1',
    stock: 8,
    rating: 4.3,
    reviews: 95,
  },
  {
    id: '3',
    name: 'USB-C Cable',
    description: 'Durable USB-C charging and data cable',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop',
    category: 'Accessories',
    sellerId: 'seller2',
    stock: 50,
    rating: 4.7,
    reviews: 234,
  },
  {
    id: '4',
    name: 'Webcam HD',
    description: '1080p HD webcam perfect for streaming',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
    category: 'Electronics',
    sellerId: 'seller2',
    stock: 12,
    rating: 4.4,
    reviews: 156,
  },
  {
    id: '5',
    name: 'Phone Stand',
    description: 'Adjustable phone stand for desk',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1586253408b1-87bff2e76b85?w=400&h=300&fit=crop',
    category: 'Accessories',
    sellerId: 'seller1',
    stock: 30,
    rating: 4.6,
    reviews: 187,
  },
  {
    id: '6',
    name: 'Portable Speaker',
    description: 'Bluetooth speaker with great sound quality',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=400&h=300&fit=crop',
    category: 'Electronics',
    sellerId: 'seller2',
    stock: 20,
    rating: 4.5,
    reviews: 201,
  },
  {
    id: '7',
    name: 'Keyboard RGB',
    description: 'Mechanical keyboard with RGB lighting',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829191301-4cacba643e01?w=400&h=300&fit=crop',
    category: 'Electronics',
    sellerId: 'seller1',
    stock: 18,
    rating: 4.8,
    reviews: 312,
  },
  {
    id: '8',
    name: 'Mouse Wireless',
    description: 'Ergonomic wireless mouse',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
    category: 'Accessories',
    sellerId: 'seller2',
    stock: 25,
    rating: 4.6,
    reviews: 198,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  return (
    <ProtectedRoute requiredRole="user">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop Products</h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}