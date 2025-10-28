# 💻 GUÍA PARA TRANSFERIR EL PROYECTO A OTRA LAPTOP
## Sistema de Gestión Escolar - Telesecundaria

**Última actualización:** Octubre 2025

---

## 📋 CHECKLIST RÁPIDO

Antes de empezar, necesitas en la NUEVA laptop:

- [ ] Node.js instalado (v18 o superior)
- [ ] XAMPP instalado (v8.2 o superior)
- [ ] Git instalado (opcional, pero recomendado)
- [ ] Editor de código (VS Code recomendado)

---

## MÉTODO 1: TRANSFERENCIA CON GIT (RECOMENDADO)

### ✅ Ventajas:
- Más rápido
- No se pierden archivos
- Mantiene historial de cambios
- Fácil de actualizar después

### 📝 Pasos:

#### 1. En tu LAPTOP ACTUAL:

**a) Asegúrate que todo está guardado en Git:**

```bash
cd C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo

# Ver archivos modificados
git status

# Guardar todos los cambios
git add .
git commit -m "Proyecto completo antes de transferir"

# Subir a GitHub (si tienes repositorio)
git push origin main
```

#### 2. En la NUEVA LAPTOP:

**a) Instalar requisitos previos:**
- Node.js: https://nodejs.org (descargar LTS)
- XAMPP: https://www.apachefriends.org
- Git: https://git-scm.com

**b) Clonar el repositorio:**

```bash
# Abrir terminal (CMD o PowerShell)
cd C:\Users\TuNuevoUsuario\Documents

# Clonar el proyecto
git clone [URL-DE-TU-REPOSITORIO]
cd proyecto-nuevo
```

**c) Instalar dependencias del Frontend:**

```bash
cd frontend
npm install
```

**d) Configurar la base de datos:**

1. Abre XAMPP Control Panel
2. Inicia Apache y MySQL
3. Ve a http://localhost/phpmyadmin
4. Crea base de datos "telesecundaria"
5. Importa el archivo `database/schema.sql`

**e) Verificar configuración del backend:**

Abre `backend/config/database.php` y verifica:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');  // Vacío por defecto en XAMPP
define('DB_NAME', 'telesecundaria');
```

**f) Ejecutar el proyecto:**

**Terminal 1 - Backend:**
```bash
cd C:\Users\TuNuevoUsuario\Documents\proyecto-nuevo\backend
C:\xampp\php\php.exe -S localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\TuNuevoUsuario\Documents\proyecto-nuevo\frontend
npm run dev
```

¡Listo! Abre http://localhost:5173

---

## MÉTODO 2: TRANSFERENCIA CON USB O CARPETA COMPARTIDA

### ✅ Cuándo usar este método:
- No tienes Git configurado
- No tienes internet estable
- Quieres copiar todo físicamente

### 📝 Pasos:

#### 1. En tu LAPTOP ACTUAL:

**a) Copiar el proyecto completo:**

1. Ve a: `C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo`
2. Copia TODA la carpeta `proyecto-nuevo`
3. Pégala en:
   - USB externa
   - OneDrive/Google Drive
   - Carpeta compartida en red

**⚠️ IMPORTANTE:** NO copies estas carpetas (son muy pesadas y se regeneran):
- `frontend/node_modules` (se regenera con `npm install`)
- `frontend/dist` (se regenera automáticamente)
- `.git` (opcional, solo si no usas Git)

#### 2. En la NUEVA LAPTOP:

**a) Instalar requisitos previos:**
- Node.js: https://nodejs.org
- XAMPP: https://www.apachefriends.org

**b) Copiar el proyecto:**

1. Copia la carpeta `proyecto-nuevo` desde tu USB/Drive
2. Pégala en: `C:\Users\TuNuevoUsuario\Documents\`

**c) Instalar dependencias:**

```bash
# Abrir terminal
cd C:\Users\TuNuevoUsuario\Documents\proyecto-nuevo\frontend

