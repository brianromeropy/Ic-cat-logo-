/**
 * Implementación MongoDB del Repositorio de Usuario
 */
const UsuarioModel = require('../../../models/Usuario')
const Usuario = require('../../domain/entities/Usuario')
const IUsuarioRepository = require('../../application/interfaces/IUsuarioRepository')

class MongoUsuarioRepository extends IUsuarioRepository {
  async create(usuario) {
    const usuarioDoc = await UsuarioModel.create({
      email: usuario.email,
      password: usuario.password,
      nombre: usuario.nombre,
      telefono: usuario.telefono,
      role: usuario.role
    })

    return this.toEntity(usuarioDoc)
  }

  async findById(id) {
    const usuarioDoc = await UsuarioModel.findById(id)
    return usuarioDoc ? this.toEntity(usuarioDoc) : null
  }

  async findByEmail(email) {
    const usuarioDoc = await UsuarioModel.findOne({ email: email.toLowerCase() })
    return usuarioDoc ? this.toEntity(usuarioDoc) : null
  }

  async update(id, usuario) {
    const usuarioDoc = await UsuarioModel.findByIdAndUpdate(
      id,
      {
        email: usuario.email,
        nombre: usuario.nombre,
        telefono: usuario.telefono,
        role: usuario.role
      },
      { new: true }
    )
    return usuarioDoc ? this.toEntity(usuarioDoc) : null
  }

  async delete(id) {
    await UsuarioModel.findByIdAndDelete(id)
  }

  toEntity(usuarioDoc) {
    return new Usuario({
      id: usuarioDoc._id.toString(),
      email: usuarioDoc.email,
      password: usuarioDoc.password,
      nombre: usuarioDoc.nombre,
      telefono: usuarioDoc.telefono,
      role: usuarioDoc.role
    })
  }
}

module.exports = MongoUsuarioRepository

