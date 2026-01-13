# 📋 Lo que Necesitas para Subir a GitHub

## ✅ Checklist de Requisitos

### 1. Git Instalado
- **Estado actual:** ❌ No instalado
- **Acción:** Descargar e instalar desde https://git-scm.com/download/win
- **Verificación:** Después de instalar, ejecuta `git --version` en la terminal

### 2. Cuenta de GitHub
- **Estado:** Necesitas crearla si no tienes
- **Acción:** Ve a https://github.com y crea una cuenta (gratis)

### 3. Repositorio en GitHub
- **Estado:** Lo crearás después de instalar Git
- **Acción:** Crear nuevo repositorio en GitHub (ver pasos abajo)

---

## 🚀 Pasos Rápidos (Una vez tengas Git)

### Paso 1: Instalar Git
1. Descarga: https://git-scm.com/download/win
2. Instala (usa opciones por defecto)
3. Reinicia la terminal
4. Verifica: `git --version`

### Paso 2: Configurar Git (Solo primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### Paso 3: Inicializar Repositorio
```bash
# Desde D:\PROG_CURSOR\IC
git init
git add .
git commit -m "Initial commit: IC Catálogo - Sistema completo"
```

### Paso 4: Crear Repositorio en GitHub
1. Ve a https://github.com
2. Clic en "+" → "New repository"
3. Nombre: `ic-catalogo`
4. Descripción: "Sistema de catálogo de circuitos integrados"
5. Elige **Private** (recomendado) o **Public**
6. **NO marques** "Initialize with README"
7. Clic en "Create repository"

### Paso 5: Conectar y Subir
```bash
# Reemplaza TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/ic-catalogo.git
git branch -M main
git push -u origin main
```

**Nota:** Te pedirá usuario y contraseña. Para la contraseña, usa un **Personal Access Token** (no tu contraseña normal).

---

## 🔐 Crear Personal Access Token

Si GitHub te pide token:

1. Ve a: https://github.com/settings/tokens
2. "Generate new token" → "Generate new token (classic)"
3. Nombre: "IC Catálogo"
4. Marca: `repo` (todos los permisos)
5. "Generate token"
6. **Copia el token** (solo se muestra una vez)
7. Úsalo como contraseña cuando Git lo pida

---

## 📝 Archivos que YA están Listos

✅ `.gitignore` - Configurado para NO subir archivos sensibles
✅ `README.md` - Documentación completa del proyecto
✅ `backend/.env.example` - Ejemplo de configuración (sin secretos)

---

## ⚠️ Lo que NO se Subirá (Gracias a .gitignore)

- ❌ `node_modules/` (dependencias - se instalan con npm)
- ❌ `.env` (variables de entorno con contraseñas)
- ❌ `dist/` y `build/` (archivos compilados)
- ❌ Archivos del IDE

---

## 🎯 Resumen Ultra Rápido

1. **Instalar Git** → https://git-scm.com/download/win
2. **Configurar Git** → `git config --global user.name "..."` y `user.email "..."`
3. **Inicializar** → `git init`, `git add .`, `git commit -m "Initial commit"`
4. **Crear repo en GitHub** → https://github.com/new
5. **Conectar** → `git remote add origin https://github.com/USUARIO/ic-catalogo.git`
6. **Subir** → `git push -u origin main`

---

## 📚 Guías Detalladas

- **`GUIA_GITHUB.md`** - Guía completa paso a paso
- **`COMANDOS_GIT.md`** - Referencia rápida de comandos

---

## ✅ Después de Subir

Tu proyecto estará en: `https://github.com/TU_USUARIO/ic-catalogo`

Podrás:
- Ver el código desde cualquier lugar
- Compartir el proyecto
- Hacer clonaciones en otras computadoras
- Colaborar con otros desarrolladores

---

¿Necesitas ayuda con algún paso específico? ¡Avísame!