# Instalar dependencias (esto descarga node_modules)
npm install
```

**d) Configurar base de datos:**

1. Abre XAMPP Control Panel
2. Inicia Apache y MySQL (botones "Start")
3. Abre navegador: http://localhost/phpmyadmin
4. Clic en "Nueva" base de datos
5. Nombre: `telesecundaria`
6. Cotejamiento: `utf8mb4_unicode_ci`
7. Clic en "Crear"

**e) Importar datos:**

1. En phpMyAdmin, selecciona la base de datos `telesecundaria`
2. Clic en pestaña "Importar"
3. Clic en "Seleccionar archivo"
4. Busca: `proyecto-nuevo\database\schema.sql`
5. Clic en "Continuar" (abajo de la página)
6. Espera que diga "Importación finalizada correctamente"

**f) Verificar configuración:**

Abre con editor: `backend\config\database.php`

Debe tener:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'telesecundaria');
```

**g) Ejecutar:**

**Terminal 1 - Backend:**
```powershell
cd C:\Users\TuNuevoUsuario\Documents\proyecto-nuevo\backend
C:\xampp\php\php.exe -S localhost:8000
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\TuNuevoUsuario\Documents\proyecto-nuevo\frontend
npm run dev
```

Abre navegador: http://localhost:5173

---

## MÉTODO 3: TRANSFERENCIA RÁPIDA (MISMO SISTEMA OPERATIVO)

Si ambas laptops tienen Windows y la misma estructura:

### 📝 Pasos:

#### 1. Preparar en laptop ACTUAL:

```bash
cd C:\Users\Emilio\Documents\TelesecundariaProy\proyecto-nuevo

# Crear archivo de respaldo de BD
C:\xampp\mysql\bin\mysqldump -u root telesecundaria > backup_telesecundaria.sql
```

#### 2. Copiar TODO:

Copia estas carpetas/archivos a USB:
- Carpeta `proyecto-nuevo` completa (EXCEPTO `node_modules`)
- Archivo `backup_telesecundaria.sql`

#### 3. En laptop NUEVA:

**a) Instalar lo básico:**
- XAMPP
- Node.js

**b) Pegar proyecto:**
```
C:\Users\NuevoUsuario\Documents\proyecto-nuevo
```

**c) Restaurar BD:**
```bash
# Iniciar MySQL en XAMPP primero
# Luego en terminal:
cd C:\xampp\mysql\bin

# Crear base de datos
mysql -u root -e "CREATE DATABASE telesecundaria"

# Importar backup
mysql -u root telesecundaria < C:\Users\NuevoUsuario\Documents\proyecto-nuevo\backup_telesecundaria.sql
```

**d) Instalar dependencias y ejecutar:**
```bash
cd C:\Users\NuevoUsuario\Documents\proyecto-nuevo\frontend
npm install
npm run dev
```

En otra terminal:
```bash
cd C:\Users\NuevoUsuario\Documents\proyecto-nuevo\backend
C:\xampp\php\php.exe -S localhost:8000
```

---

## ⚠️ ERRORES COMUNES Y SOLUCIONES

### Error 1: "node: command not found"
**Problema:** Node.js no está instalado o no está en PATH

**Solución:**
1. Descarga e instala Node.js: https://nodejs.org
2. Reinicia la terminal
3. Verifica: `node --version`

---

### Error 2: "npm install" falla
**Problema:** Problemas de red o caché corrupto

