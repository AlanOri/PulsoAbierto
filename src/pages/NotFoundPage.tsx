import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'

export default function NotFoundPage() {
  return (
    <div className="container main-content" style={{ textAlign: 'center' }}>
      <StatusMessage message="La página que buscas no existe o fue movida." type="error" />
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="primary-button" style={{ textDecoration: 'none' }}>
          Volver a la página principal
        </Link>
      </div>
    </div>
  )
}