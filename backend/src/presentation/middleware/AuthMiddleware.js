/**
 * Middleware de Autenticación
 */
const container = require('../../infrastructure/di/container')

class AuthMiddleware {
  async authenticate(req, res, next) {
    try {
      const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '')

      if (!token) {
        return res.status(401).json({ message: 'No autorizado' })
      }

      const authService = container.getAuthService()
      const decoded = await authService.verifyToken(token)

      const usuarioRepository = container.getUsuarioRepository()
      const usuario = await usuarioRepository.findById(decoded.userId)

      if (!usuario) {
        return res.status(401).json({ message: 'Usuario no encontrado' })
      }

      req.user = {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role
      }

      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' })
    }
  }

  requireAdmin(req, res, next) {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador' })
    }
    next()
  }
}

module.exports = new AuthMiddleware()

