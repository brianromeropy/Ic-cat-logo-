import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Productos
export const getProductos = async () => {
  const response = await api.get('/productos')
  return response.data
}

export const getProducto = async (id) => {
  const response = await api.get(`/productos/${id}`)
  return response.data
}

export const createProducto = async (producto) => {
  const response = await api.post('/productos', producto)
  return response.data
}

export const updateProducto = async (id, producto) => {
  const response = await api.put(`/productos/${id}`, producto)
  return response.data
}

export const deleteProducto = async (id) => {
  const response = await api.delete(`/productos/${id}`)
  return response.data
}

export default api

