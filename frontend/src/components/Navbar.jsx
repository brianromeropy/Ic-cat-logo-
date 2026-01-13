import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { isAuthenticated, logout } from '../utils/auth'
import { useCarrito } from '../hooks/useCarrito'
import CarritoIcon from './CarritoIcon'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { cartCount } = useCarrito()

  useEffect(() => {
    const checkAuth = async () => {
      const authUser = await isAuthenticated()
      setUser(authUser)
    }
    
    // Verificar autenticación al montar
    checkAuth()
    
    // Escuchar cambios en el estado de autenticación
    const handleAuthChange = () => {
      checkAuth()
    }
    
    window.addEventListener('authStateChanged', handleAuthChange)
    
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-dark-bg border-b border-gold/20 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gold tracking-wide">
            <span className="text-gold-light ml-1">RC</span>
            <span className="text-white ml-1">TIENDA</span>
            <span className="text-gold-light ml-1">TECNOLÓGICA</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-gold transition-colors duration-200 text-sm font-medium">
              Inicio
            </Link>
            <Link to="/catalogo" className="text-gray-300 hover:text-gold transition-colors duration-200 text-sm font-medium">
              Catálogo
            </Link>
            {user && (
              <>
                <Link 
                  to="/carrito" 
                  className="relative text-gray-300 hover:text-gold transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                >
                  <CarritoIcon count={cartCount} />
                  <span>Carrito</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-300 hover:text-gold transition-colors duration-200 text-sm font-medium">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-dark-surface rounded-lg border border-gold/30">
                  <span className="text-xs text-gray-300">
                    ¡Hola <span className="font-semibold text-gold">{user.nombre || user.email}</span>!
                  </span>
                </div>
              </>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 transition-all duration-200 text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gold-gradient text-dark-bg hover:shadow-gold transition-all duration-200 text-sm font-semibold"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
