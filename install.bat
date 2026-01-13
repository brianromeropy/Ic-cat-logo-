@echo off
echo Instalando IC Tienda...

echo Instalando dependencias del frontend...
cd frontend
call npm install

echo Instalando dependencias del backend...
cd ..\backend
call npm install

echo Instalacion completada!
echo.
echo Proximos pasos:
echo 1. Configurar base de datos MySQL (ver database/scripts/create_tables.sql)
echo 2. Crear archivo backend\.env basado en backend\.env.example
echo 3. Ejecutar: cd backend ^&^& npm run dev (en una terminal)
echo 4. Ejecutar: cd frontend ^&^& npm run dev (en otra terminal)

pause

