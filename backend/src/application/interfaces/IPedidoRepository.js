/**
 * Interfaz del Repositorio de Pedido
 */
class IPedidoRepository {
  async create(pedido) {
    throw new Error('Method create must be implemented')
  }

  async findById(id) {
    throw new Error('Method findById must be implemented')
  }

  async findByUsuarioId(usuarioId) {
    throw new Error('Method findByUsuarioId must be implemented')
  }

  async update(id, pedido) {
    throw new Error('Method update must be implemented')
  }
}

module.exports = IPedidoRepository

