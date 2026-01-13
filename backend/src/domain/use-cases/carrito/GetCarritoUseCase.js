/**
 * Caso de Uso: Obtener Carrito
 */
class GetCarritoUseCase {
  constructor(carritoRepository, productoRepository) {
    this.carritoRepository = carritoRepository
    this.productoRepository = productoRepository
  }

  async execute(usuarioId) {
    let carrito = await this.carritoRepository.findByUsuarioId(usuarioId)

    if (!carrito) {
      const Carrito = require('../../entities/Carrito')
      carrito = new Carrito({ usuarioId })
      carrito = await this.carritoRepository.create(carrito)
    }

    // Obtener productos para cada item
    const itemsConProductos = await Promise.all(
      carrito.items.map(async (item) => {
        const producto = await this.productoRepository.findById(item.productoId)
        if (!producto) {
          return null // O manejar el error según tu lógica
        }
        return {
          producto_id: producto.id,
          nombre: producto.nombre,
          codigo: producto.codigo,
          categoria: producto.categoria,
          fabricante: producto.fabricante,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: item.cantidad
        }
      })
    )

    // Filtrar items nulos
    const itemsValidos = itemsConProductos.filter(item => item !== null)

    return { items: itemsValidos }
  }
}

module.exports = GetCarritoUseCase

