import api from './api'

export const getCarrito = async () => {
  const response = await api.get('/carrito')
  return response.data
}

export const addToCart = async (productoId, cantidad = 1) => {
  const response = await api.post('/carrito', { productoId, cantidad })
  return response.data
}

export const removeFromCart = async (productoId) => {
  const response = await api.delete(`/carrito/${productoId}`)
  return response.data
}

export const updateCartItem = async (productoId, cantidad) => {
  const response = await api.put(`/carrito/${productoId}`, { cantidad })
  return response.data
}

export const sendPedidoWhatsApp = async () => {
  const response = await api.post('/pedidos/whatsapp')
  return response.data
}

