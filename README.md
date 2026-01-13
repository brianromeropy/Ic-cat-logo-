# IC Catálogo - Sistema de Catálogo de Circuitos Integrados

Sistema web para catálogo de circuitos integrados (ICs) dirigido a técnicos y profesionales.

## 🎯 Características

- **Catálogo de productos** con búsqueda y filtros (categoría, fabricante)
- **Carrito de compras** con gestión de items
- **Sistema de autenticación** (JWT con cookies httpOnly)
- **Panel de administración** para gestión de productos
- **Integración con WhatsApp** para pedidos
- **Diseño responsive** mobile-friendly

## 🛠️ Tecnologías

### Frontend
- React 18
- React Router DOM
- TailwindCSS
- Vite
- Axios

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcryptjs
- Express Validator

## 📁 Estructura del Proyecto

```
IC/
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   └── utils/         # Utilidades (API, auth, cart)
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/       # Lógica de negocio
│   ├── models/           # Modelos Mongoose
│   ├── routes/           # Rutas API
│   ├── middleware/       # Middleware (auth, validaciones)
│   ├── config/           # Configuración (DB)
│   ├── server.js
│   └── package.json
└── database/
    └── scripts/          # Scripts de inicialización
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- MongoDB (local o Atlas)
- npm o yarn

### 1. Instalar Dependencias

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Configurar MongoDB

**Opción A: MongoDB Local**
1. Instala MongoDB: https://www.mongodb.com/try/download/community
2. Verifica que esté corriendo
3. Edita `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/ic_catalogo
```

**Opción B: MongoDB Atlas (Nube)**
1. Crea cuenta en: https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito
3. Obtén el connection string
4. Edita `backend/.env`:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/ic_catalogo
```

Ver guía completa: `CONFIGURAR_MONGODB.md`

### 3. Configurar Variables de Entorno

Crear archivo `backend/.env`:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ic_catalogo

# JWT
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# WhatsApp (opcional)
WHATSAPP_PHONE_NUMBER=5491112345678
```

### 4. Inicializar Base de Datos

```bash
cd backend
node ../database/scripts/init_mongodb.js
```

Esto creará:
- Usuario admin (email: `admin@ictienda.com`, password: `admin123`)
- 10 productos de ejemplo (circuitos integrados)

### 5. Ejecutar el Proyecto

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:3000`
El backend estará disponible en `http://localhost:5000`

## 👤 Usuarios por Defecto

### Administrador
- Email: `admin@ictienda.com`
- Password: `admin123`
- **IMPORTANTE:** Cambiar la contraseña después del primer login

### Crear Usuario Técnico
Registrarse desde la página de Login (`/login`)

## 📋 Funcionalidades Implementadas

### ✅ Autenticación
- Sistema de registro y login
- JWT con cookies httpOnly
- Roles (admin/tecnico)

### ✅ Catálogo de Productos
- Listado de productos
- Búsqueda por nombre o código
- Filtros por categoría y fabricante
- Cards de productos responsive

### ✅ Carrito y Pedidos
- Agregar productos al carrito
- Actualizar cantidades
- Eliminar items
- Generar pedido y mensaje WhatsApp

### ✅ Panel de Administración
- CRUD completo de productos
- Protección de rutas admin
- Validaciones frontend y backend

## 🔒 Seguridad

- JWT con expiración configurable
- Cookies httpOnly para tokens
- Validación de inputs (express-validator)
- Hash de contraseñas con bcrypt
- Protección de rutas por roles

## 📱 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear producto (admin)
- `PUT /api/productos/:id` - Actualizar producto (admin)
- `DELETE /api/productos/:id` - Eliminar producto (admin)

**Query params para productos:**
- `?search=termino` - Búsqueda por nombre/código
- `?categoria=nombre` - Filtrar por categoría
- `?fabricante=nombre` - Filtrar por fabricante

### Carrito
- `GET /api/carrito` - Obtener carrito del usuario
- `POST /api/carrito` - Agregar producto al carrito
- `PUT /api/carrito/:productoId` - Actualizar cantidad
- `DELETE /api/carrito/:productoId` - Eliminar del carrito

### Pedidos
- `POST /api/pedidos/whatsapp` - Crear pedido y generar mensaje WhatsApp

## 🚢 Despliegue

### Frontend (Vercel)
1. Conectar repositorio a Vercel
2. Configurar build command: `cd frontend && npm run build`
3. Configurar output directory: `frontend/dist`
4. Agregar variable: `VITE_API_URL=https://tu-backend.com/api`

### Backend (Railway/Render)
1. Conectar repositorio
2. Configurar variables de entorno
3. Usar MongoDB Atlas para la base de datos
4. Deploy automático

## 📝 Próximas Mejoras

- [ ] Integración real con WhatsApp Business API
- [ ] Sistema de notificaciones por email
- [ ] Historial de pedidos
- [ ] Dashboard con estadísticas
- [ ] Upload de imágenes de productos
- [ ] Sistema de reviews/calificaciones
- [ ] Filtros avanzados de búsqueda
- [ ] Paginación en catálogo
- [ ] Exportar catálogo a PDF/Excel

## 📄 Licencia

Este proyecto es privado y de uso interno.

---

**Desarrollado para técnicos y profesionales de circuitos integrados** 🔌
