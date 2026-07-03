import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  login: async (email: string, password: string, role: string) => {
    set({ isLoading: true });
    try {
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        role: (role as any),
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      };
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      set({ user: mockUser, token: mockToken });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
  setUser: (user: User) => set({ user }),
}));
