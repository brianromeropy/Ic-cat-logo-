const express = require('express')
const router = express.Router()
const carritoController = require('../controllers/carritoController')
const { authMiddleware } = require('../middleware/auth')

// Todas las rutas requieren autenticación
router.use(authMiddleware)

router.get('/', carritoController.getCarrito)
router.post('/', carritoController.addItem)
router.put('/:productoId', carritoController.updateItem)
router.delete('/:productoId', carritoController.removeItem)

module.exports = router

