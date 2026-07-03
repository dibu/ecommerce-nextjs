import { create } from 'zustand';
import { Product } from '@/types';

interface FavoriteState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  addFavorite: (product: Product) => {
    set((state) => ({
      favorites: [...state.favorites, product],
    }));
  },
  removeFavorite: (productId: string) => {
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== productId),
    }));
  },
  isFavorite: (productId: string) => {
    return get().favorites.some((p) => p.id === productId);
  },
}));
