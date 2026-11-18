import { useState } from 'react'
import { z } from 'zod'

const querySchema = z.object({
  searchTerm: z.string().trim().min(0),
  selectedCurrency: z.enum(['usd', 'eur', 'ars'], {
    message: 'Selecciona una moneda de cotización válida',
  }),
})

interface QueryControlsProps {
  searchTerm: string
  selectedCurrency: string
  onlyFavorites: boolean
  onSearchChange: (value: string) => void
  onCurrencyChange: (value: string) => void
  onFavoritesChange: (value: boolean) => void
  onSearch: () => void
}

function QueryControls({
  searchTerm,
  selectedCurrency,
  onlyFavorites,
  onSearchChange,
  onCurrencyChange,
  onFavoritesChange,
  onSearch,
}: QueryControlsProps) {
  const [errors, setErrors] = useState<{ searchTerm?: string; selectedCurrency?: string }>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const result = querySchema.safeParse({ searchTerm, selectedCurrency })
    
    if (!result.success) {
      const fieldErrors: { searchTerm?: string; selectedCurrency?: string } = {}
      result.error.issues.forEach(err => {
        const fieldName = String(err.path[0])
        if (fieldName === 'searchTerm') fieldErrors.searchTerm = err.message
        if (fieldName === 'selectedCurrency') fieldErrors.selectedCurrency = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    onSearch()
  }

  return (
    <div>
      <form className="query-panel" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="crypto-search">
            Buscar criptomoneda
          </label>

          <input
            id="crypto-search"
            type="text"
            placeholder="Ejemplo: Bitcoin"
            value={searchTerm}
            onChange={(event) => {
              onSearchChange(event.target.value)
              setErrors(prev => ({ ...prev, searchTerm: undefined }))
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency-select">
            Moneda de cotización
          </label>

          <select
            id="currency-select"
            value={selectedCurrency}
            onChange={(event) => {
              onCurrencyChange(event.target.value)
              setErrors(prev => ({ ...prev, selectedCurrency: undefined }))
            }}
          >
            <option value="usd">Dólar estadounidense (USD)</option>
            <option value="eur">Euro (EUR)</option>
            <option value="ars">Peso argentino (ARS)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="checkbox-label" htmlFor="favorites-filter">
            <input
              id="favorites-filter"
              type="checkbox"
              checked={onlyFavorites}
              onChange={(event) => onFavoritesChange(event.target.checked)}
            />
            Mostrar solo favoritas
          </label>
        </div>

        <button type="submit" className="primary-button">
          Buscar
        </button>
      </form>

      {errors.searchTerm && (
        <p className="error-message" style={{ color: '#c53030', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'center' }}>
          {errors.searchTerm}
        </p>
      )}
      {errors.selectedCurrency && (
        <p className="error-message" style={{ color: '#c53030', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'center' }}>
          {errors.selectedCurrency}
        </p>
      )}
    </div>
  )
}

export default QueryControls