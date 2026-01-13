import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../utils/cart'

const CardProducto = ({ producto }) => {
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const navigate = useNavigate()

  const handleAddToCart = async () => {
    const user = await import('../utils/auth').then(m => m.isAuthenticated())
    if (!user) {
      navigate('/login')
      return
    }

    setLoading(true)
    try {
      await addToCart(producto._id || producto.id, 1)
      setAdded(true)
      
      // Disparar evento para actualizar contador del carrito
      window.dispatchEvent(new CustomEvent('carritoUpdated'))
      
      // Mostrar feedback visual
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error('Error:', error)
      alert('Error al agregar producto. Asegúrate de estar logueado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-2">🔌</div>
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
        {producto.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              Sin Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
          {producto.nombre}
        </h3>
        {producto.codigo && (
          <p className="text-gray-600 text-sm mb-3 font-mono bg-gray-50 px-2 py-1 rounded inline-block">
            {producto.codigo}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-3">
          {producto.categoria && (
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {producto.categoria}
            </span>
          )}
          {producto.fabricante && (
            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
              {producto.fabricante}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-500 text-xs">Precio</p>
            <p className="text-gray-800 font-bold text-xl">
              ${producto.precio?.toLocaleString('es-AR') || '0'}
            </p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            producto.stock > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={producto.stock === 0 || loading || added}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            added
              ? 'bg-green-500 text-white'
              : producto.stock > 0 && !loading
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Agregando...</span>
            </>
          ) : added ? (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>¡Agregado!</span>
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Agregar al Carrito</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default CardProducto

