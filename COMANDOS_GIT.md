# 🚀 Comandos Git - Guía Rápida

## Primera Vez (Setup Inicial)

```bash
# 1. Verificar que Git está instalado
git --version

# 2. Configurar Git (solo primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# 3. Inicializar repositorio
git init

# 4. Agregar todos los archivos
git add .

# 5. Crear primer commit
git commit -m "Initial commit: IC Catálogo completo"

# 6. Agregar repositorio remoto (reemplaza TU_USUARIO y NOMBRE_REPO)
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git

# 7. Cambiar a rama main
git branch -M main

# 8. Subir código
git push -u origin main
```

---

## Comandos Diarios

### Ver Estado
```bash
git status
```

### Agregar Cambios
```bash
# Agregar todos los cambios
git add .

# Agregar archivo específico
git add nombre-archivo.js
```

### Crear Commit
```bash
git commit -m "Descripción clara de los cambios"
```

### Subir Cambios
```bash
git push
```

### Ver Historial
```bash
git log
```

---

## Ejemplos de Mensajes de Commit

```bash
git commit -m "Agregar icono de carrito con contador en navbar"
git commit -m "Mejorar diseño de cards de productos"
git commit -m "Corregir bug en actualización de carrito"
git commit -m "Agregar filtros por categoría y fabricante"
git commit -m "Migrar de MySQL a MongoDB"
```

---

## Si Algo Sale Mal

### Deshacer cambios no guardados
```bash
git restore nombre-archivo.js
```

### Ver qué archivos cambiaron
```bash
git diff
```

### Ver commits
```bash
git log --oneline
```

---

## Comandos Útiles

```bash
# Ver ramas
git branch

# Crear nueva rama
git checkout -b nombre-rama

# Cambiar de rama
git checkout nombre-rama

# Ver remotos
git remote -v

# Actualizar desde GitHub
git pull
```

