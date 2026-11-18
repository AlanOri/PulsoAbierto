export interface Crypto {
    id: string;
    name: string;
    symbol: string;
    price: number;
    isFavorite?: boolean;
}

export interface CoinGeckoPriceResponse {
  [key: string]: {
    usd: number
  }
}
