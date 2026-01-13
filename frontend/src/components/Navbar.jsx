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
    checkAuth()
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">
            IC Tienda
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200 transition">
              Inicio
            </Link>
            <Link to="/catalogo" className="hover:text-blue-200 transition">
              Catálogo
            </Link>
            {user && (
              <>
                <Link 
                  to="/carrito" 
                  className="relative hover:text-blue-200 transition flex items-center space-x-2"
                >
                  <CarritoIcon count={cartCount} />
                  <span>Carrito</span>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 transition">
                    Admin
                  </Link>
                )}
              </>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition"
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
