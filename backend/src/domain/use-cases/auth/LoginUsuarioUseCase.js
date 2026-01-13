/**
 * Caso de Uso: Login de Usuario
 */
class LoginUsuarioUseCase {
  constructor(usuarioRepository, authService) {
    this.usuarioRepository = usuarioRepository
    this.authService = authService
  }

  async execute({ email, password }) {
    // Buscar usuario
    const usuario = await this.usuarioRepository.findByEmail(email)
    if (!usuario) {
      throw new Error('Credenciales inválidas')
    }

    // Verificar contraseña
    const isValidPassword = await this.authService.comparePassword(
      password,
      usuario.password
    )

    if (!isValidPassword) {
      throw new Error('Credenciales inválidas')
    }

    // Generar token
    const token = await this.authService.generateToken(usuario.id)

    return {
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        role: usuario.role
      },
      token
    }
  }
}

module.exports = LoginUsuarioUseCase

