/**
 * Caso de Uso: Registrar Usuario
 * Contiene la lógica de negocio para registrar un nuevo usuario
 */
class RegisterUsuarioUseCase {
  constructor(usuarioRepository, authService) {
    this.usuarioRepository = usuarioRepository
    this.authService = authService
  }

  async execute({ email, password, nombre, telefono, role = 'tecnico' }) {
    // Validar que el email no exista
    const usuarioExistente = await this.usuarioRepository.findByEmail(email)
    if (usuarioExistente) {
      throw new Error('El email ya está registrado')
    }

    // Hash de la contraseña
    const hashedPassword = await this.authService.hashPassword(password)

    // Crear entidad de dominio (sin password hasheado en la entidad)
    const Usuario = require('../../entities/Usuario')
    const usuario = new Usuario({
      email,
      password: hashedPassword, // El repositorio manejará el hash
      nombre,
      telefono,
      role
    })

    // Guardar usuario (el repositorio puede hacer hash adicional si es necesario)
    const usuarioGuardado = await this.usuarioRepository.create(usuario)

    // Generar token
    const token = await this.authService.generateToken(usuarioGuardado.id)

    return {
      usuario: {
        id: usuarioGuardado.id,
        email: usuarioGuardado.email,
        nombre: usuarioGuardado.nombre,
        role: usuarioGuardado.role
      },
      token
    }
  }
}

module.exports = RegisterUsuarioUseCase

