import './index.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailCardPage from './pages/DetailCardPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <a href="/" className="brand" aria-label="Pulso Abierto, inicio">
            <span className="brand-icon" aria-hidden="true">B</span>
            <span>Pulso Abierto</span>
          </a>
          <p className="header-label">Cotizaciones del mercado cripto</p>
        </div>
      </header>

      <main className="container main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/criptomonedas/:id" element={<DetailCardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <p>&copy; {new Date().getFullYear()} Pulso Abierto</p>
          <p>Datos proporcionados por CoinGecko</p>
        </div>
      </footer>
    </>
  )
}

export default App