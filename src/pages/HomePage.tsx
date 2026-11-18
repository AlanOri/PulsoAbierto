import { useState, useEffect } from 'react'
import type { Crypto } from '../types/crypto'
import { fetchCryptos } from '../services/cryptoservice'
import QueryControls from '../components/QueryControls'
import CryptoList from '../components/CryptoList'
import StatusMessage from '../components/StatusMessage'

export default function HomePage() {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'empty'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const loadData = async () => {
    setStatus('loading')
    try {
      const data = await fetchCryptos()
      setCryptos(data)
      if (data.length === 0) {
        setStatus('empty')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
      setErrorMessage('No se pudieron cargar las cotizaciones del mercado.')
    }
  }

  useEffect(() => {
    let isCurrent = true

    async function loadForCurrency() {
      try {
        const data = await fetchCryptos()
        if (!isCurrent) return

        setCryptos(data)
        setStatus(data.length === 0 ? 'empty' : 'success')
      } catch {
        if (!isCurrent) return

        setStatus('error')
        setErrorMessage('No se pudieron cargar las cotizaciones del mercado.')
      }
    }

    void loadForCurrency()
    return () => {
      isCurrent = false
    }
  }, [selectedCurrency])

  function handleToggleFavorite(cryptoId: string) {
    setCryptos(prevCryptos =>
      prevCryptos.map(crypto =>
        crypto.id === cryptoId ? { ...crypto, isFavorite: !crypto.isFavorite } : crypto
      )
    )
  }

  const filteredCryptos = cryptos.filter((crypto) => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFavorite = onlyFavorites ? crypto.isFavorite : true
    return matchesSearch && matchesFavorite
  })

  function handleSearch() {
    loadData()
  }

  return (
    <>
      <section className="intro">
        <p className="eyebrow">MERCADO CRIPTO</p>
        <h1>
          El mercado cripto,
          <br />
          en un solo lugar.
        </h1>
        <p className="intro-text">
          Consultá los precios actualizados de Bitcoin, Ethereum y Solana
          expresados en tu moneda preferida.
        </p>
      </section>

      <QueryControls
        searchTerm={searchTerm}
        selectedCurrency={selectedCurrency}
        onlyFavorites={onlyFavorites}
        onSearchChange={setSearchTerm}
        onCurrencyChange={setSelectedCurrency}
        onFavoritesChange={setOnlyFavorites}
        onSearch={handleSearch}
      />

      <section className="results-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MERCADO ACTUAL</p>
            <h2>Cotizaciones disponibles</h2>
          </div>
          <span className="currency-label">
            {selectedCurrency} • {filteredCryptos.length} resultados
          </span>
        </div>

        {status === 'loading' && (
          <StatusMessage message="Cargando cotizaciones desde la API..." type="loading" />
        )}

        {status === 'error' && (
          <StatusMessage message={errorMessage} type="error" onRetry={() => loadData()} />
        )}

        {status === 'success' && filteredCryptos.length === 0 && (
          <StatusMessage message="No se encontraron criptomonedas que coincidan con la búsqueda." type="empty" />
        )}

        {status === 'success' && filteredCryptos.length > 0 && (
          <StatusMessage message="Cotizaciones obtenidas exitosamente." type="success" />
        )}

        <CryptoList
          cryptos={filteredCryptos}
          onToggleFavorite={handleToggleFavorite}
          onSelect={() => {}}
        />
      </section>
    </>
  )
}