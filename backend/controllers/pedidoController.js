const Pedido = require('../models/Pedido')
const Carrito = require('../models/Carrito')
const Usuario = require('../models/Usuario')

exports.sendWhatsApp = async (req, res) => {
  try {
    // Obtener carrito del usuario
    const carrito = await Carrito.findOne({ usuario: req.user.id })
      .populate('items.producto', 'nombre codigo categoria fabricante precio')

    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' })
    }

    // Calcular total
    let total = 0
    const itemsPedido = carrito.items.map(item => {
      const subtotal = item.producto.precio * item.cantidad
      total += subtotal
      return {
        producto: item.producto._id,
        cantidad: item.cantidad,
        precio: item.producto.precio
      }
    })

    // Crear pedido
    const pedido = await Pedido.create({
      usuario: req.user.id,
      items: itemsPedido,
      total,
      estado: 'pendiente'
    })

    // Obtener información del usuario
    const usuario = await Usuario.findById(req.user.id)

    // Obtener pedido con populate
    const pedidoCompleto = await Pedido.findById(pedido._id)
      .populate('items.producto', 'nombre codigo categoria')

    // Generar mensaje de WhatsApp
    let mensaje = `*Nuevo Pedido #${pedido._id}*\n\n`
    mensaje += `Cliente: ${usuario.nombre}\n`
    mensaje += `Email: ${usuario.email}\n`
    if (usuario.telefono) {
      mensaje += `Teléfono: ${usuario.telefono}\n`
    }
    mensaje += `\n*Productos:*\n`

    pedidoCompleto.items.forEach(item => {
      mensaje += `- ${item.producto.nombre}\n`
      if (item.producto.codigo) {
        mensaje += `  Código: ${item.producto.codigo}\n`
      }
      mensaje += `  Cantidad: ${item.cantidad} x $${item.precio.toLocaleString('es-AR')}\n`
    })

    mensaje += `\n*Total: $${total.toLocaleString('es-AR')}*\n`
    mensaje += `Estado: ${pedido.estado}`

    // Limpiar carrito
    carrito.items = []
    await carrito.save()

    // En producción, aquí integrarías con la API de WhatsApp
    const whatsappNumber = process.env.WHATSAPP_PHONE_NUMBER || '5491112345678'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`

    res.json({
      message: 'Pedido creado correctamente',
      pedidoId: pedido._id,
      whatsappUrl,
      mensaje
    })
  } catch (error) {
    console.error('Error al crear pedido:', error)
    res.status(500).json({ message: 'Error al crear pedido' })
  }
}
