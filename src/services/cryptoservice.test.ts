import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCryptos } from './cryptoservice';

describe('cryptoservice - fetchCryptos', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('debería retornar un arreglo tipado de criptomonedas cuando la respuesta es exitosa', async () => {

    const mockApiResponse = {
      bitcoin: { usd: 60000 },
      ethereum: { usd: 3000 },
      solana: { usd: 150 }
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    const cryptos = await fetchCryptos();

    expect(Array.isArray(cryptos)).toBe(true);
    expect(cryptos.length).toBe(3);
    expect(cryptos[0]).toHaveProperty('id', 'bitcoin');
    expect(cryptos[0]).toHaveProperty('price', 60000);
  });

  it('debería lanzar un error cuando la respuesta de la API es ok: false', async () => {
   
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(fetchCryptos()).rejects.toThrow();
  });
});