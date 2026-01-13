/**
 * Interfaz del Repositorio de Producto
 */
class IProductoRepository {
  async create(producto) {
    throw new Error('Method create must be implemented')
  }

  async findById(id) {
    throw new Error('Method findById must be implemented')
  }

  async findAll(filters = {}) {
    throw new Error('Method findAll must be implemented')
  }

  async update(id, producto) {
    throw new Error('Method update must be implemented')
  }

  async delete(id) {
    throw new Error('Method delete must be implemented')
  }
}

module.exports = IProductoRepository

