/**
 * Caso de Uso: Obtener Productos
 */
class GetProductosUseCase {
  constructor(productoRepository) {
    this.productoRepository = productoRepository
  }

  async execute(filters = {}) {
    return await this.productoRepository.findAll(filters)
  }
}

module.exports = GetProductosUseCase

