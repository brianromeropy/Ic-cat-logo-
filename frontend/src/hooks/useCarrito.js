import { useState, useEffect } from 'react'
import { getCarrito } from '../utils/cart'
import { isAuthenticated } from '../utils/auth'

export const useCarrito = () => {
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCarritoCount()
    
    // Escuchar eventos de actualización del carrito
    const handleCarritoUpdate = () => {
      loadCarritoCount()
    }
    
    window.addEventListener('carritoUpdated', handleCarritoUpdate)
    
    return () => {
      window.removeEventListener('carritoUpdated', handleCarritoUpdate)
    }
  }, [])

  const loadCarritoCount = async () => {
    try {
      const user = await isAuthenticated()
      if (!user) {
        setCartCount(0)
        setLoading(false)
        return
      }

      const data = await getCarrito()
      const count = data.items?.reduce((sum, item) => sum + item.cantidad, 0) || 0
      setCartCount(count)
    } catch (error) {
      console.error('Error al cargar carrito:', error)
      setCartCount(0)
    } finally {
      setLoading(false)
    }
  }

  return { cartCount, loading }
}

