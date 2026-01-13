/**
 * Caso de Uso: Crear Producto
 */
class CreateProductoUseCase {
  constructor(productoRepository) {
    this.productoRepository = productoRepository
  }

  async execute(productoData) {
    const Producto = require('../../entities/Producto')
    const producto = new Producto(productoData)

    // Validaciones de negocio
    if (producto.precio < 0) {
      throw new Error('El precio no puede ser negativo')
    }

    if (producto.stock < 0) {
      throw new Error('El stock no puede ser negativo')
    }

    return await this.productoRepository.create(producto)
  }
}

module.exports = CreateProductoUseCase

