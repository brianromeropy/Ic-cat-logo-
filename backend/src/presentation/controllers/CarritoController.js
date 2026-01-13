/**
 * Controller de Carrito
 */
const container = require('../../infrastructure/di/container')
const Carrito = require('../../domain/entities/Carrito')

class CarritoController {
  async getCarrito(req, res) {
    try {
      const useCase = container.getGetCarritoUseCase()
      const result = await useCase.execute(req.user.id)

      res.json(result)
    } catch (error) {
      console.error('Error al obtener carrito:', error)
      res.status(500).json({ message: 'Error al obtener carrito' })
    }
  }

  async addItem(req, res) {
    try {
      const { productoId, cantidad } = req.body

      const useCase = container.getAddItemToCarritoUseCase()
      const result = await useCase.execute(req.user.id, productoId, cantidad)

      res.json(result)
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
      res.status(400).json({
        message: error.message || 'Error al agregar al carrito'
      })
    }
  }

  async updateItem(req, res) {
    try {
      const { cantidad } = req.body
      const productoId = req.params.productoId

      const carritoRepository = container.getCarritoRepository()
      let carrito = await carritoRepository.findByUsuarioId(req.user.id)

      if (!carrito) {
        carrito = new Carrito({ usuarioId: req.user.id })
        carrito = await carritoRepository.create(carrito)
      }

      if (cantidad <= 0) {
        carrito.removerItem(productoId)
      } else {
        carrito.actualizarCantidad(productoId, cantidad)
      }

      await carritoRepository.update(carrito.id, carrito)

      const getCarritoUseCase = container.getGetCarritoUseCase()
      const result = await getCarritoUseCase.execute(req.user.id)

      res.json(result)
    } catch (error) {
      console.error('Error al actualizar carrito:', error)
      res.status(500).json({ message: 'Error al actualizar carrito' })
    }
  }

  async removeItem(req, res) {
    try {
      const productoId = req.params.productoId

      const carritoRepository = container.getCarritoRepository()
      const carrito = await carritoRepository.findByUsuarioId(req.user.id)

      if (!carrito) {
        return res.status(404).json({ message: 'Carrito no encontrado' })
      }

      carrito.removerItem(productoId)
      await carritoRepository.update(carrito.id, carrito)

      res.json({ message: 'Item eliminado del carrito' })
    } catch (error) {
      console.error('Error al eliminar del carrito:', error)
      res.status(500).json({ message: 'Error al eliminar del carrito' })
    }
  }
}

module.exports = new CarritoController()

