@echo off
echo ========================================
echo Preparar Proyecto para GitHub
echo ========================================
echo.

echo Verificando Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Git no esta instalado.
    echo.
    echo Por favor instala Git desde:
    echo https://git-scm.com/download/win
    echo.
    echo Despues de instalar, reinicia esta terminal y ejecuta este script nuevamente.
    pause
    exit /b 1
)

echo Git encontrado!
echo.

echo Configurando repositorio...
echo.

REM Inicializar repositorio si no existe
if not exist .git (
    echo Inicializando repositorio Git...
    git init
    echo.
)

REM Verificar estado
echo Estado actual del repositorio:
git status
echo.

echo ========================================
echo Siguiente paso:
echo ========================================
echo.
echo 1. Crea un repositorio en GitHub:
echo    https://github.com/new
echo.
echo 2. Ejecuta estos comandos (reemplaza TU_USUARIO):
echo.
echo    git remote add origin https://github.com/TU_USUARIO/ic-catalogo.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo O ejecuta: setup-push.bat (despues de crear el repo)
echo.
pause


