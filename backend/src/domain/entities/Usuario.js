/**
 * Entidad de Dominio: Usuario
 * Representa un usuario en el dominio de la aplicación
 * No tiene dependencias de frameworks o infraestructura
 */
class Usuario {
  constructor({ id, email, password, nombre, telefono, role = 'tecnico' }) {
    this.id = id
    this.email = email
    this.password = password
    this.nombre = nombre
    this.telefono = telefono
    this.role = role
  }

  isAdmin() {
    return this.role === 'admin'
  }

  isTecnico() {
    return this.role === 'tecnico'
  }
}

module.exports = Usuario

