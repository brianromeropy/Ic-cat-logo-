/**
 * Interfaz del Repositorio de Carrito
 */
class ICarritoRepository {
  async findByUsuarioId(usuarioId) {
    throw new Error('Method findByUsuarioId must be implemented')
  }

  async create(carrito) {
    throw new Error('Method create must be implemented')
  }

  async update(id, carrito) {
    throw new Error('Method update must be implemented')
  }

  async clearItems(usuarioId) {
    throw new Error('Method clearItems must be implemented')
  }
}

module.exports = ICarritoRepository

