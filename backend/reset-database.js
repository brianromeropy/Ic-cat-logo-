// Script para RESETEAR MongoDB (elimina todos los datos)
// ⚠️  ADVERTENCIA: Este script elimina TODOS los datos
// Ejecutar desde backend: node reset-database.js

const mongoose = require('mongoose')
require('dotenv').config()

const Usuario = require('./models/Usuario')
const Producto = require('./models/Producto')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ic_catalogo'

async function resetDatabase() {
  try {
    console.log('⚠️  ADVERTENCIA: Este script eliminará TODOS los datos')
    console.log('Conectando a MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')

    // Limpiar colecciones
    await Usuario.deleteMany({})
    await Producto.deleteMany({})
    console.log('✅ Todas las colecciones han sido limpiadas')

    console.log('\n✅ Base de datos reseteada correctamente!')
    console.log('Ahora puedes ejecutar: node init-database.js para crear datos de ejemplo')

    process.exit(0)
  } catch (error) {
    console.error('Error al resetear base de datos:', error)
    process.exit(1)
  }
}

resetDatabase()

