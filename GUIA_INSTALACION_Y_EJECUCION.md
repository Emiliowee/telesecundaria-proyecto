# 🚀 GUÍA DE INSTALACIÓN Y EJECUCIÓN
## Sistema de Gestión Escolar - Telesecundaria

**Versión:** 2.0  
**Última actualización:** Octubre 2025

---

## 📋 TABLA DE CONTENIDO

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación Paso a Paso](#instalación-paso-a-paso)
3. [Ejecutar el Proyecto](#ejecutar-el-proyecto)
4. [Usuarios de Prueba](#usuarios-de-prueba)
5. [Solución de Problemas](#solución-de-problemas)
6. [Comandos Útiles](#comandos-útiles)

---

## REQUISITOS PREVIOS

### Software Necesario

| Software | Versión Mínima | Descarga |
|----------|----------------|----------|
| **Node.js** | 18.0+ | https://nodejs.org |
| **XAMPP** | 8.2+ | https://www.apachefriends.org |
| **Git** | 2.0+ | https://git-scm.com |
| **Editor de Código** | VS Code recomendado | https://code.visualstudio.com |

### Verificar Instalaciones

Abre una terminal (CMD, PowerShell o Git Bash) y ejecuta:

```bash
# Verificar Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar: 9.x.x o superior

# Verificar Git
git --version
# Debe mostrar: git version 2.x.x
```

---

## INSTALACIÓN PASO A PASO

### PASO 1: Clonar o Descargar el Proyecto

**Opción A: Con Git (Recomendado)**
```bash
# Navegar a la carpeta donde quieres el proyecto
cd C:\Users\TuUsuario\Documents

# Clonar el repositorio
git clone [URL-DEL-REPOSITORIO]
cd proyecto-nuevo
```

**Opción B: Sin Git**
1. Descarga el proyecto como ZIP
2. Extrae en la ubicación deseada
3. Abre la carpeta en tu terminal

---

### PASO 2: Configurar la Base de Datos

#### 2.1 Iniciar XAMPP

1. Abre **XAMPP Control Panel**
2. Inicia **Apache** (clic en "Start")
3. Inicia **MySQL** (clic en "Start")

Los botones deben ponerse VERDES si todo está bien.

#### 2.2 Crear la Base de Datos

**Opción A: Con phpMyAdmin (Más Fácil)**

1. Abre tu navegador
2. Ve a: `http://localhost/phpmyadmin`
3. Haz clic en "Nueva" (en el menú izquierdo)
4. Nombre de la base de datos: `telesecundaria`
5. Cotejamiento: `utf8mb4_unicode_ci`
6. Haz clic en "Crear"

**Opción B: Con línea de comandos**

```bash
# Navegar a la carpeta de MySQL en XAMPP
cd C:\xampp\mysql\bin

# Conectar a MySQL
mysql -u root -p
# Cuando pida contraseña, presiona Enter (sin contraseña por defecto)

# Crear base de datos
CREATE DATABASE telesecundaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit
```

#### 2.3 Importar el Schema

**Opción A: Con phpMyAdmin**

1. En phpMyAdmin, haz clic en la base de datos `telesecundaria` (menú izquierdo)
2. Ve a la pestaña "Importar"
3. Haz clic en "Seleccionar archivo"
4. Busca y selecciona: `proyecto-nuevo/database/schema.sql`
5. Haz clic en "Continuar" al final de la página
6. Debes ver el mensaje: "Importación finalizada con éxito"

**Opción B: Con línea de comandos**

```bash
# Desde la carpeta raíz del proyecto
cd C:\xampp\mysql\bin

# Importar schema
mysql -u root telesecundaria < "C:\ruta\completa\proyecto-nuevo\database\schema.sql"
```

#### 2.4 Verificar que se creó correctamente

En phpMyAdmin:
1. Haz clic en `telesecundaria` (izquierda)
2. Debes ver **12 tablas**:
   - Usuarios
   - Aulas
   - Maestros
   - Alumnos
   - Materias
   - AlumnoMateria
   - MaestroMateria
   - Materiales
   - Prestamo
   - DetallePrestamo
   - password_resets

3. Haz clic en "Usuarios" → "Examinar"
4. Debes ver **4 usuarios de prueba** ya creados

✅ Si ves las tablas y los usuarios, ¡la base de datos está lista!

---

### PASO 3: Configurar el Backend (PHP)

#### 3.1 Verificar Configuración de Base de Datos

Abre el archivo: `backend/config/database.php`

Verifica que tenga estas configuraciones:

```php
private $host = 'localhost';
private $db_name = 'telesecundaria';
private $username = 'root';
private $password = '';  // Vacío por defecto en XAMPP
private $port = 3306;
```

Si tu configuración de MySQL es diferente, ajusta estos valores.

#### 3.2 Instalar PHPMailer (Opcional - Solo para Recuperación de Contraseña)

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias con Composer (si lo tienes instalado)
composer install

# Si NO tienes Composer, PHPMailer ya está incluido en la carpeta phpmailer/
```

**Nota:** La recuperación de contraseña funcionará solo si configuras un email SMTP en `backend/config/email.php`. Para desarrollo, esta funcionalidad es opcional.

---

### PASO 4: Configurar el Frontend (React)

#### 4.1 Instalar Dependencias

```bash
# Desde la raíz del proyecto, navegar a frontend
cd frontend

# Instalar todas las dependencias de npm
npm install
```

Este proceso puede tardar **2-5 minutos** dependiendo de tu conexión a internet.

Debes ver algo como:
```
added 234 packages in 2m
```

#### 4.2 Verificar que se instaló correctamente

```bash
# Ver la lista de dependencias instaladas
npm list --depth=0
```

Debes ver:
- react
- react-dom
- react-router-dom
- axios
- sonner
- tailwindcss
- vite

✅ Si ves estas dependencias, ¡el frontend está listo!

---

## EJECUTAR EL PROYECTO

### IMPORTANTE: Necesitas 2 terminales abiertas simultáneamente

Una para el **backend** (PHP) y otra para el **frontend** (React).

---

### TERMINAL 1: Iniciar el Backend (Servidor PHP)

**Opción A: Con PHP CLI (Recomendado para Desarrollo)**

```bash
# Desde la raíz del proyecto
cd backend

# Iniciar servidor PHP en puerto 8000
php -S localhost:8000
```

Debes ver:
```
[Mon Oct 27 10:00:00 2025] PHP 8.2.0 Development Server (http://localhost:8000) started
```

**Opción B: Con XAMPP (Alternativa)**

Si prefieres usar Apache de XAMPP:
1. Copia la carpeta `backend` a `C:\xampp\htdocs\`
2. Renómbrala a `telesecundaria-api`
3. El backend estará disponible en: `http://localhost/telesecundaria-api`
4. **IMPORTANTE:** Si usas esta opción, debes cambiar la URL base en el frontend:
   - Edita `frontend/src/services/api.js`
   - Cambia `baseURL: 'http://localhost:8000/api'` 
   - Por: `baseURL: 'http://localhost/telesecundaria-api/api'`

---

### TERMINAL 2: Iniciar el Frontend (React + Vite)

**Abre una NUEVA terminal** (no cierres la del backend)

```bash
# Desde la raíz del proyecto
cd frontend

# Iniciar servidor de desarrollo Vite
npm run dev
```

Debes ver:
```
  VITE v5.2.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### ABRIR EL SISTEMA EN EL NAVEGADOR

1. Abre tu navegador (Chrome, Firefox, Edge, etc.)
2. Ve a: **http://localhost:5173**
3. Debes ver la **pantalla de Login**

✅ Si ves la pantalla de login con el diseño split-screen, ¡TODO ESTÁ FUNCIONANDO!

---

## USUARIOS DE PRUEBA

El sistema viene con 4 usuarios pre-configurados:

### 1. DIRECTOR

```
ID de Usuario: 1
Contraseña: 12345
Permisos: Gestión de Usuarios y Maestros
```

**Dashboard:** Muestra total de usuarios y maestros, distribución por tipo de usuario.

---

### 2. SECRETARIO

```
ID de Usuario: 2
Contraseña: 12345
Permisos: Alumnos, Maestros, Aulas, Materias, Usuarios
```

**Dashboard:** Muestra alumnos, maestros, aulas, materias, distribución por grado.

---

### 3. MAESTRO

```
ID de Usuario: 3
Contraseña: 12345
Permisos: Calificaciones
```

**Dashboard:** Muestra total de calificaciones, promedio general, distribución de desempeño académico.

---

### 4. ADMINISTRATIVO

```
ID de Usuario: 4
Contraseña: 12345
Permisos: Materiales y Préstamos
```

**Dashboard:** Muestra materiales, stock, préstamos activos, materiales más prestados.

---

## FLUJO DE PRUEBA RECOMENDADO

### 1. Probar Login y Dashboard

1. Abre http://localhost:5173
2. Ingresa ID: `1` y Contraseña: `12345`
3. Debes ver el Dashboard del Director
4. Explora las estadísticas
5. Haz clic en "Cerrar Sesión" (icono de salida en el sidebar)

### 2. Probar Diferentes Roles

Repite el login con cada usuario (ID 2, 3, 4) para ver los diferentes dashboards.

### 3. Probar Módulo de Usuarios

1. Login como Director (ID 1)
2. Haz clic en "Usuarios" en el sidebar
3. Verás la lista de 4 usuarios
4. Haz clic en "+ Nuevo Usuario"
5. Llena el formulario:
   - Nombre: Test Usuario
   - Correo: test@test.com
   - Contraseña: Test123! (o usa "Generar Contraseña Aleatoria")
   - Tipo: Secretario
6. Haz clic en "Crear Usuario"
7. Debes ver notificación verde: "Usuario creado exitosamente"
8. El nuevo usuario aparece en la tabla

### 4. Probar Módulo de Alumnos

1. Login como Secretario (ID 2)
2. Haz clic en "Alumnos"
3. Haz clic en "+ Nuevo Alumno"
4. Llena el formulario con datos de prueba
5. Guarda y verifica que aparece en la lista

### 5. Probar Módulo de Calificaciones

1. Login como Maestro (ID 3)
2. Haz clic en "Calificaciones"
3. Busca un alumno por matrícula (ejemplo: 20240001)
4. Selecciona materia y periodo
5. Ingresa calificación (0-100)
6. Guarda y verifica notificación de éxito

---

## SOLUCIÓN DE PROBLEMAS

### ❌ Error: "Cannot GET /" o página en blanco

**Causa:** El frontend no está corriendo o está en puerto incorrecto.

**Solución:**
1. Verifica que la terminal del frontend esté activa
2. Verifica que diga: `Local: http://localhost:5173/`
3. Asegúrate de abrir exactamente esa URL

---

### ❌ Error: "Network Error" o "Error de conexión"

**Causa:** El backend (PHP) no está corriendo o hay problema de CORS.

**Solución:**
1. Verifica que la terminal del backend esté activa
2. Ve a http://localhost:8000/api/auth/session.php directamente
3. Debes ver un JSON (aunque sea un error de sesión)
4. Si no ves nada, reinicia el servidor PHP
5. Verifica que `backend/config/cors.php` tenga:
   ```php
   header("Access-Control-Allow-Origin: http://localhost:5173");
   ```

---

### ❌ Error: "SQLSTATE[HY000] [1045] Access denied"

**Causa:** Credenciales incorrectas de MySQL.

**Solución:**
1. Abre `backend/config/database.php`
2. Verifica las credenciales:
   - Si XAMPP: username = 'root', password = ''
   - Si instalación manual: usa tus credenciales
3. Prueba conectarte a MySQL desde terminal:
   ```bash
   mysql -u root -p
   ```

---

### ❌ Error: "SQLSTATE[HY000] [2002] No connection could be made"

**Causa:** MySQL no está corriendo.

**Solución:**
1. Abre XAMPP Control Panel
2. Verifica que MySQL tenga botón VERDE
3. Si no, haz clic en "Start"
4. Si no inicia, revisa el log de MySQL en XAMPP

---

### ❌ Error: "npm install" falla con errores

**Causa:** Node.js desactualizado o problemas de red.

**Solución:**
1. Verifica versión de Node.js:
   ```bash
   node --version
   ```
   Debe ser 18.0.0 o superior

2. Limpia caché de npm:
   ```bash
   npm cache clean --force
   ```

3. Intenta de nuevo:
   ```bash
   npm install
   ```

4. Si sigue fallando, elimina `node_modules` y `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### ❌ Puerto 8000 o 5173 ya está en uso

**Causa:** Otro programa está usando ese puerto.

**Solución para Backend (Puerto 8000):**
```bash
# Usa otro puerto, por ejemplo 8080
php -S localhost:8080

# Luego actualiza en frontend/src/services/api.js
# baseURL: 'http://localhost:8080/api'
```

**Solución para Frontend (Puerto 5173):**
```bash
# Vite automáticamente usará el siguiente puerto disponible (5174, 5175, etc.)
# O especifica uno manualmente:
npm run dev -- --port 3000
```

---

### ❌ Las notificaciones (toast) no aparecen

**Causa:** Sonner no está instalado correctamente.

**Solución:**
```bash
cd frontend
npm install sonner
npm run dev
```

---

### ❌ Los estilos se ven mal (sin colores, sin diseño)

**Causa:** Tailwind CSS no se compiló correctamente.

**Solución:**
```bash
cd frontend
npm install tailwindcss postcss autoprefixer
npm run dev
```

---

### ❌ Error al importar schema.sql

**Causa:** Archivo SQL con errores o encoding incorrecto.

**Solución:**
1. Abre `database/schema.sql` en un editor de texto
2. Verifica que no tenga caracteres extraños
3. Guárdalo con encoding UTF-8
4. Importa de nuevo en phpMyAdmin

---

## COMANDOS ÚTILES

### Backend (PHP)

```bash
# Iniciar servidor PHP en puerto específico
php -S localhost:8000

# Ver errores de PHP
php -S localhost:8000 2>&1 | tee php-errors.log

# Probar un endpoint específico
curl http://localhost:8000/api/auth/session.php
```

### Frontend (React + Vite)

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Linter (detectar errores)
npm run lint

# Limpiar caché
rm -rf node_modules package-lock.json
npm install
```

### MySQL

```bash
# Conectar a MySQL
mysql -u root -p

# Ver bases de datos
SHOW DATABASES;

# Usar base de datos
USE telesecundaria;

# Ver tablas
SHOW TABLES;

# Ver usuarios
SELECT * FROM Usuarios;

# Backup de base de datos
mysqldump -u root telesecundaria > backup.sql

# Restaurar base de datos
mysql -u root telesecundaria < backup.sql
```

### Git (Control de Versiones)

```bash
# Ver estado
git status

# Ver cambios
git diff

# Agregar cambios
git add .

# Hacer commit
git commit -m "descripción del cambio"

# Ver historial
git log --oneline

# Crear rama
git checkout -b feature/nueva-funcionalidad

# Cambiar de rama
git checkout main

# Ver ramas
git branch -a
```

---

## ESTRUCTURA DE PUERTOS

| Servicio | Puerto | URL |
|----------|--------|-----|
| **Frontend (React)** | 5173 | http://localhost:5173 |
| **Backend (PHP)** | 8000 | http://localhost:8000 |
| **MySQL** | 3306 | localhost:3306 |
| **phpMyAdmin** | 80 | http://localhost/phpmyadmin |

---

## RUTAS DEL SISTEMA

### Frontend (Usuario)

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/login` | Inicio de sesión | Público |
| `/reset-password` | Recuperar contraseña | Público |
| `/dashboard` | Panel principal | Autenticado |
| `/usuarios` | Gestión usuarios | Director/Secretario |
| `/maestros` | Gestión maestros | Secretario |
| `/alumnos` | Gestión alumnos | Secretario |
| `/aulas` | Gestión aulas | Secretario |
| `/materias` | Gestión materias | Secretario |
| `/materiales` | Gestión materiales | Administrativo |
| `/prestamos` | Gestión préstamos | Administrativo |
| `/calificaciones` | Gestión calificaciones | Maestro |
| `/reportes` | Reportes académicos | Maestro |

### Backend (API)

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/auth/login.php` | POST | Iniciar sesión |
| `/api/auth/logout.php` | POST | Cerrar sesión |
| `/api/auth/session.php` | GET | Verificar sesión |
| `/api/usuarios/list.php` | GET | Listar usuarios |
| `/api/usuarios/create.php` | POST | Crear usuario |
| `/api/alumnos/list.php` | GET | Listar alumnos |
| `/api/calificaciones/create.php` | POST | Guardar calificación |
| `/api/dashboard/stats.php` | GET | Estadísticas dashboard |

---

## MODO PRODUCCIÓN

### Build del Frontend

```bash
cd frontend

# Crear build de producción
npm run build

# Esto genera la carpeta 'dist' con archivos optimizados
```

Los archivos generados en `frontend/dist/` son:
- HTML minificado
- CSS purged (solo clases usadas, ~10KB)
- JavaScript optimizado y comprimido

### Desplegar en Servidor

1. **Frontend:** Sube la carpeta `dist/` a tu servidor web
2. **Backend:** Sube la carpeta `backend/` a tu servidor PHP
3. **Base de Datos:** Importa `database/schema.sql` en tu MySQL de producción
4. **Configuración:**
   - Actualiza `backend/config/database.php` con credenciales de producción
   - Actualiza URLs en `frontend/src/services/api.js` (si compilaste antes de cambiar)

---

## CONSEJOS DE DESARROLLO

### 1. Hot Reload

El sistema tiene **Hot Module Replacement (HMR)**:
- Los cambios en código React se reflejan INSTANTÁNEAMENTE sin recargar
- Los cambios en PHP requieren refrescar manualmente el navegador
- Los cambios en Tailwind se aplican automáticamente

### 2. DevTools

Usa las herramientas de desarrollo del navegador:
- **F12** para abrir DevTools
- **Console:** Ver errores de JavaScript
- **Network:** Ver peticiones HTTP al backend
- **Application:** Ver datos de sesión y localStorage

### 3. Extensiones Recomendadas (VS Code)

- **ES7+ React/Redux/React-Native snippets:** Atajos React
- **Tailwind CSS IntelliSense:** Autocompletado Tailwind
- **PHP Intelephense:** Autocompletado PHP
- **Thunder Client:** Testing de APIs
- **GitLens:** Historial de Git

### 4. Debugging Backend

Para ver errores de PHP en detalle, edita `backend/config/constants.php`:
```php
// Modo desarrollo
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### 5. Testing de APIs

Usa Thunder Client o Postman para probar endpoints antes de conectar al frontend:

**Ejemplo: Probar Login**
```
POST http://localhost:8000/api/auth/login.php
Body (JSON):
{
  "IDUsuario": 1,
  "contraseña": "12345"
}
```

---

## CONTACTO Y SOPORTE

**Equipo de Desarrollo:** 6 personas  
**Proyecto:** Sistema de Gestión Escolar - Telesecundaria  
**Periodo:** Octubre - Diciembre 2025

---

## CHECKLIST DE INSTALACIÓN

Marca cada paso conforme lo completes:

- [ ] Node.js instalado (v18+)
- [ ] XAMPP instalado (v8.2+)
- [ ] Git instalado
- [ ] Proyecto clonado/descargado
- [ ] XAMPP Apache iniciado (VERDE)
- [ ] XAMPP MySQL iniciado (VERDE)
- [ ] Base de datos `telesecundaria` creada
- [ ] Schema importado (12 tablas visibles)
- [ ] 4 usuarios de prueba verificados
- [ ] `npm install` completado sin errores
- [ ] Backend corriendo en puerto 8000
- [ ] Frontend corriendo en puerto 5173
- [ ] Login funcional con usuario 1
- [ ] Dashboard cargando correctamente

---

¡LISTO! Si todos los checkboxes están marcados, el sistema está **100% funcional** y listo para usar.

**¡Bienvenido al Sistema de Gestión Escolar Telesecundaria! 🎓**

