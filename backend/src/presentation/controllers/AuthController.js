/**
 * Controller de Autenticación
 * Capa de Presentación - Maneja requests/responses HTTP
 */
const { validationResult } = require('express-validator')
const container = require('../../infrastructure/di/container')

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password, nombre, telefono } = req.body

      const useCase = container.getRegisterUsuarioUseCase()
      const result = await useCase.execute({
        email,
        password,
        nombre,
        telefono,
        role: 'tecnico'
      })

      // Configurar cookie
      this.setAuthCookie(res, result.token)

      res.status(201).json({
        message: 'Usuario registrado correctamente',
        user: result.usuario
      })
    } catch (error) {
      console.error('Error en registro:', error)
      res.status(400).json({
        message: error.message || 'Error al registrar usuario'
      })
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body

      const useCase = container.getLoginUsuarioUseCase()
      const result = await useCase.execute({ email, password })

      // Configurar cookie
      this.setAuthCookie(res, result.token)

      res.json({
        message: 'Login exitoso',
        user: result.usuario
      })
    } catch (error) {
      console.error('Error en login:', error)
      res.status(401).json({
        message: error.message || 'Error al iniciar sesión'
      })
    }
  }

  async logout(req, res) {
    res.clearCookie('token')
    res.json({ message: 'Sesión cerrada correctamente' })
  }

  async me(req, res) {
    try {
      const usuarioRepository = container.getUsuarioRepository()
      const usuario = await usuarioRepository.findById(req.user.id)

      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      res.json({
        user: {
          id: usuario.id,
          email: usuario.email,
          nombre: usuario.nombre,
          telefono: usuario.telefono,
          role: usuario.role
        }
      })
    } catch (error) {
      console.error('Error en me:', error)
      res.status(500).json({ message: 'Error al obtener usuario' })
    }
  }

  setAuthCookie(res, token) {
    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
    res.cookie('token', token, cookieOptions)
  }
}

module.exports = new AuthController()

