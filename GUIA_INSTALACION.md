# 📋 Guía de Instalación Paso a Paso

## ⚠️ Prerrequisitos

Antes de comenzar, necesitas tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descargar desde: https://nodejs.org/
   - Incluye npm automáticamente
   - Verificar instalación: `node --version` y `npm --version`

2. **MySQL** (versión 8 o superior)
   - Descargar desde: https://dev.mysql.com/downloads/mysql/
   - O usar XAMPP/WAMP que incluye MySQL
   - Verificar instalación: `mysql --version`

---

## 📦 Paso 1: Instalar Dependencias

### Opción A: Usar el script automático (Windows)
```bash
install.bat
```

### Opción B: Instalación manual
```bash
# Instalar dependencias del frontend
cd frontend
npm install

# Instalar dependencias del backend
cd ../backend
npm install
```

---

## 🗄️ Paso 2: Configurar Base de Datos MySQL

### 2.1. Crear la base de datos

Abre MySQL (puede ser desde línea de comandos o desde phpMyAdmin/XAMPP):

```sql
CREATE DATABASE ic_tienda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2.2. Ejecutar script de creación de tablas

**Opción A: Desde línea de comandos MySQL**
```bash
mysql -u root -p ic_tienda < database/scripts/create_tables.sql
```

**Opción B: Desde MySQL Workbench o phpMyAdmin**
1. Abre MySQL Workbench o phpMyAdmin
2. Selecciona la base de datos `ic_tienda`
3. Abre el archivo `database/scripts/create_tables.sql`
4. Ejecuta el script completo

**Opción C: Copiar y pegar en MySQL**
1. Abre el archivo `database/scripts/create_tables.sql`
2. Copia todo el contenido
3. Pégalo en tu cliente MySQL y ejecuta

### 2.3. (Opcional) Cargar datos de ejemplo

```bash
mysql -u root -p ic_tienda < database/scripts/seed_data.sql
```

O desde MySQL Workbench/phpMyAdmin, ejecuta el contenido de `database/scripts/seed_data.sql`

---

## ⚙️ Paso 3: Configurar Variables de Entorno

### 3.1. Editar archivo `.env`

El archivo `backend/.env` ya está creado. **Edítalo** con tus credenciales de MySQL:

```env
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database - ⚠️ CAMBIAR ESTOS VALORES
DB_HOST=localhost
DB_USER=root                    # Tu usuario de MySQL
DB_PASSWORD=tu_password         # Tu contraseña de MySQL (dejar vacío si no tiene)
DB_NAME=ic_tienda
DB_PORT=3306

# JWT - ⚠️ CAMBIAR EN PRODUCCIÓN
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion_123456789
JWT_EXPIRES_IN=7d

# WhatsApp (opcional)
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER=5491112345678
```

**⚠️ IMPORTANTE:**
- Si MySQL no tiene contraseña, deja `DB_PASSWORD=` vacío
- Si usas XAMPP, el usuario suele ser `root` y la contraseña está vacía por defecto
- Cambia `JWT_SECRET` por un valor aleatorio seguro en producción

---

## 🚀 Paso 4: Ejecutar el Proyecto

Necesitas **DOS terminales** abiertas simultáneamente:

### Terminal 1 - Backend (Puerto 5000)
```bash
cd backend
npm run dev
```

Deberías ver:
```
Servidor corriendo en puerto 5000
```

### Terminal 2 - Frontend (Puerto 3000)
```bash
cd frontend
npm run dev
```

Deberías ver:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

## ✅ Verificar que Todo Funciona

1. **Backend**: Abre http://localhost:5000/api/health
   - Deberías ver: `{"status":"ok","message":"API funcionando correctamente"}`

2. **Frontend**: Abre http://localhost:3000
   - Deberías ver la página de inicio

3. **Login Admin**:
   - Ve a http://localhost:3000/login
   - Email: `admin@ictienda.com`
   - Password: `admin123`
   - ⚠️ **Cambiar esta contraseña después del primer login**

---

## 🐛 Solución de Problemas Comunes

### Error: "npm no se reconoce"
- **Solución**: Instala Node.js desde https://nodejs.org/
- Reinicia la terminal después de instalar

### Error: "mysql no se reconoce"
- **Solución**: Agrega MySQL al PATH del sistema
- O usa XAMPP/WAMP que incluye MySQL

### Error: "Cannot connect to MySQL"
- Verifica que MySQL esté corriendo
- Revisa las credenciales en `backend/.env`
- Verifica que la base de datos `ic_tienda` exista

### Error: "Port 5000 already in use"
- Cambia el puerto en `backend/.env`: `PORT=5001`
- O cierra la aplicación que usa el puerto 5000

### Error: "Port 3000 already in use"
- Vite automáticamente usará el puerto 3001
- O cambia en `frontend/vite.config.js`

### Error: "JWT_SECRET is required"
- Verifica que el archivo `backend/.env` exista
- Verifica que `JWT_SECRET` tenga un valor

---

## 📝 Notas Importantes

- El usuario admin por defecto es: `admin@ictienda.com` / `admin123`
- Cambia la contraseña del admin después del primer login
- En desarrollo, las cookies funcionan en `localhost`
- Para producción, configura `FRONTEND_URL` con tu dominio real

---

## 🎉 ¡Listo!

Una vez que ambos servidores estén corriendo, puedes:
- Navegar por el catálogo
- Registrarte como técnico
- Agregar productos (como admin)
- Hacer pedidos por WhatsApp

¡Feliz desarrollo! 🚀

