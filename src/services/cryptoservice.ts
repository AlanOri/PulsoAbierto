import type { Crypto } from '../types/crypto';
import type { CoinGeckoPriceResponse } from '../types/crypto';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

const CRYPTO_METADATA: Record<string, { name: string; symbol: string; description: string }> = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    description: 'La primera criptomoneda descentralizada basada en tecnología blockchain',
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    description: 'Plataforma descentralizada que permite crear contratos inteligentes',
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    description: 'Blockchain de alto rendimiento diseñada para aplicaciones descentralizadas',
  },
};

export async function fetchCryptos(): Promise<Crypto[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener los datos de la API');
  }
  const data: CoinGeckoPriceResponse = await response.json();

  return Object.keys(data).map((id) => {
    const meta = CRYPTO_METADATA[id] || { name: id, symbol: id.toUpperCase(), description: '' };
    return {
      id,
      name: meta.name,
      symbol: meta.symbol,
      price: data[id].usd,
      isFavorite: false,
      description: meta.description,
    };
  });
}