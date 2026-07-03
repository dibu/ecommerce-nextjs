'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import ProductCard from '@/components/ProductCard';
import { useFavoriteStore } from '@/store/favoriteStore';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites } = useFavoriteStore();

  return (
    <ProtectedRoute requiredRole="user">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Favorite Products</h1>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-6">You haven't added any favorites yet</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}