// Script para inicializar MongoDB con datos de ejemplo
// Ejecutar desde backend: node init-database.js
// 
// ⚠️  IMPORTANTE: Este script NO elimina datos existentes
// - Solo crea el usuario admin si no existe
// - Solo inserta productos de ejemplo si la base está vacía
// Si quieres resetear la base de datos, usa: node reset-database.js

const mongoose = require('mongoose')
require('dotenv').config()

const Usuario = require('./models/Usuario')
const Producto = require('./models/Producto')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ic_catalogo'

async function initDatabase() {
  try {
    console.log('Conectando a MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('Conectado a MongoDB')

    // Verificar si existe usuario admin, si no, crearlo
    let admin = await Usuario.findOne({ email: 'admin@ictienda.com' })
    if (!admin) {
      admin = await Usuario.create({
        email: 'admin@ictienda.com',
        password: 'admin123', // Se hashea automáticamente
        nombre: 'Administrador',
        telefono: '+54 11 1234-5678',
        role: 'admin'
      })
      console.log('Usuario admin creado:', admin.email)
    } else {
      console.log('Usuario admin ya existe:', admin.email)
    }

    // Verificar productos existentes
    const productosExistentes = await Producto.countDocuments({})
    console.log(`Productos existentes en la base de datos: ${productosExistentes}`)
    
    if (productosExistentes > 0) {
      console.log('⚠️  Ya hay productos en la base de datos. No se insertarán productos de ejemplo.')
      console.log('Si deseas agregar productos de ejemplo, elimina los productos existentes primero.')
      process.exit(0)
    }

    // Crear productos de ejemplo - ICs de iPhone
    const productos = [
      {
        nombre: 'IC de Carga Tristar',
        codigo: 'TRISTAR-82',
        categoria: 'IC de carga',
        modelo_iphone: ['iPhone 12', 'iPhone 13', 'iPhone 14'],
        fabricante: 'Apple',
        costo: 35000,
        precio: 45000,
        stock: 25,
        descripcion: 'IC de carga Tristar para iPhone 12/13/14',
        especificaciones: 'Controlador de carga USB-C, protección contra sobrecorriente',
        activo: true
      },
      {
        nombre: 'PMIC Power Management',
        codigo: 'PMIC-338S',
        categoria: 'PMIC',
        modelo_iphone: ['iPhone 11', 'iPhone 12', 'iPhone 13'],
        fabricante: 'Apple',
        costo: 42000,
        precio: 55000,
        stock: 15,
        descripcion: 'PMIC para gestión de energía iPhone 11/12/13',
        especificaciones: 'Gestión de batería, regulación de voltaje',
        activo: true
      },
      {
        nombre: 'IC de Audio Codec',
        codigo: 'AUDIO-338S',
        categoria: 'IC de audio',
        modelo_iphone: ['iPhone 12', 'iPhone 13', 'iPhone 14'],
        fabricante: 'Apple',
        costo: 28000,
        precio: 38000,
        stock: 30,
        descripcion: 'IC de audio para iPhone 12/13/14',
        especificaciones: 'Codec de audio, procesamiento de señal',
        activo: true
      },
      {
        nombre: 'IC de Imagen ISP',
        codigo: 'ISP-338S',
        categoria: 'IC de imagen',
        modelo_iphone: ['iPhone 13', 'iPhone 14', 'iPhone 15'],
        fabricante: 'Apple',
        costo: 48000,
        precio: 65000,
        stock: 12,
        descripcion: 'IC de procesamiento de imagen para iPhone 13/14/15',
        especificaciones: 'Procesador de señal de imagen, HDR',
        activo: true
      },
      {
        nombre: 'IC Touch Controller',
        codigo: 'TOUCH-338S',
        categoria: 'IC de touch',
        modelo_iphone: ['iPhone 12', 'iPhone 13'],
        fabricante: 'Apple',
        costo: 32000,
        precio: 42000,
        stock: 20,
        descripcion: 'Controlador táctil para iPhone 12/13',
        especificaciones: 'Controlador de pantalla táctil, multi-touch',
        activo: true
      },
      {
        nombre: 'IC de Cámara Trasera',
        codigo: 'CAM-TRAS-82',
        categoria: 'IC de cámara',
        modelo_iphone: ['iPhone 13', 'iPhone 14'],
        fabricante: 'Apple',
        costo: 55000,
        precio: 72000,
        stock: 8,
        descripcion: 'IC de cámara trasera para iPhone 13/14',
        especificaciones: 'Controlador de cámara, estabilización de imagen',
        activo: true
      },
      {
        nombre: 'IC de Carga Lightning',
        codigo: 'CHG-LIGHT-82',
        categoria: 'IC de carga',
        modelo_iphone: ['iPhone 11', 'iPhone 12'],
        fabricante: 'Apple',
        costo: 26000,
        precio: 35000,
        stock: 35,
        descripcion: 'IC de carga Lightning para iPhone 11/12',
        especificaciones: 'Controlador de carga Lightning, protección',
        activo: true
      },
      {
        nombre: 'PMIC Batería',
        codigo: 'PMIC-BAT-338S',
        categoria: 'PMIC',
        modelo_iphone: ['iPhone 14', 'iPhone 15'],
        fabricante: 'Apple',
        costo: 36000,
        precio: 48000,
        stock: 18,
        descripcion: 'PMIC de gestión de batería iPhone 14/15',
        especificaciones: 'Gestión de carga, monitoreo de batería',
        activo: true
      },
      {
        nombre: 'IC de Audio Amplificador',
        codigo: 'AUD-AMP-338S',
        categoria: 'IC de audio',
        modelo_iphone: ['iPhone 11', 'iPhone 12'],
        fabricante: 'Apple',
        costo: 24000,
        precio: 32000,
        stock: 28,
        descripcion: 'Amplificador de audio para iPhone 11/12',
        especificaciones: 'Amplificador de audio, control de volumen',
        activo: true
      },
      {
        nombre: 'IC Touch Screen',
        codigo: 'TOUCH-SCR-338S',
        categoria: 'IC de touch',
        modelo_iphone: ['iPhone 14', 'iPhone 15'],
        fabricante: 'Apple',
        costo: 34000,
        precio: 45000,
        stock: 22,
        descripcion: 'Controlador táctil para iPhone 14/15',
        especificaciones: 'Pantalla táctil, reconocimiento de gestos',
        activo: true
      },
      {
        nombre: 'IC de Cámara Frontal',
        codigo: 'CAM-FRONT-82',
        categoria: 'IC de cámara',
        modelo_iphone: ['iPhone 12', 'iPhone 13', 'iPhone 14'],
        fabricante: 'Apple',
        costo: 44000,
        precio: 58000,
        stock: 15,
        descripcion: 'IC de cámara frontal TrueDepth para iPhone 12/13/14',
        especificaciones: 'Cámara frontal, Face ID, procesamiento',
        activo: true
      },
      {
        nombre: 'IC de Carga USB-C',
        codigo: 'CHG-USBC-82',
        categoria: 'IC de carga',
        modelo_iphone: ['iPhone 15'],
        fabricante: 'Apple',
        costo: 39000,
        precio: 52000,
        stock: 10,
        descripcion: 'IC de carga USB-C para iPhone 15',
        especificaciones: 'Controlador USB-C, carga rápida',
        activo: true
      }
    ]

    // Insertar productos de ejemplo solo si no hay productos
    const productosCreados = await Producto.insertMany(productos)
    console.log(`${productosCreados.length} productos de ejemplo creados`)

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
