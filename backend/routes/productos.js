const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const productoController = require('../controllers/productoController')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

// Validaciones
const productoValidation = [
  body('nombre').trim().notEmpty(),
  body('precio').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }).optional()
]

// Rutas públicas
router.get('/', productoController.getAll)
router.get('/:id', productoController.getById)

// Rutas protegidas (solo admin)
router.post('/', authMiddleware, adminMiddleware, productoValidation, productoController.create)
router.put('/:id', authMiddleware, adminMiddleware, productoValidation, productoController.update)
router.delete('/:id', authMiddleware, adminMiddleware, productoController.delete)

module.exports = router

