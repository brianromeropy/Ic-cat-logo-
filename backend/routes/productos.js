const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const productoController = require('../src/presentation/controllers/ProductoController')
const authMiddleware = require('../src/presentation/middleware/AuthMiddleware')

// Validaciones
const productoValidation = [
  body('nombre').trim().notEmpty(),
  body('precio').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }).optional()
]

// Rutas públicas
router.get('/', productoController.getAll.bind(productoController))
router.get('/:id', productoController.getById.bind(productoController))

// Rutas protegidas (solo admin)
router.post('/', authMiddleware.authenticate.bind(authMiddleware), authMiddleware.requireAdmin.bind(authMiddleware), productoValidation, productoController.create.bind(productoController))
router.put('/:id', authMiddleware.authenticate.bind(authMiddleware), authMiddleware.requireAdmin.bind(authMiddleware), productoValidation, productoController.update.bind(productoController))
router.delete('/:id', authMiddleware.authenticate.bind(authMiddleware), authMiddleware.requireAdmin.bind(authMiddleware), productoController.delete.bind(productoController))

module.exports = router
