import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../utils/cart'
import { formatPrice } from '../utils/format'

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
    <div className="bg-dark-surface rounded-xl overflow-hidden hover:shadow-gold transition-all duration-300 border border-gold/20 group hover:border-gold">
      <div className="h-56 bg-gradient-to-br from-dark-card to-dark-surface flex items-center justify-center relative overflow-hidden">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 bg-gold/10 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <span className="text-gray-500 text-xs">Sin imagen</span>
          </div>
        )}
        {producto.stock === 0 && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
              Sin Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 text-white line-clamp-2 min-h-[3.5rem] leading-tight">
          {producto.nombre}
        </h3>
        {producto.codigo && (
          <p className="text-gold text-xs mb-3 font-mono bg-dark-card px-3 py-1.5 rounded-lg border border-gold/30 inline-block">
            {producto.codigo}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {producto.categoria && (
            <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full font-medium border border-gold/30">
              {producto.categoria}
            </span>
          )}
          {Array.isArray(producto.modelo_iphone) && producto.modelo_iphone.length > 0 && (
            <span className="text-xs bg-gold/10 text-gold-light px-3 py-1 rounded-full font-medium border border-gold/30">
              {producto.modelo_iphone.join(', ')}
            </span>
          )}
          {producto.fabricante && (
            <span className="text-xs bg-dark-card text-gray-400 px-3 py-1 rounded-full font-medium border border-gray-700">
              {producto.fabricante}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-500 text-xs mb-1">Precio</p>
            <p className="text-gold font-bold text-2xl">
              {formatPrice(producto.precio || 0)}
            </p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            producto.stock > 0 
              ? 'bg-gold/10 text-gold border border-gold/30' 
              : 'bg-red-900/30 text-red-400 border border-red-600/50'
          }`}>
            {producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={producto.stock === 0 || loading || added}
          className={`w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 ${
            added
              ? 'bg-gold text-dark-bg shadow-gold'
              : producto.stock > 0 && !loading
                ? 'bg-gold-gradient text-dark-bg hover:shadow-gold transform hover:scale-105'
                : 'bg-dark-surface text-gray-600 border border-gray-700 cursor-not-allowed'
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

