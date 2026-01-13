import api from './api'

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    // Disparar evento para actualizar el estado de autenticación
    window.dispatchEvent(new CustomEvent('authStateChanged'))
    return response.data
  } catch (error) {
    console.error('Error en login:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Error al iniciar sesión'
    throw new Error(errorMessage)
  }
}

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    // Disparar evento para actualizar el estado de autenticación
    window.dispatchEvent(new CustomEvent('authStateChanged'))
    return response.data
  } catch (error) {
    console.error('Error en registro:', error)
    const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Error al registrar usuario'
    throw new Error(errorMessage)
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
  // Disparar evento para actualizar el estado de autenticación
  window.dispatchEvent(new CustomEvent('authStateChanged'))
}

export const isAuthenticated = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data.user
  } catch (error) {
    return null
  }
}

