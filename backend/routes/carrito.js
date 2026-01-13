const express = require('express')
const router = express.Router()
const carritoController = require('../src/presentation/controllers/CarritoController')
const authMiddleware = require('../src/presentation/middleware/AuthMiddleware')

// Todas las rutas requieren autenticación
router.use(authMiddleware.authenticate.bind(authMiddleware))

router.get('/', carritoController.getCarrito.bind(carritoController))
router.post('/', carritoController.addItem.bind(carritoController))
router.put('/:productoId', carritoController.updateItem.bind(carritoController))
router.delete('/:productoId', carritoController.removeItem.bind(carritoController))

module.exports = router

