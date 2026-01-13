const express = require('express')
const router = express.Router()
const pedidoController = require('../controllers/pedidoController')
const { authMiddleware } = require('../middleware/auth')

router.use(authMiddleware)

router.post('/whatsapp', pedidoController.sendWhatsApp)

module.exports = router

