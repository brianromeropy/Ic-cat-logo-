import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
  // Limpiar cualquier estado local si es necesario
}

export const isAuthenticated = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data.user
  } catch (error) {
    return null
  }
}

