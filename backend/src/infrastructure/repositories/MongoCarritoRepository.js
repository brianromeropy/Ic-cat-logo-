/**
 * Implementación MongoDB del Repositorio de Carrito
 */
const CarritoModel = require('../../../models/Carrito')
const Carrito = require('../../domain/entities/Carrito')
const ICarritoRepository = require('../../application/interfaces/ICarritoRepository')

class MongoCarritoRepository extends ICarritoRepository {
  async findByUsuarioId(usuarioId) {
    const carritoDoc = await CarritoModel.findOne({ usuario: usuarioId })
    return carritoDoc ? this.toEntity(carritoDoc) : null
  }

  async create(carrito) {
    const carritoDoc = await CarritoModel.create({
      usuario: carrito.usuarioId,
      items: carrito.items.map(item => ({
        producto: item.productoId,
        cantidad: item.cantidad
      }))
    })

    return this.toEntity(carritoDoc)
  }

  async update(id, carrito) {
    const carritoDoc = await CarritoModel.findByIdAndUpdate(
      id,
      {
        items: carrito.items.map(item => ({
          producto: item.productoId,
          cantidad: item.cantidad
        }))
      },
      { new: true }
    )

    return carritoDoc ? this.toEntity(carritoDoc) : null
  }

  async clearItems(usuarioId) {
    await CarritoModel.findOneAndUpdate(
      { usuario: usuarioId },
      { items: [] }
    )
  }

  toEntity(carritoDoc) {
    return new Carrito({
      id: carritoDoc._id.toString(),
      usuarioId: carritoDoc.usuario.toString(),
      items: carritoDoc.items.map(item => ({
        productoId: item.producto.toString(),
        cantidad: item.cantidad
      }))
    })
  }
}

module.exports = MongoCarritoRepository

