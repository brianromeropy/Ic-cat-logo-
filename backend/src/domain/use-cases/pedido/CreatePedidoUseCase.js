/**
 * Caso de Uso: Crear Pedido desde Carrito
 */
class CreatePedidoUseCase {
  constructor(
    pedidoRepository,
    carritoRepository,
    productoRepository,
    usuarioRepository
  ) {
    this.pedidoRepository = pedidoRepository
    this.carritoRepository = carritoRepository
    this.productoRepository = productoRepository
    this.usuarioRepository = usuarioRepository
  }

  async execute(usuarioId) {
    // Obtener carrito
    const carrito = await this.carritoRepository.findByUsuarioId(usuarioId)
    if (!carrito || carrito.estaVacio()) {
      throw new Error('El carrito está vacío')
    }

    // Obtener productos
    const productos = await Promise.all(
      carrito.items.map(item =>
        this.productoRepository.findById(item.productoId)
      )
    )

    // Calcular total
    const total = carrito.calcularTotal(productos)

    // Crear items del pedido
    const itemsPedido = carrito.items.map(item => ({
      productoId: item.productoId,
      cantidad: item.cantidad,
      precio: productos.find(p => p.id === item.productoId).precio
    }))

    // Crear pedido
    const Pedido = require('../../entities/Pedido')
    const pedido = new Pedido({
      usuarioId,
      items: itemsPedido,
      total,
      estado: 'pendiente'
    })

    const pedidoGuardado = await this.pedidoRepository.create(pedido)

    // Limpiar carrito
    await this.carritoRepository.clearItems(usuarioId)

    // Obtener usuario para el mensaje
    const usuario = await this.usuarioRepository.findById(usuarioId)

    // Generar mensaje de WhatsApp
    const mensaje = this.generarMensajeWhatsApp(pedidoGuardado, usuario, productos)

    return {
      pedido: pedidoGuardado,
      mensaje,
      whatsappUrl: this.generarWhatsAppUrl(mensaje)
    }
  }

  generarMensajeWhatsApp(pedido, usuario, productos) {
    let mensaje = `*Nuevo Pedido #${pedido.id}*\n\n`
    mensaje += `Cliente: ${usuario.nombre}\n`
    mensaje += `Email: ${usuario.email}\n`
    if (usuario.telefono) {
      mensaje += `Teléfono: ${usuario.telefono}\n`
    }
    mensaje += `\n*Productos:*\n`

    pedido.items.forEach(item => {
      const producto = productos.find(p => p.id === item.productoId)
      mensaje += `- ${producto.nombre}\n`
      if (producto.codigo) {
        mensaje += `  Código: ${producto.codigo}\n`
      }
      mensaje += `  Cantidad: ${item.cantidad} x GS ${item.precio.toLocaleString('es-PY')}\n`
    })

    mensaje += `\n*Total: GS ${pedido.total.toLocaleString('es-PY')}*\n`
    mensaje += `Estado: ${pedido.estado}`

    return mensaje
  }

  generarWhatsAppUrl(mensaje) {
    const whatsappNumber = process.env.WHATSAPP_PHONE_NUMBER || '5491112345678'
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`
  }
}

module.exports = CreatePedidoUseCase

