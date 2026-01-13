const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const authController = require('../controllers/authController')
const { authMiddleware } = require('../middleware/auth')

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

router.post('/register', registerValidation, authController.register)
router.post('/login', loginValidation, authController.login)
router.post('/logout', authController.logout)
router.get('/me', authMiddleware, authController.me)

module.exports = router

