const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'No autorizado' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Usuario.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' })
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      nombre: user.nombre,
      role: user.role
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador' })
  }
}

module.exports = { authMiddleware, adminMiddleware }

