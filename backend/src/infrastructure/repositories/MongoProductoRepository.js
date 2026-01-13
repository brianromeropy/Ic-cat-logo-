/**
 * Implementación MongoDB del Repositorio de Producto
 */
const ProductoModel = require('../../../models/Producto')
const Producto = require('../../domain/entities/Producto')
const IProductoRepository = require('../../application/interfaces/IProductoRepository')

class MongoProductoRepository extends IProductoRepository {
  async create(producto) {
    const productoDoc = await ProductoModel.create({
      nombre: producto.nombre,
      codigo: producto.codigo,
      categoria: producto.categoria,
      modelo_iphone: producto.modelo_iphone,
      fabricante: producto.fabricante,
      costo: producto.costo,
      precio: producto.precio,
      stock: producto.stock,
      descripcion: producto.descripcion,
      especificaciones: producto.especificaciones,
      imagen: producto.imagen,
      activo: producto.activo
    })

    return this.toEntity(productoDoc)
  }

  async findById(id) {
    const productoDoc = await ProductoModel.findById(id)
    return productoDoc ? this.toEntity(productoDoc) : null
  }

  async findAll(filters = {}) {
    const query = { activo: true }

    if (filters.search) {
      query.$text = { $search: filters.search }
    }
    if (filters.categoria) {
      query.categoria = filters.categoria
    }
    if (filters.fabricante) {
      query.fabricante = filters.fabricante
    }
    if (filters.modelo) {
      query.modelo_iphone = filters.modelo
    }

    const productosDoc = await ProductoModel.find(query)
      .sort(filters.search ? { score: { $meta: 'textScore' } } : { nombre: 1 })
      .select('-__v')

    return productosDoc.map(doc => this.toEntity(doc))
  }

  async update(id, producto) {
    const productoDoc = await ProductoModel.findByIdAndUpdate(
      id,
      {
        nombre: producto.nombre,
        codigo: producto.codigo,
        categoria: producto.categoria,
        modelo_iphone: producto.modelo_iphone,
        fabricante: producto.fabricante,
        costo: producto.costo,
        precio: producto.precio,
        stock: producto.stock,
        descripcion: producto.descripcion,
        especificaciones: producto.especificaciones,
        imagen: producto.imagen,
        activo: producto.activo
      },
      { new: true, runValidators: true }
    )

    return productoDoc ? this.toEntity(productoDoc) : null
  }

  async delete(id) {
    await ProductoModel.findByIdAndUpdate(id, { activo: false }, { new: true })
  }

  toEntity(productoDoc) {
    return new Producto({
      id: productoDoc._id.toString(),
      nombre: productoDoc.nombre,
      codigo: productoDoc.codigo,
      categoria: productoDoc.categoria,
      modelo_iphone: productoDoc.modelo_iphone || [],
      fabricante: productoDoc.fabricante,
      costo: productoDoc.costo,
      precio: productoDoc.precio,
      stock: productoDoc.stock,
      descripcion: productoDoc.descripcion,
      especificaciones: productoDoc.especificaciones,
      imagen: productoDoc.imagen,
      activo: productoDoc.activo
    })
  }
}

module.exports = MongoProductoRepository

