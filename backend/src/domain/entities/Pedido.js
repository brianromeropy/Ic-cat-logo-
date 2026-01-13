/**
 * Entidad de Dominio: Pedido
 * Representa un pedido en el sistema
 */
class Pedido {
  constructor({ id, usuarioId, items = [], total = 0, estado = 'pendiente' }) {
    this.id = id
    this.usuarioId = usuarioId
    this.items = items
    this.total = total
    this.estado = estado
  }

  puedeCancelarse() {
    return this.estado === 'pendiente'
  }

  cancelar() {
    if (!this.puedeCancelarse()) {
      throw new Error('No se puede cancelar este pedido')
    }
    this.estado = 'cancelado'
  }

  marcarComoCompletado() {
    this.estado = 'completado'
  }
}

module.exports = Pedido

