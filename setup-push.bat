@echo off
echo ========================================
echo Subir Proyecto a GitHub
echo ========================================
echo.

set /p GITHUB_USER="Ingresa tu usuario de GitHub: "
set /p REPO_NAME="Ingresa el nombre del repositorio (ej: ic-catalogo): "

if "%GITHUB_USER%"=="" (
    echo ERROR: Debes ingresar tu usuario de GitHub
    pause
    exit /b 1
)

if "%REPO_NAME%"=="" (
    set REPO_NAME=ic-catalogo
)

echo.
echo Configurando repositorio remoto...
echo URL: https://github.com/%GITHUB_USER%/%REPO_NAME%.git
echo.

REM Verificar si ya existe el remoto
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo El remoto 'origin' ya existe.
    set /p OVERWRITE="¿Deseas reemplazarlo? (S/N): "
    if /i "%OVERWRITE%"=="S" (
        git remote remove origin
    ) else (
        echo Operacion cancelada.
        pause
        exit /b 0
    )
)

REM Agregar remoto
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

echo.
echo Remoto agregado correctamente!
echo.
echo Siguiente paso: Subir el codigo
echo.
set /p PUSH_NOW="¿Deseas subir el codigo ahora? (S/N): "

if /i "%PUSH_NOW%"=="S" (
    echo.
    echo Agregando archivos...
    git add .
    
    echo.
    echo Creando commit...
    git commit -m "Initial commit: IC Catalogo completo"
    
    echo.
    echo Cambiando a rama main...
    git branch -M main
    
    echo.
    echo Subiendo a GitHub...
    echo NOTA: Te pedira usuario y contraseña/token
    echo.
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo ERROR al subir. Verifica:
        echo - Que el repositorio exista en GitHub
        echo - Tus credenciales sean correctas
        echo - Que uses un Personal Access Token como contraseña
    ) else (
        echo.
        echo ========================================
        echo ¡Proyecto subido exitosamente!
        echo ========================================
        echo.
        echo Tu proyecto esta en:
        echo https://github.com/%GITHUB_USER%/%REPO_NAME%
        echo.
    )
) else (
    echo.
    echo Para subir manualmente, ejecuta:
    echo   git add .
    echo   git commit -m "Initial commit"
    echo   git branch -M main
    echo   git push -u origin main
)

echo.
pause


