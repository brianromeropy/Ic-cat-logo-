# Clean Architecture - Backend

Este proyecto implementa **Clean Architecture** en Node.js, separando el código en capas bien definidas.

## Estructura de Capas

```
backend/
├── src/
│   ├── domain/                    # Capa de Dominio (Núcleo)
│   │   ├── entities/              # Entidades de dominio puras
│   │   │   ├── Usuario.js
│   │   │   ├── Producto.js
│   │   │   ├── Carrito.js
│   │   │   └── Pedido.js
│   │   └── use-cases/             # Casos de uso (lógica de negocio)
│   │       ├── auth/
│   │       ├── producto/
│   │       ├── carrito/
│   │       └── pedido/
│   │
│   ├── application/               # Capa de Aplicación
│   │   └── interfaces/            # Contratos (interfaces)
│   │       ├── IUsuarioRepository.js
│   │       ├── IProductoRepository.js
│   │       ├── ICarritoRepository.js
│   │       ├── IPedidoRepository.js
│   │       └── IAuthService.js
│   │
│   ├── infrastructure/            # Capa de Infraestructura
│   │   ├── repositories/          # Implementaciones concretas
│   │   │   ├── MongoUsuarioRepository.js
│   │   │   ├── MongoProductoRepository.js
│   │   │   ├── MongoCarritoRepository.js
│   │   │   └── MongoPedidoRepository.js
│   │   ├── services/              # Servicios externos
│   │   │   └── JwtAuthService.js
│   │   └── di/                    # Inyección de dependencias
│   │       └── container.js
│   │
│   └── presentation/              # Capa de Presentación
│       ├── controllers/            # Controladores HTTP
│       │   ├── AuthController.js
│       │   ├── ProductoController.js
│       │   ├── CarritoController.js
│       │   └── PedidoController.js
│       └── middleware/             # Middleware HTTP
│           └── AuthMiddleware.js
│
├── models/                        # Modelos Mongoose (legacy, se mantienen para compatibilidad)
├── routes/                        # Rutas Express
└── config/                        # Configuración
```

## Principios de Clean Architecture

### 1. **Separación de Responsabilidades**
- **Domain**: Entidades y lógica de negocio pura (sin dependencias externas)
- **Application**: Casos de uso e interfaces (contratos)
- **Infrastructure**: Implementaciones concretas (MongoDB, JWT, etc.)
- **Presentation**: Controladores y middleware HTTP

### 2. **Dependencias hacia Adentro**
```
Presentation → Application → Domain
Infrastructure → Application → Domain
```

Las capas externas dependen de las internas, nunca al revés.

### 3. **Inversión de Dependencias**
- Los casos de uso dependen de **interfaces** (IUsuarioRepository)
- Las implementaciones concretas (MongoUsuarioRepository) implementan esas interfaces
- El contenedor de DI conecta todo

## Flujo de una Petición

1. **Request HTTP** → `routes/auth.js`
2. **Middleware** → `AuthMiddleware.authenticate()`
3. **Controller** → `AuthController.login()`
4. **Use Case** → `LoginUsuarioUseCase.execute()`
5. **Repository** → `MongoUsuarioRepository.findByEmail()`
6. **Entity** → `Usuario` (entidad de dominio)
7. **Response** → Controller formatea y retorna

## Ventajas

✅ **Testabilidad**: Fácil mockear repositorios e interfaces  
✅ **Mantenibilidad**: Código organizado y fácil de entender  
✅ **Escalabilidad**: Fácil cambiar MongoDB por otra BD  
✅ **Independencia**: El dominio no depende de frameworks  
✅ **Reutilización**: Casos de uso pueden usarse desde CLI, API, etc.

## Ejemplo de Uso

```javascript
// Controller usa el caso de uso
const useCase = container.getLoginUsuarioUseCase()
const result = await useCase.execute({ email, password })

// El caso de uso usa el repositorio (interfaz)
const usuario = await this.usuarioRepository.findByEmail(email)

// El repositorio implementa la interfaz con MongoDB
class MongoUsuarioRepository extends IUsuarioRepository {
  async findByEmail(email) {
    // Implementación con Mongoose
  }
}
```

## Migración

Los archivos antiguos en `controllers/`, `middleware/` y `models/` se mantienen temporalmente para compatibilidad, pero el código nuevo usa la nueva arquitectura en `src/`.

