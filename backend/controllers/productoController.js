const Producto = require('../models/Producto')
const { validationResult } = require('express-validator')

exports.getAll = async (req, res) => {
  try {
    const { search, categoria, fabricante } = req.query
    const query = { activo: true }

    if (search) {
      query.$text = { $search: search }
    }
    if (categoria) {
      query.categoria = categoria
    }
    if (fabricante) {
      query.fabricante = fabricante
    }

    const productos = await Producto.find(query)
      .sort(search ? { score: { $meta: 'textScore' } } : { nombre: 1 })
      .select('-__v')

    res.json(productos)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    res.status(500).json({ message: 'Error al obtener productos' })
  }
}

exports.getById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }
    res.json(producto)
  } catch (error) {
    console.error('Error al obtener producto:', error)
    res.status(500).json({ message: 'Error al obtener producto' })
  }
}

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const producto = await Producto.create(req.body)
    res.status(201).json(producto)
  } catch (error) {
    console.error('Error al crear producto:', error)
    res.status(500).json({ message: 'Error al crear producto' })
  }
}

exports.update = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json(producto)
  } catch (error) {
    console.error('Error al actualizar producto:', error)
    res.status(500).json({ message: 'Error al actualizar producto' })
  }
}

exports.delete = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    )

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar producto:', error)
    res.status(500).json({ message: 'Error al eliminar producto' })
  }
}
