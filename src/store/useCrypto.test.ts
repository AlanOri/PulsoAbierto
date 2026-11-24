import { describe, it, expect, beforeEach } from 'vitest';
import { useCryptoStore } from './useCryptoStore';

describe('useCryptoStore - Favoritos', () => {
  beforeEach(() => {
    
    useCryptoStore.setState({ favorites: [] });
  });

  it('debería agregar una criptomoneda a favoritos si no existe', () => {
    const { toggleFavorite } = useCryptoStore.getState();
    
    toggleFavorite('bitcoin');
    
    const { favorites } = useCryptoStore.getState();
    expect(favorites).toContain('bitcoin');
    expect(favorites.length).toBe(1);
  });

  it('debería quitar una criptomoneda de favoritos si ya existe', () => {
    useCryptoStore.setState({ favorites: ['bitcoin'] });
    const { toggleFavorite } = useCryptoStore.getState();
    
    toggleFavorite('bitcoin');
    
    const { favorites } = useCryptoStore.getState();
    expect(favorites).not.toContain('bitcoin');
    expect(favorites.length).toBe(0);
  });
});