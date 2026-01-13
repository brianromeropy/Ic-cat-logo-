import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCarrito, removeFromCart, updateCartItem, sendPedidoWhatsApp } from '../utils/cart'
import { isAuthenticated } from '../utils/auth'
import { formatPrice } from '../utils/format'

const Carrito = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadCarrito()
    
    // Escuchar cambios en el estado de autenticación
    const handleAuthChange = () => {
      loadCarrito()
    }
    
    window.addEventListener('authStateChanged', handleAuthChange)
    
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange)
    }
  }, [])

  const loadCarrito = async () => {
    const user = await isAuthenticated()
    if (!user) {
      navigate('/login')
      return
    }

    try {
      setLoading(true)
      const data = await getCarrito()
      setItems(data.items || [])
    } catch (error) {
      console.error('Error al cargar carrito:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (productoId) => {
    try {
      await removeFromCart(productoId)
      await loadCarrito()
      // Actualizar contador del navbar
      window.dispatchEvent(new CustomEvent('carritoUpdated'))
    } catch (error) {
      alert('Error al eliminar producto')
    }
  }

  const handleUpdateQuantity = async (productoId, cantidad) => {
    if (cantidad < 1) return
    try {
      await updateCartItem(productoId, cantidad)
      await loadCarrito()
      // Actualizar contador del navbar
      window.dispatchEvent(new CustomEvent('carritoUpdated'))
    } catch (error) {
      alert('Error al actualizar cantidad')
    }
  }

  const handleSendWhatsApp = async () => {
    if (items.length === 0) {
      alert('El carrito está vacío')
      return
    }

    setSending(true)
    try {
      const response = await sendPedidoWhatsApp()
      
      // Abrir WhatsApp en una nueva ventana con el mensaje formateado
      if (response.whatsappUrl) {
        window.open(response.whatsappUrl, '_blank')
        alert('Pedido creado correctamente. Se abrió WhatsApp para enviar el mensaje.')
      } else {
        // Si no hay URL, mostrar el mensaje para copiar
        const mensaje = response.mensaje || 'Pedido creado'
        navigator.clipboard.writeText(mensaje).then(() => {
          alert('Pedido creado. El mensaje se copió al portapapeles. Pégalo en WhatsApp.')
        }).catch(() => {
          alert(`Pedido creado. Mensaje:\n\n${mensaje}`)
        })
      }
      
      // Limpiar carrito después de enviar
      setItems([])
      await loadCarrito() // Recargar para limpiar
      // Actualizar contador del navbar
      window.dispatchEvent(new CustomEvent('carritoUpdated'))
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear pedido. Verifica que estés logueado.')
    } finally {
      setSending(false)
    }
  }

  const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-screen flex items-center justify-center">
        <div>
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-gray-400">Cargando carrito...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-3 text-white">
          <span className="text-gold">Mi</span> Carrito
        </h1>
        <p className="text-gray-400 text-lg">Revisa y confirma tu pedido</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-dark-surface rounded-2xl border border-gold/20 p-20 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-300 text-2xl mb-3 font-semibold">Tu carrito está vacío</p>
          <p className="text-gray-500 mb-8">Agrega productos desde el catálogo</p>
          <button
            onClick={() => navigate('/catalogo')}
            className="px-10 py-4 rounded-xl bg-gold-gradient text-dark-bg hover:shadow-gold transition-all duration-300 font-bold transform hover:scale-105"
          >
            Ver Catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-dark-surface rounded-xl border border-gold/20 overflow-hidden">
              {items.map((item, index) => (
                <div 
                  key={item.producto_id} 
                  className={`p-6 border-b border-gold/10 last:border-b-0 flex items-center justify-between hover:bg-dark-card transition ${
                    index % 2 === 0 ? 'bg-dark-surface' : 'bg-dark-bg'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-2">{item.nombre}</h3>
                    {item.codigo && (
                      <p className="text-gold text-sm font-mono mb-1">Código: {item.codigo}</p>
                    )}
                    {(item.categoria || item.fabricante) && (
                      <p className="text-gray-400 text-xs mb-2">
                        {item.categoria && item.fabricante 
                          ? `${item.categoria} - ${item.fabricante}`
                          : item.categoria || item.fabricante}
                      </p>
                    )}
                    <p className="text-gold font-bold text-lg">
                      {formatPrice(item.precio)} c/u
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.producto_id, item.cantidad - 1)}
                        className="w-10 h-10 bg-dark-bg border border-gold/30 text-gold rounded-lg hover:bg-gold hover:text-dark-bg transition-all font-bold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-white font-bold text-lg">{item.cantidad}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.producto_id, item.cantidad + 1)}
                        className="w-10 h-10 bg-dark-bg border border-gold/30 text-gold rounded-lg hover:bg-gold hover:text-dark-bg transition-all font-bold"
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="font-bold text-gold text-xl w-32 text-right">
                      {formatPrice(item.precio * item.cantidad)}
                    </p>
                    
                    <button
                      onClick={() => handleRemove(item.producto_id)}
                      className="text-red-400 hover:text-red-300 transition-colors px-3 py-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-dark-surface rounded-xl border border-gold/20 p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-white">
                <span className="text-gold">Resumen</span> del Pedido
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400 pb-3 border-b border-gold/20">
                  <span>Productos ({items.length}):</span>
                  <span className="font-medium text-white">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between font-bold text-2xl text-white pt-2">
                  <span>Total:</span>
                  <span className="text-gold">{formatPrice(total)}</span>
                </div>
              </div>
              
              <button
                onClick={handleSendWhatsApp}
                disabled={sending}
                className="w-full bg-gold-gradient text-dark-bg py-4 rounded-xl font-bold hover:shadow-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-.92-2.155-.897-3.589-2.004-3.99-2.344-.401-.34-1.196-1.117-1.196-2.18 0-1.062.596-1.562.894-1.861.298-.298.64-.372.894-.372s.471.074.67.223c.199.15.64.644.99 1.04.297.298.521.39.894.39s.596-.074.894-.223c.298-.15.64-.298 1.04-.149.401.15 1.758.867 2.03.967.273.099.471.148.67-.15.197-.297.767-.966.94-1.164.173-.199.347-.223.644-.075.297.15 1.255.463 2.39.92 2.155.897 3.589 2.004 3.99 2.344.401.34 1.196 1.117 1.196 2.18 0 1.062-.596 1.562-.894 1.861-.298.298-.64.372-.894.372s-.471-.074-.67-.223c-.199-.15-.64-.644-.99-1.04-.297-.298-.521-.39-.894-.39s-.596.074-.894.223c-.298.15-.64.298-1.04.149z"/>
                    </svg>
                    <span>Enviar Pedido por WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrito

