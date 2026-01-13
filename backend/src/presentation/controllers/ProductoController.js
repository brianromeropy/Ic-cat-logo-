/**
 * Controller de Productos
 */
const { validationResult } = require('express-validator')
const container = require('../../infrastructure/di/container')

class ProductoController {
  async getAll(req, res) {
    try {
      const { search, categoria, fabricante, modelo } = req.query
      const filters = {}

      if (search) filters.search = search
      if (categoria) filters.categoria = categoria
      if (fabricante) filters.fabricante = fabricante
      if (modelo) filters.modelo = modelo

      const useCase = container.getGetProductosUseCase()
      const productos = await useCase.execute(filters)

      // Convertir entidades a objetos planos para la respuesta
      const productosResponse = productos.map(p => ({
        _id: p.id,
        nombre: p.nombre,
        codigo: p.codigo,
        categoria: p.categoria,
        modelo_iphone: p.modelo_iphone,
        fabricante: p.fabricante,
        costo: p.costo,
        precio: p.precio,
        stock: p.stock,
        descripcion: p.descripcion,
        especificaciones: p.especificaciones,
        imagen: p.imagen,
        activo: p.activo
      }))

      res.json(productosResponse)
    } catch (error) {
      console.error('Error al obtener productos:', error)
      res.status(500).json({ message: 'Error al obtener productos' })
    }
  }

  async getById(req, res) {
    try {
      const productoRepository = container.getProductoRepository()
      const producto = await productoRepository.findById(req.params.id)

      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      res.json({
        _id: producto.id,
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
    } catch (error) {
      console.error('Error al obtener producto:', error)
      res.status(500).json({ message: 'Error al obtener producto' })
    }
  }

  async create(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const useCase = container.getCreateProductoUseCase()
      const producto = await useCase.execute(req.body)

      res.status(201).json({
        _id: producto.id,
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
    } catch (error) {
      console.error('Error al crear producto:', error)
      res.status(400).json({
        message: error.message || 'Error al crear producto'
      })
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const useCase = container.getUpdateProductoUseCase()
      const producto = await useCase.execute(req.params.id, req.body)

      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      res.json({
        _id: producto.id,
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
    } catch (error) {
      console.error('Error al actualizar producto:', error)
      res.status(400).json({
        message: error.message || 'Error al actualizar producto'
      })
    }
  }

  async delete(req, res) {
    try {
      const productoRepository = container.getProductoRepository()
      await productoRepository.delete(req.params.id)

      res.json({ message: 'Producto eliminado correctamente' })
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      res.status(500).json({ message: 'Error al eliminar producto' })
    }
  }
}

module.exports = new ProductoController()

