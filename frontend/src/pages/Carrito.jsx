import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCarrito, removeFromCart, updateCartItem, sendPedidoWhatsApp } from '../utils/cart'
import { isAuthenticated } from '../utils/auth'

const Carrito = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadCarrito()
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
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Cargando carrito...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Carrito</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-16 text-center border border-gray-100">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-600 text-xl mb-2 font-semibold">Tu carrito está vacío</p>
          <p className="text-gray-500 mb-6">Agrega productos desde el catálogo</p>
          <button
            onClick={() => navigate('/catalogo')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ver Catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              {items.map(item => (
                <div key={item.producto_id} className="p-6 border-b border-gray-100 last:border-b-0 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex-1">
                    <h3 className="font-bold">{item.nombre}</h3>
                    {item.codigo && (
                      <p className="text-gray-600 text-sm">Código: {item.codigo}</p>
                    )}
                    {(item.categoria || item.fabricante) && (
                      <p className="text-gray-500 text-xs">
                        {item.categoria && item.fabricante 
                          ? `${item.categoria} - ${item.fabricante}`
                          : item.categoria || item.fabricante}
                      </p>
                    )}
                    <p className="text-blue-600 font-semibold">
                      ${item.precio.toLocaleString('es-AR')} c/u
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.producto_id, item.cantidad - 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.cantidad}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.producto_id, item.cantidad + 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="font-bold w-24 text-right">
                      ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                    </p>
                    
                    <button
                      onClick={() => handleRemove(item.producto_id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Resumen del Pedido</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({items.length}):</span>
                  <span className="font-medium">${total.toLocaleString('es-AR')}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-xl text-gray-800">
                  <span>Total:</span>
                  <span className="text-blue-600">${total.toLocaleString('es-AR')}</span>
                </div>
              </div>
              
              <button
                onClick={handleSendWhatsApp}
                disabled={sending}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
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

