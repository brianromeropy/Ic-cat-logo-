/**
 * Caso de Uso: Actualizar Producto
 */
class UpdateProductoUseCase {
  constructor(productoRepository) {
    this.productoRepository = productoRepository
  }

  async execute(id, productoData) {
    const productoExistente = await this.productoRepository.findById(id)
    if (!productoExistente) {
      throw new Error('Producto no encontrado')
    }

    const Producto = require('../../entities/Producto')
    const producto = new Producto({ ...productoExistente, ...productoData, id })

    // Validaciones de negocio
    if (producto.precio < 0) {
      throw new Error('El precio no puede ser negativo')
    }

    if (producto.stock < 0) {
      throw new Error('El stock no puede ser negativo')
    }

    return await this.productoRepository.update(id, producto)
  }
}

module.exports = UpdateProductoUseCase

