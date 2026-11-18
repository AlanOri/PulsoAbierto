import type { Crypto } from '../types/crypto'
import CryptoCard from './CryptoCard'

interface CryptoListProps {
  cryptos: Crypto[]
  onToggleFavorite: (id: string) => void
}

export default function CryptoList({ cryptos, onToggleFavorite }: CryptoListProps) {
  if (cryptos.length === 0) {
    return null
  }

  return (
    <div 
      className="crypto-grid" 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem', 
        width: '100%' 
      }}
    >
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}