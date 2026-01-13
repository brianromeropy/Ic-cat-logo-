const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  codigo: {
    type: String,
    trim: true,
    index: true
  },
  categoria: {
    type: String,
    trim: true
  },
  fabricante: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  descripcion: {
    type: String,
    trim: true
  },
  especificaciones: {
    type: String,
    trim: true
  },
  imagen: {
    type: String,
    trim: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Índice para búsquedas
productoSchema.index({ nombre: 'text', codigo: 'text', categoria: 'text' })

module.exports = mongoose.model('Producto', productoSchema)
