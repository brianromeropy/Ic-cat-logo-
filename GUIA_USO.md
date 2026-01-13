# 📖 Guía de Uso - IC Catálogo

## 🛒 Cómo Usar el Carrito y Pedidos por WhatsApp

### 1. Agregar Productos al Carrito

1. Navega al **Catálogo** (`/catalogo`)
2. Busca el circuito integrado que necesitas
3. Haz clic en **"Agregar"** en la tarjeta del producto
4. El producto se agregará a tu carrito

**Nota:** Debes estar logueado para agregar productos al carrito.

### 2. Ver y Gestionar el Carrito

1. Haz clic en **"Carrito"** en el menú de navegación
2. Verás todos los productos agregados
3. Puedes:
   - **Aumentar cantidad:** Clic en el botón `+`
   - **Disminuir cantidad:** Clic en el botón `-`
   - **Eliminar producto:** Clic en "Eliminar"
   - Ver el **total** del pedido

### 3. Enviar Pedido por WhatsApp

1. Revisa tu carrito y asegúrate de que todo esté correcto
2. Haz clic en **"📱 Enviar Pedido por WhatsApp"**
3. Se abrirá WhatsApp (web o app) con el mensaje formateado
4. El mensaje incluye:
   - Número de pedido
   - Tu información (nombre, email, teléfono)
   - Lista de productos con códigos y cantidades
   - Total del pedido
5. Envía el mensaje al vendedor
6. El carrito se limpiará automáticamente

**Formato del mensaje:**
```
*Nuevo Pedido #1234567890*

Cliente: Tu Nombre
Email: tu@email.com
Teléfono: +54 11 1234-5678

*Productos:*
- Amplificador Operacional LM358
  Código: LM358
  Cantidad: 2 x $25.50
- Timer NE555
  Código: NE555
  Cantidad: 1 x $15.00

*Total: $66.00*
Estado: pendiente
```

---

## 👨‍💼 Panel de Administración

### Acceso al Panel Admin

1. Inicia sesión con una cuenta de administrador:
   - Email: `admin@ictienda.com`
   - Password: `admin123`

2. Haz clic en **"Admin"** en el menú de navegación

### Agregar un Nuevo Producto

1. En el panel admin, haz clic en **"+ Agregar Producto"**
2. Completa el formulario:
   - **Nombre:** Nombre completo del IC (ej: "Amplificador Operacional LM358")
   - **Código:** Código del IC (ej: "LM358")
   - **Categoría:** Tipo de IC (ej: "Amplificador", "Timer", "Regulador")
   - **Fabricante:** Marca (ej: "Texas Instruments", "STMicroelectronics")
   - **Precio:** Precio unitario
   - **Stock:** Cantidad disponible
   - **Descripción:** Descripción breve
   - **Especificaciones:** Especificaciones técnicas
   - **URL de Imagen:** (Opcional) URL de imagen del producto
3. Haz clic en **"Crear"**
4. El producto aparecerá en el catálogo

### Editar un Producto Existente

1. En la tabla de productos, haz clic en **"Editar"** en la fila del producto
2. El formulario se abrirá con los datos actuales
3. Modifica los campos que necesites
4. Haz clic en **"Actualizar"**
5. Los cambios se reflejarán inmediatamente

### Eliminar un Producto

1. En la tabla de productos, haz clic en **"Eliminar"** en la fila del producto
2. Confirma la eliminación
3. El producto se marcará como inactivo (no se elimina físicamente)
4. Ya no aparecerá en el catálogo público

**Nota:** Los productos eliminados se marcan como `activo: false`, por lo que pueden restaurarse editándolos.

---

## 🔐 Autenticación

### Registrarse como Técnico

1. Ve a **"Iniciar Sesión"** (`/login`)
2. Haz clic en **"¿No tienes cuenta? Regístrate"**
3. Completa el formulario:
   - Nombre completo
   - Teléfono
   - Email
   - Contraseña (mínimo 6 caracteres)
4. Haz clic en **"Registrarse"**
5. Serás redirigido al catálogo

### Iniciar Sesión

1. Ve a **"Iniciar Sesión"** (`/login`)
2. Ingresa tu email y contraseña
3. Haz clic en **"Iniciar Sesión"**
4. Serás redirigido al catálogo

### Cerrar Sesión

1. Haz clic en **"Cerrar Sesión"** en el menú
2. Tu sesión se cerrará y serás redirigido a la página principal

---

## 🔍 Búsqueda y Filtros

### Buscar Productos

1. En el catálogo, usa el campo **"Buscar producto"**
2. Puedes buscar por:
   - Nombre del producto
   - Código del IC (ej: "LM358")

### Filtrar por Categoría

1. En el catálogo, selecciona una **Categoría** del menú desplegable
2. Solo se mostrarán productos de esa categoría

### Filtrar por Fabricante

1. En el catálogo, selecciona un **Fabricante** del menú desplegable
2. Solo se mostrarán productos de ese fabricante

### Combinar Filtros

Puedes combinar búsqueda y filtros:
- Buscar "LM" + Categoría "Amplificador" = Solo amplificadores que contengan "LM"

---

## 📱 Estructura del Mensaje de WhatsApp

El mensaje generado incluye:

```
*Nuevo Pedido #[ID_PEDIDO]*

Cliente: [Nombre del cliente]
Email: [Email del cliente]
Teléfono: [Teléfono del cliente]

*Productos:*
- [Nombre del producto]
  Código: [Código del IC]
  Cantidad: [Cantidad] x $[Precio]

*Total: $[Total]*
Estado: pendiente
```

---

## ⚠️ Notas Importantes

1. **Carrito:** El carrito se guarda en la base de datos, por lo que persiste entre sesiones
2. **Pedidos:** Cada pedido genera un ID único que puedes usar para seguimiento
3. **Stock:** El stock se muestra pero no se valida automáticamente al agregar al carrito
4. **WhatsApp:** El sistema genera el mensaje y abre WhatsApp, pero debes enviarlo manualmente
5. **Admin:** Solo usuarios con rol "admin" pueden acceder al panel de administración

---

## 🐛 Solución de Problemas

### No puedo agregar productos al carrito
- Verifica que estés logueado
- Recarga la página
- Revisa la consola del navegador (F12) por errores

### No se abre WhatsApp
- Verifica que tengas WhatsApp instalado o WhatsApp Web abierto
- El sistema genera un enlace que debería abrirse automáticamente
- Si no funciona, copia el mensaje manualmente

### No veo el panel Admin
- Verifica que estés logueado con una cuenta de administrador
- El enlace "Admin" solo aparece para usuarios admin
- Verifica tu rol en la base de datos

### Los productos no se guardan
- Verifica que todos los campos requeridos estén completos
- Revisa la consola del navegador por errores
- Verifica que el backend esté corriendo

---

¿Necesitas ayuda? ¡Revisa la documentación o contacta al administrador!

