import { Link } from 'react-router-dom';
import type { Crypto } from '../types/crypto';
import { useCryptoStore } from '../store/useCryptoStore'; 

interface CryptoCardProps {
  crypto: Crypto;
}

function CryptoCard({ crypto }: CryptoCardProps) {
    const favorites = useCryptoStore((state) => state.favorites);
    const toggleFavorite = useCryptoStore((state) => state.toggleFavorite);

    const isFavorite = favorites.includes(crypto.id);

    return (
        <article 
            className="crypto-card" 
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                height: '100%' 
            }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 className="crypto-card-name" style={{ margin: 0 }}>{crypto.name}</h3>
                    <span className="crypto-ticker" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                        {crypto.symbol.toUpperCase()}
                    </span>
                </div>
                <span className="brand-icon" aria-hidden="true" style={{ margin: 0 }}>₿</span>
            </div>

            <p className="crypto-price-label" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Precio actual</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p className="crypto-price" style={{ margin: 0 }}>
                    {new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(crypto.price)}
                </p>

                <button
                    type="button"
                    className="favorite-button"
                    onClick={() => toggleFavorite(crypto.id)}
                    aria-label={isFavorite ? 'Quitar de favoritas' : 'Añadir a favoritas'}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.4rem',
                        color: isFavorite ? 'var(--accent-color)' : '#b5ada3',
                        padding: '0.2rem',
                    }}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>
          </div>

          <div>
              <Link
                  to={`/criptomonedas/${crypto.id}`}
                  className="secondary-button"
                  style={{ textDecoration: 'none', display: 'block', textAlign: 'center', width: '100%' }}
              >
                  Ver detalles
              </Link>
          </div>
        </article>
    );
}

export default CryptoCard;