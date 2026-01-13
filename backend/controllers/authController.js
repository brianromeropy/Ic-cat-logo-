const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
const { validationResult } = require('express-validator')

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, nombre, telefono } = req.body

    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }

    // Crear usuario (el hash se hace automáticamente en el pre-save hook)
    const user = await Usuario.create({
      email,
      password,
      nombre,
      telefono,
      role: 'tecnico'
    })

    // Generar token
    const token = generateToken(user._id.toString())

    // Enviar cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    })

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
}

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Buscar usuario
    const user = await Usuario.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Verificar contraseña
    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' })
    }

    // Generar token
    const token = generateToken(user._id.toString())

    // Enviar cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    })

    res.json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Sesión cerrada correctamente' })
}

exports.me = async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        telefono: user.telefono,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Error en me:', error)
    res.status(500).json({ message: 'Error al obtener usuario' })
  }
}
