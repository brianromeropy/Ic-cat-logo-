const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/database')
require('dotenv').config()

const app = express()

// Conectar a MongoDB
connectDB()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(cookieParser())

// Logging middleware para debug
app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth')) {
    console.log(`${req.method} ${req.path}`, {
      body: req.method === 'POST' ? { ...req.body, password: '***' } : undefined,
      cookies: req.cookies
    })
  }
  next()
})

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/productos', require('./routes/productos'))
app.use('/api/carrito', require('./routes/carrito'))
app.use('/api/pedidos', require('./routes/pedidos'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