**Solución:**
```bash
# Limpiar caché de npm
npm cache clean --force

# Borrar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

---

### Error 3: "ECONNREFUSED localhost:8000"
**Problema:** El backend no está corriendo

**Solución:**
1. Verifica que XAMPP esté corriendo
2. Inicia el backend en una terminal separada:
```bash
cd backend
C:\xampp\php\php.exe -S localhost:8000
```

---

### Error 4: "Access denied for user 'root'@'localhost'"
**Problema:** Configuración incorrecta de MySQL

**Solución:**
1. Abre `backend/config/database.php`
2. Verifica que sea:
```php
define('DB_PASS', '');  // Vacío en XAMPP por defecto
```
3. Si pusiste contraseña en MySQL, cámbiala aquí

---

### Error 5: "Table 'telesecundaria.usuarios' doesn't exist"
**Problema:** No importaste la base de datos

**Solución:**
1. Ve a http://localhost/phpmyadmin
2. Selecciona base de datos `telesecundaria`
3. Pestaña "Importar"
4. Importa `database/schema.sql`

---

### Error 6: "Port 8000 already in use"
**Problema:** Otro proceso está usando el puerto 8000

**Solución:**
```bash
# Usar otro puerto
cd backend
C:\xampp\php\php.exe -S localhost:8001

# Luego actualiza en frontend:
# frontend/src/context/AuthContext.jsx
# Cambia 'http://localhost:8000' por 'http://localhost:8001'
```

---

### Error 7: "Cannot find module 'react'"
**Problema:** node_modules no se instaló correctamente

**Solución:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 CHECKLIST DE ARCHIVOS IMPORTANTES

Asegúrate de tener estos archivos después de transferir:

### Backend:
- [ ] `backend/config/database.php`
- [ ] `backend/config/cors.php`
- [ ] `backend/api/` (todas las carpetas)
- [ ] `backend/utils/helpers.php`
- [ ] `backend/phpmailer/` (carpeta completa)

### Frontend:
- [ ] `frontend/src/` (carpeta completa)
- [ ] `frontend/package.json`
- [ ] `frontend/vite.config.js`
- [ ] `frontend/tailwind.config.js`
- [ ] `frontend/index.html`

### Database:
- [ ] `database/schema.sql`
- [ ] `database/schema_fixed.sql`

### Raíz:
- [ ] `README.md`
- [ ] Todos los archivos `.md` de documentación

---

## 🔄 ACTUALIZAR DESPUÉS DE TRANSFERIR

Si haces cambios en la laptop actual y quieres pasarlos a la nueva:

### Con Git:
```bash
# En laptop ACTUAL:
git add .
git commit -m "Nuevos cambios"
git push

# En laptop NUEVA:
git pull
```

### Sin Git:
1. Copia solo los archivos modificados
2. NO copies `node_modules` ni `dist`
3. Si cambiaste algo en la BD, exporta solo esas tablas

---

## 🎯 RESUMEN RÁPIDO

### Para transferir el proyecto a otra laptop:

1. **Instala en la nueva laptop:**
   - Node.js
   - XAMPP
   - Git (opcional)

2. **Copia el proyecto:**
   - Con Git: `git clone`
   - Sin Git: Copia carpeta completa (sin node_modules)

3. **Instala dependencias:**
   ```bash
   cd frontend
   npm install
   ```

4. **Configura base de datos:**
   - Inicia XAMPP (Apache + MySQL)
   - Crea BD "telesecundaria" en phpMyAdmin
   - Importa `database/schema.sql`

5. **Ejecuta:**
   - Terminal 1: Backend en puerto 8000
   - Terminal 2: Frontend en puerto 5173

6. **Abre navegador:**
   - http://localhost:5173

---

## 📞 AYUDA ADICIONAL

Si algo no funciona:

1. Revisa la sección "Errores Comunes" arriba
2. Verifica que XAMPP esté corriendo (botones verdes)
3. Verifica versiones: `node --version` (debe ser 18+)
4. Lee los mensajes de error completos en la terminal
5. Consulta `GUIA_INSTALACION_Y_EJECUCION.md` para más detalles

---

## 💡 CONSEJOS PRO

1. **Siempre usa Git:** Facilita las transferencias futuras
2. **No copies node_modules:** Se regenera con `npm install`
3. **Haz backup de la BD:** Antes de transferir
4. **Documenta tus cambios:** Para recordar qué modificaste
5. **Usa mismo puerto:** Evita cambiar configuraciones

---

**Elaborado por:** Equipo de Desarrollo  
**Fecha:** Octubre 2025  
**Versión:** 1.0

