/**
 * Interfaz del Servicio de Autenticación
 */
class IAuthService {
  async generateToken(userId) {
    throw new Error('Method generateToken must be implemented')
  }

  async verifyToken(token) {
    throw new Error('Method verifyToken must be implemented')
  }

  async hashPassword(password) {
    throw new Error('Method hashPassword must be implemented')
  }

  async comparePassword(password, hashedPassword) {
    throw new Error('Method comparePassword must be implemented')
  }
}

module.exports = IAuthService

