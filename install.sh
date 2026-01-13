#!/bin/bash

echo "🚀 Instalando IC Tienda..."

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd ../backend
npm install

echo "✅ Instalación completada!"
echo ""
echo "📝 Próximos pasos:"
echo "1. Configurar base de datos MySQL (ver database/scripts/create_tables.sql)"
echo "2. Crear archivo backend/.env basado en backend/.env.example"
echo "3. Ejecutar: cd backend && npm run dev (en una terminal)"
echo "4. Ejecutar: cd frontend && npm run dev (en otra terminal)"

