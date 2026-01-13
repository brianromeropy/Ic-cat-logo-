@echo off
echo Creando archivo .env en backend...

(
echo PORT=5000
echo FRONTEND_URL=http://localhost:3000
echo.
echo # Database
echo DB_HOST=localhost
echo DB_USER=root
echo DB_PASSWORD=
echo DB_NAME=ic_tienda
echo DB_PORT=3306
echo.
echo # JWT
echo JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion_123456789
echo JWT_EXPIRES_IN=7d
echo.
echo # WhatsApp (opcional para integracion futura)
echo WHATSAPP_API_KEY=
echo WHATSAPP_PHONE_NUMBER=5491112345678
) > backend\.env

echo.
echo Archivo backend\.env creado exitosamente!
echo.
echo IMPORTANTE: Edita backend\.env y cambia:
echo   - DB_PASSWORD si MySQL tiene contraseña
echo   - DB_USER si usas otro usuario
echo.
pause

