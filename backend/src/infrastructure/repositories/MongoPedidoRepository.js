/**
 * Implementación MongoDB del Repositorio de Pedido
 */
const PedidoModel = require('../../../models/Pedido')
const Pedido = require('../../domain/entities/Pedido')
const IPedidoRepository = require('../../application/interfaces/IPedidoRepository')

class MongoPedidoRepository extends IPedidoRepository {
  async create(pedido) {
    const pedidoDoc = await PedidoModel.create({
      usuario: pedido.usuarioId,
      items: pedido.items.map(item => ({
        producto: item.productoId,
        cantidad: item.cantidad,
        precio: item.precio
      })),
      total: pedido.total,
      estado: pedido.estado
    })

    return this.toEntity(pedidoDoc)
  }

  async findById(id) {
    const pedidoDoc = await PedidoModel.findById(id)
    return pedidoDoc ? this.toEntity(pedidoDoc) : null
  }

  async findByUsuarioId(usuarioId) {
    const pedidosDoc = await PedidoModel.find({ usuario: usuarioId })
    return pedidosDoc.map(doc => this.toEntity(doc))
  }

  async update(id, pedido) {
    const pedidoDoc = await PedidoModel.findByIdAndUpdate(
      id,
      {
        items: pedido.items.map(item => ({
          producto: item.productoId,
          cantidad: item.cantidad,
          precio: item.precio
        })),
        total: pedido.total,
        estado: pedido.estado
      },
      { new: true }
    )

    return pedidoDoc ? this.toEntity(pedidoDoc) : null
  }

  toEntity(pedidoDoc) {
    return new Pedido({
      id: pedidoDoc._id.toString(),
      usuarioId: pedidoDoc.usuario.toString(),
      items: pedidoDoc.items.map(item => ({
        productoId: item.producto.toString(),
        cantidad: item.cantidad,
        precio: item.precio
      })),
      total: pedidoDoc.total,
      estado: pedidoDoc.estado
    })
  }
}

module.exports = MongoPedidoRepository

