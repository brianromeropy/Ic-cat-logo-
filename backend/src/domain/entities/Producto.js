/**
 * Entidad de Dominio: Producto
 * Representa un producto en el dominio de la aplicación
 */
class Producto {
  constructor({
    id,
    nombre,
    codigo,
    categoria,
    modelo_iphone = [],
    fabricante,
    costo,
    precio,
    stock = 0,
    descripcion,
    especificaciones,
    imagen,
    activo = true
  }) {
    this.id = id
    this.nombre = nombre
    this.codigo = codigo
    this.categoria = categoria
    this.modelo_iphone = Array.isArray(modelo_iphone) ? modelo_iphone : []
    this.fabricante = fabricante
    this.costo = costo
    this.precio = precio
    this.stock = stock
    this.descripcion = descripcion
    this.especificaciones = especificaciones
    this.imagen = imagen
    this.activo = activo
  }

  tieneStock(cantidad = 1) {
    return this.stock >= cantidad && this.activo
  }

  reducirStock(cantidad) {
    if (!this.tieneStock(cantidad)) {
      throw new Error('Stock insuficiente')
    }
    this.stock -= cantidad
  }

  aumentarStock(cantidad) {
    this.stock += cantidad
  }
}

module.exports = Producto

