const Carrito = require('../models/Carrito')
const Producto = require('../models/Producto')

exports.getCarrito = async (req, res) => {
  try {
    let carrito = await Carrito.findOne({ usuario: req.user.id })
      .populate('items.producto', 'nombre codigo categoria fabricante precio imagen stock')

    if (!carrito) {
      carrito = await Carrito.create({ usuario: req.user.id, items: [] })
    }

    // Formatear items para el frontend
    const items = carrito.items.map(item => ({
      producto_id: item.producto._id,
      nombre: item.producto.nombre,
      codigo: item.producto.codigo,
      categoria: item.producto.categoria,
      fabricante: item.producto.fabricante,
      precio: item.producto.precio,
      imagen: item.producto.imagen,
      cantidad: item.cantidad
    }))

    res.json({ items })
  } catch (error) {
    console.error('Error al obtener carrito:', error)
    res.status(500).json({ message: 'Error al obtener carrito' })
  }
}

exports.addItem = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body

    // Verificar que el producto existe
    const producto = await Producto.findById(productoId)
    if (!producto || !producto.activo) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    let carrito = await Carrito.findOne({ usuario: req.user.id })

    if (!carrito) {
      carrito = await Carrito.create({ usuario: req.user.id, items: [] })
    }

    // Buscar si el producto ya está en el carrito
    const itemIndex = carrito.items.findIndex(
      item => item.producto.toString() === productoId
    )

    if (itemIndex > -1) {
      // Actualizar cantidad
      carrito.items[itemIndex].cantidad += cantidad
    } else {
      // Agregar nuevo item
      carrito.items.push({ producto: productoId, cantidad })
    }

    await carrito.save()

    // Obtener carrito actualizado con populate
    const carritoActualizado = await Carrito.findById(carrito._id)
      .populate('items.producto', 'nombre codigo categoria fabricante precio imagen stock')

    const items = carritoActualizado.items.map(item => ({
      producto_id: item.producto._id,
      nombre: item.producto.nombre,
      codigo: item.producto.codigo,
      categoria: item.producto.categoria,
      fabricante: item.producto.fabricante,
      precio: item.producto.precio,
      imagen: item.producto.imagen,
      cantidad: item.cantidad
    }))

    res.json({ items })
  } catch (error) {
    console.error('Error al agregar al carrito:', error)
    res.status(500).json({ message: 'Error al agregar al carrito' })
  }
}

exports.updateItem = async (req, res) => {
  try {
    const { cantidad } = req.body
    const productoId = req.params.productoId

    const carrito = await Carrito.findOne({ usuario: req.user.id })
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' })
    }

    const itemIndex = carrito.items.findIndex(
      item => item.producto.toString() === productoId
    )

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item no encontrado en el carrito' })
    }

    carrito.items[itemIndex].cantidad = cantidad
    await carrito.save()

    const carritoActualizado = await Carrito.findById(carrito._id)
      .populate('items.producto', 'nombre codigo categoria fabricante precio imagen stock')

    const items = carritoActualizado.items.map(item => ({
      producto_id: item.producto._id,
      nombre: item.producto.nombre,
      codigo: item.producto.codigo,
      categoria: item.producto.categoria,
      fabricante: item.producto.fabricante,
      precio: item.producto.precio,
      imagen: item.producto.imagen,
      cantidad: item.cantidad
    }))

    res.json({ items })
  } catch (error) {
    console.error('Error al actualizar carrito:', error)
    res.status(500).json({ message: 'Error al actualizar carrito' })
  }
}

exports.removeItem = async (req, res) => {
  try {
    const productoId = req.params.productoId

    const carrito = await Carrito.findOne({ usuario: req.user.id })
    if (!carrito) {
      return res.status(404).json({ message: 'Carrito no encontrado' })
    }

    carrito.items = carrito.items.filter(
      item => item.producto.toString() !== productoId
    )

    await carrito.save()
    res.json({ message: 'Item eliminado del carrito' })
  } catch (error) {
    console.error('Error al eliminar del carrito:', error)
    res.status(500).json({ message: 'Error al eliminar del carrito' })
  }
}
