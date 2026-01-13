const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const authController = require('../src/presentation/controllers/AuthController')
const authMiddleware = require('../src/presentation/middleware/AuthMiddleware')

// Validaciones
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('nombre').trim().notEmpty(),
  body('telefono').trim().notEmpty()
]

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
]

router.post('/register', registerValidation, authController.register.bind(authController))
router.post('/login', loginValidation, authController.login.bind(authController))
router.post('/logout', authController.logout.bind(authController))
router.get('/me', authMiddleware.authenticate.bind(authMiddleware), authController.me.bind(authController))

module.exports = router
