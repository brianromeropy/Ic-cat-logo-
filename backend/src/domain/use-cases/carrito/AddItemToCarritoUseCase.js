/**
 * Caso de Uso: Agregar Item al Carrito
 */
class AddItemToCarritoUseCase {
  constructor(carritoRepository, productoRepository) {
    this.carritoRepository = carritoRepository
    this.productoRepository = productoRepository
  }

  async execute(usuarioId, productoId, cantidad) {
    // Verificar que el producto existe y tiene stock
    const producto = await this.productoRepository.findById(productoId)
    if (!producto || !producto.activo) {
      throw new Error('Producto no encontrado')
    }

    if (!producto.tieneStock(cantidad)) {
      throw new Error('Stock insuficiente')
    }

    // Obtener o crear carrito
    let carrito = await this.carritoRepository.findByUsuarioId(usuarioId)
    
    if (!carrito) {
      const Carrito = require('../../entities/Carrito')
      carrito = new Carrito({ usuarioId })
      carrito = await this.carritoRepository.create(carrito)
    }

    // Agregar item
    carrito.agregarItem(productoId, cantidad)
    
    // Guardar
    await this.carritoRepository.update(carrito.id, carrito)

    // Retornar carrito actualizado
    const GetCarritoUseCase = require('./GetCarritoUseCase')
    const getCarritoUseCase = new GetCarritoUseCase(
      this.carritoRepository,
      this.productoRepository
    )
    
    return await getCarritoUseCase.execute(usuarioId)
  }
}

module.exports = AddItemToCarritoUseCase

