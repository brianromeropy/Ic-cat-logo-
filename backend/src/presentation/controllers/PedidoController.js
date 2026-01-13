/**
 * Controller de Pedidos
 */
const container = require('../../infrastructure/di/container')

class PedidoController {
  async sendWhatsApp(req, res) {
    try {
      const useCase = container.getCreatePedidoUseCase()
      const result = await useCase.execute(req.user.id)

      res.json({
        message: 'Pedido creado correctamente',
        pedidoId: result.pedido.id,
        whatsappUrl: result.whatsappUrl,
        mensaje: result.mensaje
      })
    } catch (error) {
      console.error('Error al crear pedido:', error)
      res.status(400).json({
        message: error.message || 'Error al crear pedido'
      })
    }
  }
}

module.exports = new PedidoController()

