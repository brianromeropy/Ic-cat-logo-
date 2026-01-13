/**
 * Entidad de Dominio: Carrito
 * Representa un carrito de compras
 */
class Carrito {
  constructor({ id, usuarioId, items = [] }) {
    this.id = id
    this.usuarioId = usuarioId
    this.items = items
  }

  agregarItem(productoId, cantidad) {
    const itemExistente = this.items.find(
      item => item.productoId === productoId
    )

    if (itemExistente) {
      itemExistente.cantidad += cantidad
    } else {
      this.items.push({ productoId, cantidad })
    }
  }

  actualizarCantidad(productoId, cantidad) {
    const item = this.items.find(item => item.productoId === productoId)
    if (item) {
      item.cantidad = cantidad
    }
  }

  removerItem(productoId) {
    this.items = this.items.filter(item => item.productoId !== productoId)
  }

  estaVacio() {
    return this.items.length === 0
  }

  calcularTotal(productos) {
    return this.items.reduce((total, item) => {
      const producto = productos.find(p => p.id === item.productoId)
      return total + (producto ? producto.precio * item.cantidad : 0)
    }, 0)
  }
}

module.exports = Carrito

