'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { Heart, ShoppingCart } from 'lucide-react';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const favorite = isFavorite(product.id);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const handleAddToCart = () => {
    addItem({ productId: product.id, quantity: 1, product });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="relative w-full h-48 bg-gray-200">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
        <button onClick={handleFavorite} className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition">
          <Heart size={20} className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex items-center mb-3">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-600">{product.rating} ({product.reviews})</span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        <button onClick={handleAddToCart} disabled={product.stock === 0} className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition ${isAdded ? 'bg-green-500 text-white' : product.stock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          <ShoppingCart size={18} />
          {isAdded ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}