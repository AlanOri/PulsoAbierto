import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Crypto } from '../types/crypto'
import { fetchCryptos } from '../services/cryptoservice'
import StatusMessage from '../components/StatusMessage'
import { useCryptoStore } from '../store/useCryptoStore'

export default function DetailCardPage() {
  const { id } = useParams<{ id: string }>()
  const [crypto, setCrypto] = useState<Crypto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const favorites = useCryptoStore((state) => state.favorites)
  const toggleFavorite = useCryptoStore((state) => state.toggleFavorite)

  useEffect(() => {
    async function loadCryptoDetail() {
      setLoading(true)
      setError(false)
      try {
        const data = await fetchCryptos()
        const found = data.find(c => c.id === id)
        if (found) {
          setCrypto(found)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadCryptoDetail()
  }, [id])

  const isFavorite = crypto ? favorites.includes(crypto.id) : false

  if (loading) {
    return (
      <div className="container main-content">
        <StatusMessage message="Cargando detalle de la criptomoneda..." type="loading" />
      </div>
    )
  }

  if (error || !crypto) {
    return (
      <div className="container main-content" style={{ textAlign: 'center' }}>
        <StatusMessage message="La criptomoneda solicitada no existe o no está disponible." type="error" />
        <div style={{ marginTop: '2rem' }}>
          <Link to="/" className="primary-button" style={{ textDecoration: 'none' }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container main-content">
      <div className="query-panel" role="status" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '2rem', gap: '1rem', maxWidth: '600px' }}>
        <p className="eyebrow">DETALLE DE ACTIVO</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: 0 }}>{crypto.name} ({crypto.symbol})</h2>
          
          <button
              type="button"
              onClick={() => toggleFavorite(crypto.id)}
              aria-label={isFavorite ? 'Quitar de favoritas' : 'Añadir a favoritas'}
              style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.8rem',
                  color: isFavorite ? 'var(--accent-color)' : '#b5ada3',
                  padding: '0.2rem',
              }}
          >
              {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Identificador único: {crypto.id}</p>
        <p className="crypto-price" style={{ fontSize: '1.8rem' }}>Precio actual: {crypto.price.toLocaleString()} USD</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Estado en favoritos: {isFavorite ? 'Marcado como favorito' : 'No marcado'}
        </p>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <Link to="/" className="secondary-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  )
}