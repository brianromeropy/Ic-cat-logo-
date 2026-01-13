/**
 * Contenedor de Inyección de Dependencias
 * Centraliza la creación de instancias y sus dependencias
 */

// Repositorios
const MongoUsuarioRepository = require('../repositories/MongoUsuarioRepository')
const MongoProductoRepository = require('../repositories/MongoProductoRepository')
const MongoCarritoRepository = require('../repositories/MongoCarritoRepository')
const MongoPedidoRepository = require('../repositories/MongoPedidoRepository')

// Servicios
const JwtAuthService = require('../services/JwtAuthService')

// Use Cases
const RegisterUsuarioUseCase = require('../../domain/use-cases/auth/RegisterUsuarioUseCase')
const LoginUsuarioUseCase = require('../../domain/use-cases/auth/LoginUsuarioUseCase')
const GetProductosUseCase = require('../../domain/use-cases/producto/GetProductosUseCase')
const CreateProductoUseCase = require('../../domain/use-cases/producto/CreateProductoUseCase')
const UpdateProductoUseCase = require('../../domain/use-cases/producto/UpdateProductoUseCase')
const GetCarritoUseCase = require('../../domain/use-cases/carrito/GetCarritoUseCase')
const AddItemToCarritoUseCase = require('../../domain/use-cases/carrito/AddItemToCarritoUseCase')
const CreatePedidoUseCase = require('../../domain/use-cases/pedido/CreatePedidoUseCase')

class Container {
  constructor() {
    // Inicializar repositorios
    this.usuarioRepository = new MongoUsuarioRepository()
    this.productoRepository = new MongoProductoRepository()
    this.carritoRepository = new MongoCarritoRepository()
    this.pedidoRepository = new MongoPedidoRepository()

    // Inicializar servicios
    this.authService = new JwtAuthService()

    // Inicializar use cases
    this.registerUsuarioUseCase = new RegisterUsuarioUseCase(
      this.usuarioRepository,
      this.authService
    )

    this.loginUsuarioUseCase = new LoginUsuarioUseCase(
      this.usuarioRepository,
      this.authService
    )

    this.getProductosUseCase = new GetProductosUseCase(
      this.productoRepository
    )

    this.createProductoUseCase = new CreateProductoUseCase(
      this.productoRepository
    )

    this.updateProductoUseCase = new UpdateProductoUseCase(
      this.productoRepository
    )

    this.getCarritoUseCase = new GetCarritoUseCase(
      this.carritoRepository,
      this.productoRepository
    )

    this.addItemToCarritoUseCase = new AddItemToCarritoUseCase(
      this.carritoRepository,
      this.productoRepository
    )

    this.createPedidoUseCase = new CreatePedidoUseCase(
      this.pedidoRepository,
      this.carritoRepository,
      this.productoRepository,
      this.usuarioRepository
    )
  }

  // Getters para acceso a las instancias
  getUsuarioRepository() {
    return this.usuarioRepository
  }

  getProductoRepository() {
    return this.productoRepository
  }

  getCarritoRepository() {
    return this.carritoRepository
  }

  getPedidoRepository() {
    return this.pedidoRepository
  }

  getAuthService() {
    return this.authService
  }

  getRegisterUsuarioUseCase() {
    return this.registerUsuarioUseCase
  }

  getLoginUsuarioUseCase() {
    return this.loginUsuarioUseCase
  }

  getGetProductosUseCase() {
    return this.getProductosUseCase
  }

  getCreateProductoUseCase() {
    return this.createProductoUseCase
  }

  getUpdateProductoUseCase() {
    return this.updateProductoUseCase
  }

  getGetCarritoUseCase() {
    return this.getCarritoUseCase
  }

  getAddItemToCarritoUseCase() {
    return this.addItemToCarritoUseCase
  }

  getCreatePedidoUseCase() {
    return this.createPedidoUseCase
  }
}

// Singleton instance
const container = new Container()

module.exports = container

