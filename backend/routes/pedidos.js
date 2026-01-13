const express = require('express')
const router = express.Router()
const pedidoController = require('../src/presentation/controllers/PedidoController')
const authMiddleware = require('../src/presentation/middleware/AuthMiddleware')

router.use(authMiddleware.authenticate.bind(authMiddleware))

router.post('/whatsapp', pedidoController.sendWhatsApp.bind(pedidoController))

module.exports = router
