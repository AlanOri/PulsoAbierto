import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CryptoStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        }),
    }),
    {
      name: 'crypto-favorites-storage',
    }
  )
);