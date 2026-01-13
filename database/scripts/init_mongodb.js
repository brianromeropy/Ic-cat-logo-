// Script para inicializar MongoDB con datos de ejemplo
// Ejecutar desde backend: node ../database/scripts/init_mongodb.js

const mongoose = require('mongoose')
const path = require('path')

// Cargar .env desde el directorio backend
const envPath = path.join(__dirname, '../../backend/.env')
require('dotenv').config({ path: envPath })

const Usuario = require('../../backend/models/Usuario')
const Producto = require('../../backend/models/Producto')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ic_catalogo'

async function initDatabase() {
  try {
    console.log('Conectando a MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')

    // Limpiar colecciones (opcional - comentar si quieres conservar datos)
    await Usuario.deleteMany({})
    await Producto.deleteMany({})
    console.log('Colecciones limpiadas')

    // Crear usuario admin
    const admin = await Usuario.create({
      email: 'admin@ictienda.com',
      password: 'admin123', // Se hashea automáticamente
      nombre: 'Administrador',
      telefono: '+54 11 1234-5678',
      role: 'admin'
    })
    console.log('Usuario admin creado:', admin.email)

    // Crear productos de ejemplo
    const productos = [
      {
        nombre: 'Amplificador Operacional LM358',
        codigo: 'LM358',
        categoria: 'Amplificador',
        fabricante: 'Texas Instruments',
        precio: 25.50,
        stock: 50,
        descripcion: 'Amplificador operacional dual de propósito general',
        especificaciones: 'Voltaje: 3V-32V, Corriente: 700µA',
        activo: true
      },
      {
        nombre: 'Timer NE555',
        codigo: 'NE555',
        categoria: 'Timer',
        fabricante: 'Texas Instruments',
        precio: 15.00,
        stock: 100,
        descripcion: 'Timer de precisión de propósito general',
        especificaciones: 'Voltaje: 4.5V-16V, Frecuencia: hasta 500kHz',
        activo: true
      },
      {
        nombre: 'Regulador de Voltaje LM7805',
        codigo: 'LM7805',
        categoria: 'Regulador',
        fabricante: 'STMicroelectronics',
        precio: 12.00,
        stock: 75,
        descripcion: 'Regulador de voltaje lineal 5V',
        especificaciones: 'Salida: 5V, Corriente: hasta 1A',
        activo: true
      },
      {
        nombre: 'Comparador LM339',
        codigo: 'LM339',
        categoria: 'Comparador',
        fabricante: 'Texas Instruments',
        precio: 18.50,
        stock: 60,
        descripcion: 'Comparador de voltaje cuádruple',
        especificaciones: 'Voltaje: 2V-36V, Offset: 2mV',
        activo: true
      },
      {
        nombre: 'Op-Amp TL072',
        codigo: 'TL072',
        categoria: 'Amplificador',
        fabricante: 'Texas Instruments',
        precio: 35.00,
        stock: 40,
        descripcion: 'Amplificador operacional JFET de bajo ruido',
        especificaciones: 'Ancho de banda: 3MHz, Ruido: 18nV/√Hz',
        activo: true
      },
      {
        nombre: 'Regulador LM317',
        codigo: 'LM317',
        categoria: 'Regulador',
        fabricante: 'STMicroelectronics',
        precio: 22.00,
        stock: 55,
        descripcion: 'Regulador de voltaje ajustable',
        especificaciones: 'Salida: 1.25V-37V, Corriente: hasta 1.5A',
        activo: true
      },
      {
        nombre: 'Comparador LM311',
        codigo: 'LM311',
        categoria: 'Comparador',
        fabricante: 'Texas Instruments',
        precio: 28.00,
        stock: 45,
        descripcion: 'Comparador de voltaje de propósito general',
        especificaciones: 'Voltaje: 5V-30V, Tiempo de respuesta: 200ns',
        activo: true
      },
      {
        nombre: 'Amplificador de Audio LM386',
        codigo: 'LM386',
        categoria: 'Amplificador',
        fabricante: 'Texas Instruments',
        precio: 20.00,
        stock: 80,
        descripcion: 'Amplificador de audio de baja potencia',
        especificaciones: 'Potencia: 325mW, Voltaje: 4V-12V',
        activo: true
      },
      {
        nombre: 'Regulador LM7812',
        codigo: 'LM7812',
        categoria: 'Regulador',
        fabricante: 'STMicroelectronics',
        precio: 14.00,
        stock: 65,
        descripcion: 'Regulador de voltaje lineal 12V',
        especificaciones: 'Salida: 12V, Corriente: hasta 1A',
        activo: true
      },
      {
        nombre: 'Op-Amp LM741',
        codigo: 'LM741',
        categoria: 'Amplificador',
        fabricante: 'Texas Instruments',
        precio: 16.50,
        stock: 90,
        descripcion: 'Amplificador operacional clásico',
        especificaciones: 'Voltaje: ±5V a ±22V, Ganancia: 200V/mV',
        activo: true
      }
    ]

    const productosCreados = await Producto.insertMany(productos)
    console.log(`${productosCreados.length} productos creados`)

    console.log('\n✅ Base de datos inicializada correctamente!')
    console.log('\nCredenciales de acceso:')
    console.log('Email: admin@ictienda.com')
    console.log('Password: admin123')
    console.log('\n⚠️  IMPORTANTE: Cambiar la contraseña después del primer login')

    process.exit(0)
  } catch (error) {
    console.error('Error al inicializar base de datos:', error)
    process.exit(1)
  }
}

initDatabase()

