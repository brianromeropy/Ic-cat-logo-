/**
 * Implementación del Servicio de Autenticación usando JWT
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const IAuthService = require('../../application/interfaces/IAuthService')

class JwtAuthService extends IAuthService {
  async generateToken(userId) {
    if (!process.env.JWT_SECRET) {
      console.error('⚠️  JWT_SECRET no está configurado en .env')
    }
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'secret-temporary',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    )
  }

  async verifyToken(token) {
    try {
      return jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret-temporary'
      )
    } catch (error) {
      throw new Error('Token inválido')
    }
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10)
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }
}

module.exports = JwtAuthService

