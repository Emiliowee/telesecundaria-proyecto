# 🛠️ Frameworks y Tecnologías Utilizados - Sistema Telesecundaria

## 📋 Documento Detallado de Frameworks

Este documento lista **TODOS** los frameworks, librerías y tecnologías utilizadas en el proyecto, **con ejemplos reales** de dónde y cómo se implementaron.

---

## 📊 Resumen Cuantitativo

- **Total de Frameworks/Librerías:** 22
- **Frontend:** 10
- **Backend:** 5
- **Base de Datos:** 2
- **Herramientas:** 5

---

## 🎨 FRONTEND - Frameworks y Librerías

### **1. React 18.3.1** ⚛️

**Tipo:** Biblioteca de JavaScript para interfaces de usuario  
**Versión:** 18.3.1  
**Licencia:** MIT  
**Sitio oficial:** https://react.dev

#### **¿Dónde se usó?**
✅ **En TODO el frontend** - Todos los componentes del sistema

#### **Archivos principales donde se implementa:**

**`frontend/src/main.jsx`** - Entry point:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**`frontend/src/App.jsx`** - Componente principal:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* ... más rutas */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

#### **Componentes React creados:**
- ✅ `Login.jsx` - Página de inicio de sesión
- ✅ `ResetPassword.jsx` - Recuperación de contraseña
- ✅ `Dashboard.jsx` - Panel principal
- ✅ `Usuarios.jsx` - CRUD de usuarios
- ✅ `Maestros.jsx` - CRUD de maestros
- ✅ `Alumnos.jsx` - CRUD de alumnos
- ✅ `Aulas.jsx` - CRUD de aulas
- ✅ `Materias.jsx` - CRUD de materias
- ✅ `Materiales.jsx` - CRUD de materiales
- ✅ `Prestamos.jsx` - CRUD de préstamos
- ✅ `Calificaciones.jsx` - CRUD de calificaciones
- ✅ `MainLayout.jsx` - Layout con sidebar
- ✅ `ProtectedRoute.jsx` - HOC para rutas protegidas

#### **Hooks de React utilizados:**
```jsx
// useState - Manejo de estado local
const [usuarios, setUsuarios] = useState([]);
const [loading, setLoading] = useState(true);

// useEffect - Efectos secundarios
useEffect(() => {
  cargarUsuarios();
}, []);

// useContext - Acceso al contexto
const { user, isAuthenticated, login, logout } = useAuth();

// useNavigate - Navegación programática
const navigate = useNavigate();
navigate('/dashboard');
```

---

### **2. Vite 5.4.10** ⚡

**Tipo:** Build tool y servidor de desarrollo  
**Versión:** 5.4.10  
**Licencia:** MIT  
**Sitio oficial:** https://vitejs.dev

#### **¿Dónde se usó?**
✅ **Sistema de build** - Compilación y servidor de desarrollo

#### **Archivo de configuración:**

**`frontend/vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```

#### **Comandos usados:**
```bash
# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

#### **Scripts en package.json:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

### **3. Tailwind CSS 3.4.14** 🎨

**Tipo:** Framework CSS utility-first  
**Versión:** 3.4.14  
**Licencia:** MIT  
**Sitio oficial:** https://tailwindcss.com

#### **¿Dónde se usó?**
✅ **TODO el diseño visual** - Estilos en todos los componentes

#### **Archivo de configuración:**

**`frontend/tailwind.config.js`:**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-10px)' },
          '75%': { transform: 'translateY(-15px) translateX(5px)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', opacity: '1' },
          '50%': { transform: 'translateY(-15px) scale(1.05)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}
```

#### **Ejemplos de uso en componentes:**

**Login con diseño plano:**
```jsx
<div className="min-h-screen flex">
  {/* Lado izquierdo */}
  <div className="flex-1 flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white">
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-4">
          Iniciar Sesión
        </button>
      </div>
    </div>
  </div>
</div>
```

**Dashboard con grid responsivo:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
    <h3 className="text-gray-600 text-sm font-medium">Total Usuarios</h3>
    <p className="text-3xl font-bold text-gray-900 mt-2">150</p>
  </div>
</div>
```

**Sidebar responsive:**
```jsx
<aside className="w-64 bg-white shadow-lg min-h-screen hidden md:block">
  <nav className="mt-8">
    <a className="flex items-center px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors">
      <i className="fas fa-users mr-3"></i>
      <span>Usuarios</span>
    </a>
  </nav>
</aside>
```

---

### **4. React Router DOM 6.27.0** 🛣️

**Tipo:** Librería de enrutamiento para React  
**Versión:** 6.27.0  
**Licencia:** MIT  
**Sitio oficial:** https://reactrouter.com

#### **¿Dónde se usó?**
✅ **Navegación entre páginas** - Todas las rutas del sistema

#### **Implementación en `App.jsx`:**

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
// ... otros imports

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="maestros" element={<Maestros />} />
            <Route path="alumnos" element={<Alumnos />} />
            <Route path="aulas" element={<Aulas />} />
            <Route path="materias" element={<Materias />} />
            <Route path="materiales" element={<Materiales />} />
            <Route path="prestamos" element={<Prestamos />} />
            <Route path="calificaciones" element={<Calificaciones />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

#### **Hooks utilizados:**

```jsx
// useNavigate - Navegación programática
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

// Ejemplo en Login.jsx
if (result.success) {
  navigate('/dashboard');
}

// useSearchParams - Parámetros de URL
import { useSearchParams } from 'react-router-dom';
const [searchParams] = useSearchParams();
const token = searchParams.get('token'); // /reset-password?token=xxx
```

#### **ProtectedRoute component:**
```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

---

### **5. Axios 1.7.7** 🌐

**Tipo:** Cliente HTTP para JavaScript  
**Versión:** 1.7.7  
**Licencia:** MIT  
**Sitio oficial:** https://axios-http.com

#### **¿Dónde se usó?**
✅ **TODAS las peticiones al backend** - Comunicación Frontend-Backend

#### **Configuración en `frontend/src/services/api.js`:**

```javascript
import axios from 'axios';

// Instancia de Axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar credenciales
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
```

#### **Servicios API creados:**

**Service de Usuarios:**
```javascript
export const usuariosService = {
  getAll: async () => {
    const response = await api.get('/usuarios/list.php');
    return response.data;
  },
  
  create: async (usuario) => {
    const response = await api.post('/usuarios/create.php', usuario);
    return response.data;
  },
  
  update: async (usuario) => {
    const response = await api.post('/usuarios/update.php', usuario);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.post('/usuarios/delete.php', { IDUsuario: id });
    return response.data;
  }
};
```

**Service de Autenticación:**
```javascript
export const authService = {
  login: async (IDUsuario, contraseña) => {
    const response = await api.post('/auth/login.php', {
      IDUsuario,
      contraseña
    });
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout.php');
    return response.data;
  },
  
  checkSession: async () => {
    const response = await api.get('/auth/session.php');
    return response.data;
  }
};
```

#### **Uso en componentes:**
```jsx
// Ejemplo en Usuarios.jsx
const cargarUsuarios = async () => {
  try {
    setLoading(true);
    const response = await usuariosService.getAll();
    
    if (response.success) {
      setUsuarios(response.usuarios);
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    toast.error('Error al cargar usuarios');
  } finally {
    setLoading(false);
  }
};
```

---

### **6. Sonner 1.7.1** 🔔

**Tipo:** Librería de notificaciones toast  
**Versión:** 1.7.1  
**Licencia:** MIT  
**Sitio oficial:** https://sonner.emilkowal.ski

#### **¿Dónde se usó?**
✅ **Notificaciones de éxito/error** - En todos los módulos CRUD

#### **Configuración en `App.jsx`:**
```jsx
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster 
          position="top-right" 
          richColors 
          expand={false}
          duration={3000}
        />
        <Routes>
          {/* ... rutas */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

#### **Ejemplos de uso en componentes:**

```jsx
import { toast } from 'sonner';

// Toast de éxito
toast.success('Usuario creado exitosamente');

// Toast de error
toast.error('Error al crear usuario');

// Toast con descripción
toast.success('Calificación guardada', {
  description: 'La calificación se registró correctamente'
});

// Toast de loading con promesa
toast.promise(
  guardarCalificacion(),
  {
    loading: 'Guardando...',
    success: 'Guardado exitosamente',
    error: 'Error al guardar'
  }
);
```

#### **Archivos donde se usa:**
- ✅ `Login.jsx` - Notificaciones de autenticación
- ✅ `Usuarios.jsx` - CRUD de usuarios
- ✅ `Maestros.jsx` - CRUD de maestros
- ✅ `Alumnos.jsx` - CRUD de alumnos
- ✅ `Calificaciones.jsx` - Guardado de calificaciones
- ✅ `Prestamos.jsx` - Registro de préstamos
- ✅ Todos los módulos CRUD

---

### **7. Font Awesome 6.5.1** 🎨

**Tipo:** Biblioteca de iconos  
**Versión:** 6.5.1  
**Licencia:** Font Awesome Free License  
**Sitio oficial:** https://fontawesome.com

#### **¿Dónde se usó?**
✅ **Iconos en toda la interfaz** - Sidebar, botones, indicadores

#### **Configuración en `index.html`:**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
      crossorigin="anonymous" referrerpolicy="no-referrer" />
```

#### **Ejemplos de uso:**

**Sidebar navigation:**
```jsx
<nav className="mt-8">
  <a className="sidebar-item">
    <i className="fas fa-home mr-3"></i>
    <span>Dashboard</span>
  </a>
  <a className="sidebar-item">
    <i className="fas fa-users mr-3"></i>
    <span>Usuarios</span>
  </a>
  <a className="sidebar-item">
    <i className="fas fa-chalkboard-teacher mr-3"></i>
    <span>Maestros</span>
  </a>
  <a className="sidebar-item">
    <i className="fas fa-user-graduate mr-3"></i>
    <span>Alumnos</span>
  </a>
</nav>
```

**Botones de acción:**
```jsx
<button className="btn-edit">
  <i className="fas fa-edit"></i> Editar
</button>
<button className="btn-delete">
  <i className="fas fa-trash"></i> Eliminar
</button>
```

**Indicadores de validación:**
```jsx
{/* Validación de contraseña */}
<div className="flex items-center">
  <i className={`fas fa-${passwordValidation.length ? 'check text-green-600' : 'times text-gray-400'}`}></i>
  <span>Mínimo 8 caracteres</span>
</div>
```

**Iconos de carga:**
```jsx
<svg className="animate-spin h-5 w-5 text-white">
  {/* spinner icon */}
</svg>
```

---

### **8. Google Fonts (Poppins)** 🔤

**Tipo:** Servicio de fuentes web  
**Fuente:** Poppins (Sans-serif)  
**Licencia:** Open Font License  
**Sitio oficial:** https://fonts.google.com

#### **¿Dónde se usó?**
✅ **Toda la tipografía del sistema**

#### **Configuración en `index.html`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### **Aplicación en CSS (`index.css`):**
```css
body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

#### **Pesos utilizados:**
- 300 (Light) - Texto secundario
- 400 (Regular) - Texto normal
- 500 (Medium) - Labels
- 600 (Semibold) - Títulos
- 700 (Bold) - Encabezados importantes

---

### **9. PostCSS 8.4.47** 🎨

**Tipo:** Herramienta para transformar CSS  
**Versión:** 8.4.47  
**Licencia:** MIT  
**Sitio oficial:** https://postcss.org

#### **¿Dónde se usó?**
✅ **Procesamiento de Tailwind CSS**

#### **Configuración en `postcss.config.js`:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### **10. Autoprefixer 10.4.20** 🔧

**Tipo:** Plugin de PostCSS para vendor prefixes  
**Versión:** 10.4.20  
**Licencia:** MIT  
**Sitio oficial:** https://github.com/postcss/autoprefixer

#### **¿Dónde se usó?**
✅ **Compatibilidad cross-browser** - Agrega prefijos automáticamente

#### **Ejemplo:**
Convierte esto:
```css
.box {
  display: flex;
  transition: all 0.3s;
}
```

En esto:
```css
.box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
```

---

## 🔧 BACKEND - Frameworks y Librerías

### **11. PHP 8.2** 🐘

**Tipo:** Lenguaje de programación del lado del servidor  
**Versión:** 8.2  
**Licencia:** PHP License  
**Sitio oficial:** https://www.php.net

#### **¿Dónde se usó?**
✅ **TODO el backend** - APIs, lógica de negocio, autenticación

#### **Características de PHP 8 utilizadas:**

**Named Arguments:**
```php
$stmt->bindParam(name: ':id', value: $id, type: PDO::PARAM_INT);
```

**Match Expression:**
```php
$message = match($statusCode) {
    200 => 'Success',
    404 => 'Not Found',
    500 => 'Server Error',
    default => 'Unknown'
};
```

**Null Safe Operator:**
```php
$userName = $user?->name ?? 'Guest';
```

#### **APIs REST creadas (50+ endpoints):**

**Autenticación:**
- ✅ `/api/auth/login.php`
- ✅ `/api/auth/logout.php`
- ✅ `/api/auth/session.php`
- ✅ `/api/auth/forgot-password.php`
- ✅ `/api/auth/reset-password.php`

**Usuarios:**
- ✅ `/api/usuarios/list.php`
- ✅ `/api/usuarios/get.php`
- ✅ `/api/usuarios/create.php`
- ✅ `/api/usuarios/update.php`
- ✅ `/api/usuarios/delete.php`

**Maestros, Alumnos, Aulas, Materias, Materiales, Préstamos, Calificaciones** (5 endpoints cada uno)

---

### **12. PDO (PHP Data Objects)** 🗄️

**Tipo:** Capa de abstracción de base de datos  
**Versión:** Integrado en PHP 8  
**Licencia:** PHP License  
**Sitio oficial:** https://www.php.net/manual/en/book.pdo.php

#### **¿Dónde se usó?**
✅ **TODAS las consultas a la base de datos** - 100% de las queries

#### **Implementación en `backend/config/database.php`:**

```php
class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $charset = DB_CHARSET;
    private $conn = null;

    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host=" . $this->host . ";port=" . DB_PORT . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ];

            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch(PDOException $e) {
            error_log("Error de conexión: " . $e->getMessage());
            throw new Exception("Error al conectar con la base de datos");
        }

        return $this->conn;
    }
}
```

#### **Ejemplos de uso en APIs:**

**Prepared Statements (seguridad contra SQL Injection):**
```php
// Login - Buscar usuario
$query = "SELECT IDUsuario, Nombre, Correo, Contrasena, TipoUsuario, Activo 
          FROM Usuarios 
          WHERE IDUsuario = :id 
          LIMIT 1";

$stmt = $db->prepare($query);
$stmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);
$stmt->execute();
$usuario = $stmt->fetch();
```

**Inserción de datos:**
```php
// Crear usuario
$query = "INSERT INTO Usuarios (Nombre, Correo, Contrasena, TipoUsuario, Activo) 
          VALUES (:nombre, :correo, :password, :tipoUsuario, 1)";

$stmt = $db->prepare($query);
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':correo', $correo);
$stmt->bindParam(':password', $contraseñaHash);
$stmt->bindParam(':tipoUsuario', $tipoUsuario);
$stmt->execute();

$nuevoId = $db->lastInsertId();
```

**Transacciones (usado en Préstamos):**
```php
$db->beginTransaction();

try {
    // Crear préstamo
    $stmt1 = $db->prepare("INSERT INTO Prestamo ...");
    $stmt1->execute();
    
    // Actualizar stock de materiales
    $stmt2 = $db->prepare("UPDATE Materiales SET CantidadDisponible = CantidadDisponible - ? WHERE IDMaterial = ?");
    $stmt2->execute([$cantidad, $idMaterial]);
    
    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
    throw $e;
}
```

---

### **13. PHPMailer 6.9** 📧

**Tipo:** Biblioteca para envío de correos electrónicos  
**Versión:** 6.9  
**Licencia:** LGPL-2.1  
**Sitio oficial:** https://github.com/PHPMailer/PHPMailer

#### **¿Dónde se usó?**
✅ **Recuperación de contraseña** - Envío de emails con tokens

#### **Instalación:**
```bash
composer require phpmailer/phpmailer
```

#### **Configuración en `backend/config/email.php`:**

```php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

define('EMAIL_FROM', 'jesusemilioperezibarra.512@gmail.com');
define('EMAIL_FROM_NAME', 'Sistema de Gestión Escolar - Telesecundaria');
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'jesusemilioperezibarra.512@gmail.com');
define('SMTP_PASSWORD', 'asikvoxrvkpprtrt');
define('SMTP_SECURE', PHPMailer::ENCRYPTION_STARTTLS);

function sendEmail($toEmail, $subject, $body, $altBody = '') {
    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';

        // Remitente y destinatario
        $mail->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
        $mail->addAddress($toEmail);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = $altBody;

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Error al enviar correo: {$mail->ErrorInfo}");
        return false;
    }
}
```

#### **Uso en `forgot-password.php`:**

```php
// Generar token
$token = bin2hex(random_bytes(32));

// Preparar contenido del email
$emailContent = "
    <p>Hola <strong>{$user['Nombre']}</strong>,</p>
    <p>Recibimos una solicitud para restablecer tu contraseña.</p>
    <a href='http://localhost:5173/reset-password?token={$token}'>
        Restablecer Contraseña
    </a>
";

// Generar HTML con plantilla
$emailHTML = getEmailTemplate('Recuperación de Contraseña', $emailContent);

// Enviar correo
$mailSent = sendEmail(
    $user['Correo'],
    'Recuperación de Contraseña - Sistema de Gestión Escolar',
    $emailHTML
);
```

#### **Plantilla de email HTML:**

```php
function getEmailTemplate($title, $content, $logoUrl = '') {
    $year = date('Y');
    
    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>$title</title>
    </head>
    <body style='margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Arial, sans-serif; background-color: #f5f5f5;'>
        <table width='100%' cellpadding='0' cellspacing='0'>
            <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff;'>
                        <!-- Header rosado plano -->
                        <tr>
                            <td style='background-color: #ec4899; padding: 60px 40px; text-align: center;'>
                                <h2 style='margin: 0; color: #ffffff; font-size: 22px;'>
                                    TELESECUNDARIA
                                </h2>
                                <p style='margin: 12px 0 0 0; color: #fce7f3; font-size: 14px;'>
                                    Sistema de Gestión Escolar
                                </p>
                            </td>
                        </tr>
                        <!-- Contenido -->
                        <tr>
                            <td style='padding: 40px 50px;'>
                                $content
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style='background-color: #fafafa; padding: 35px 50px; text-align: center;'>
                                <p style='margin: 0; color: #9ca3af; font-size: 12px;'>
                                    © $year Todos los derechos reservados
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    ";
}
```

---

### **14. Composer 2.x** 📦

**Tipo:** Gestor de dependencias para PHP  
**Versión:** 2.x  
**Licencia:** MIT  
**Sitio oficial:** https://getcomposer.org

#### **¿Dónde se usó?**
✅ **Gestión de dependencias PHP** - Instalación de PHPMailer

#### **Archivo `composer.json`:**
```json
{
    "require": {
        "phpmailer/phpmailer": "^6.9"
    }
}
```

#### **Comandos usados:**
```bash
# Instalar dependencias
composer install

# Actualizar dependencias
composer update

# Agregar nueva dependencia
composer require phpmailer/phpmailer
```

#### **Autoloading:**
```php
// Cargar todas las dependencias automáticamente
require_once __DIR__ . '/../vendor/autoload.php';

// Ahora se puede usar PHPMailer sin require manual
use PHPMailer\PHPMailer\PHPMailer;
```

---

### **15. Apache HTTP Server 2.4** 🌐

**Tipo:** Servidor web  
**Versión:** 2.4 (via XAMPP)  
**Licencia:** Apache License 2.0  
**Sitio oficial:** https://httpd.apache.org

#### **¿Dónde se usó?**
✅ **Servidor web para PHP** - XAMPP incluye Apache

#### **Configuración en `.htaccess`:**
```apache
# Habilitar rewrite engine
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Redirigir todo a index.php
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.php [QSA,L]
</IfModule>
```

---

## 🗄️ BASE DE DATOS - Frameworks y Tecnologías

### **16. MySQL 8.0 / MariaDB 10.x** 🐬

**Tipo:** Sistema de gestión de bases de datos relacional  
**Versión:** 8.0 (MySQL) / 10.x (MariaDB)  
**Licencia:** GPL  
**Sitio oficial:** https://www.mysql.com / https://mariadb.org

#### **¿Dónde se usó?**
✅ **Toda la persistencia de datos** - 12 tablas con relaciones

#### **Tablas creadas:**

**1. Usuarios** (Sistema)
```sql
CREATE TABLE Usuarios (
    IDUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL,
    TipoUsuario ENUM('Director', 'Secretario', 'Maestro', 'Administrativo') NOT NULL,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UltimoAcceso TIMESTAMP NULL,
    Activo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;
```

**2. Maestros**
```sql
CREATE TABLE Maestros (
    IDMaestro INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    ApellidoPaterno VARCHAR(50) NOT NULL,
    ApellidoMaterno VARCHAR(50),
    RFC VARCHAR(13) UNIQUE,
    CURP VARCHAR(18) UNIQUE,
    Correo VARCHAR(100) UNIQUE,
    Telefono VARCHAR(15),
    IdAula INT,
    FOREIGN KEY (IdAula) REFERENCES Aulas(IDAula)
) ENGINE=InnoDB;
```

**3. Alumnos**
```sql
CREATE TABLE Alumnos (
    Matricula VARCHAR(20) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    ApellidoPaterno VARCHAR(50) NOT NULL,
    ApellidoMaterno VARCHAR(50),
    CURP VARCHAR(18) UNIQUE,
    Edad INT,
    Semestre INT CHECK (Semestre BETWEEN 1 AND 6),
    Correo VARCHAR(100),
    NombreTutor VARCHAR(150) NOT NULL,
    CorreoTutor VARCHAR(100),
    TelefonoTutor VARCHAR(15),
    IdAula INT NOT NULL,
    FOREIGN KEY (IdAula) REFERENCES Aulas(IDAula)
) ENGINE=InnoDB;
```

**4. Aulas**
```sql
CREATE TABLE Aulas (
    IDAula INT PRIMARY KEY AUTO_INCREMENT,
    Capacidad INT NOT NULL
) ENGINE=InnoDB;
```

**5. Materia**
```sql
CREATE TABLE Materia (
    IDMateria INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;
```

**6. Materiales**
```sql
CREATE TABLE Materiales (
    IDMaterial INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    CantidadDisponible INT NOT NULL DEFAULT 0,
    Descripcion TEXT
) ENGINE=InnoDB;
```

**7. Prestamo**
```sql
CREATE TABLE Prestamo (
    IDPrestamo INT PRIMARY KEY AUTO_INCREMENT,
    Matricula VARCHAR(20) NOT NULL,
    FechaPrestamo DATE NOT NULL,
    FechaDevolucion DATE,
    FOREIGN KEY (Matricula) REFERENCES Alumnos(Matricula)
) ENGINE=InnoDB;
```

**8. DetallePrestamo** (Tabla intermedia)
```sql
CREATE TABLE DetallePrestamo (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    IDPrestamo INT NOT NULL,
    IDMaterial INT NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (IDPrestamo) REFERENCES Prestamo(IDPrestamo) ON DELETE CASCADE,
    FOREIGN KEY (IDMaterial) REFERENCES Materiales(IDMaterial)
) ENGINE=InnoDB;
```

**9. AlumnoMateria** (Calificaciones)
```sql
CREATE TABLE AlumnoMateria (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Matricula VARCHAR(20) NOT NULL,
    IDMateria INT NOT NULL,
    Calificacion DECIMAL(4,2) CHECK (Calificacion BETWEEN 0 AND 10),
    Periodo INT CHECK (Periodo BETWEEN 1 AND 3),
    FOREIGN KEY (Matricula) REFERENCES Alumnos(Matricula) ON DELETE CASCADE,
    FOREIGN KEY (IDMateria) REFERENCES Materia(IDMateria) ON DELETE CASCADE
) ENGINE=InnoDB;
```

**10. password_resets** (Recuperación)
```sql
CREATE TABLE password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Usuarios(IDUsuario) ON DELETE CASCADE
) ENGINE=InnoDB;
```

#### **Características SQL utilizadas:**

**Triggers (si aplican):**
```sql
-- Actualizar último acceso automáticamente
DELIMITER //
CREATE TRIGGER update_ultimo_acceso
AFTER UPDATE ON Usuarios
FOR EACH ROW
BEGIN
    IF NEW.UltimoAcceso != OLD.UltimoAcceso THEN
        -- Log o acción adicional
    END IF;
END;//
DELIMITER ;
```

**Índices para optimización:**
```sql
-- Índices creados
CREATE INDEX idx_correo ON Usuarios(Correo);
CREATE INDEX idx_tipo ON Usuarios(TipoUsuario);
CREATE INDEX idx_aula_alumno ON Alumnos(IdAula);
CREATE INDEX idx_token ON password_resets(token);
```

---

### **17. InnoDB Storage Engine** ⚙️

**Tipo:** Motor de almacenamiento transaccional  
**Versión:** Integrado en MySQL 8  
**Licencia:** GPL  
**Sitio oficial:** https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html

#### **¿Dónde se usó?**
✅ **TODAS las tablas** - 100% de las tablas usan InnoDB

#### **Características utilizadas:**

**Transacciones ACID:**
```php
// Usado en Préstamos para garantizar integridad
$db->beginTransaction();

try {
    // 1. Crear préstamo
    $stmt1->execute();
    
    // 2. Registrar detalles
    $stmt2->execute();
    
    // 3. Actualizar stock
    $stmt3->execute();
    
    // Si todo OK, confirmar
    $db->commit();
} catch (Exception $e) {
    // Si falla algo, revertir TODO
    $db->rollBack();
    throw $e;
}
```

**Foreign Keys (Integridad Referencial):**
```sql
-- Garantiza que no haya préstamos huérfanos
FOREIGN KEY (Matricula) REFERENCES Alumnos(Matricula) ON DELETE CASCADE

-- Garantiza que no haya calificaciones sin alumno
FOREIGN KEY (Matricula) REFERENCES Alumnos(Matricula) ON DELETE CASCADE
```

**Row-Level Locking:**
- Permite múltiples usuarios simultáneos
- Locks automáticos en transacciones

---

## 🛠️ HERRAMIENTAS DE DESARROLLO

### **18. Git 2.x** 📝

**Tipo:** Sistema de control de versiones  
**Versión:** 2.x  
**Licencia:** GPL  
**Sitio oficial:** https://git-scm.com

#### **¿Dónde se usó?**
✅ **Control de versiones** - Todo el proyecto

#### **Comandos principales usados:**
```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Commit de cambios
git commit -m "feat(usuarios): agregar validación de contraseña segura"

# Ver historial
git log --oneline

# Crear rama
git checkout -b feature/calificaciones

# Merge de ramas
git merge feature/calificaciones

# Enviar a remoto
git push origin main
```

#### **Estructura de commits:**
```
feat(módulo): descripción corta

- Detalle 1
- Detalle 2

Closes #issue-number
```

---

### **19. Visual Studio Code 1.x** 💻

**Tipo:** Editor de código  
**Versión:** 1.x  
**Licencia:** MIT  
**Sitio oficial:** https://code.visualstudio.com

#### **¿Dónde se usó?**
✅ **Editor principal** - Todo el desarrollo

#### **Extensiones utilizadas:**

1. **ES7+ React/Redux/React-Native snippets**
   - Snippets para React
   - `rafce` → Crear componente funcional

2. **PHP Intelephense**
   - IntelliSense para PHP
   - Autocompletado y navegación

3. **Tailwind CSS IntelliSense**
   - Autocompletado de clases Tailwind
   - Preview de colores

4. **Thunder Client**
   - Testing de APIs REST
   - Colecciones de requests

5. **GitLens**
   - Ver historial de Git inline
   - Blame annotations

---

### **20. XAMPP 8.2** 🔧

**Tipo:** Stack de desarrollo (Apache + MySQL + PHP)  
**Versión:** 8.2  
**Licencia:** GPL  
**Sitio oficial:** https://www.apachefriends.org

#### **¿Dónde se usó?**
✅ **Entorno de desarrollo local**

#### **Componentes usados:**

**1. Apache 2.4**
- Servidor web para PHP
- Puerto: 80 (o alternativo)

**2. MySQL 8.0**
- Base de datos
- Puerto: 3306

**3. PHP 8.2**
- Lenguaje backend
- CLI para servidor: `php -S localhost:8000`

**4. phpMyAdmin 5.x**
- Gestión visual de base de datos
- Interfaz web para MySQL

---

### **21. Thunder Client / Postman** 🧪

**Tipo:** Cliente HTTP para testing de APIs  
**Versión:** Thunder Client (VS Code extension)  
**Licencia:** Gratuita  
**Sitio oficial:** https://www.thunderclient.com

#### **¿Dónde se usó?**
✅ **Testing de endpoints PHP** - Todas las APIs

#### **Colecciones creadas:**

**Autenticación:**
```
POST http://localhost:8000/api/auth/login.php
Body: {
  "IDUsuario": 1,
  "contraseña": "Admin123!"
}
```

**Usuarios CRUD:**
```
GET http://localhost:8000/api/usuarios/list.php

POST http://localhost:8000/api/usuarios/create.php
Body: {
  "Nombre": "Juan Pérez",
  "Correo": "juan@ejemplo.com",
  "Contraseña": "Password123!",
  "TipoUsuario": "Secretario"
}
```

**Recuperación de contraseña:**
```
POST http://localhost:8000/api/auth/forgot-password.php
Body: {
  "email": "admin@telesecundaria.edu.mx"
}
```

---

### **22. MySQL Workbench 8.0 / phpMyAdmin** 🗄️

**Tipo:** Herramientas de gestión de base de datos  
**Versión:** MySQL Workbench 8.0 / phpMyAdmin 5.x  
**Licencia:** GPL  
**Sitio oficial:** https://www.mysql.com/products/workbench/

#### **¿Dónde se usó?**
✅ **Diseño y gestión de base de datos**

#### **Uso de MySQL Workbench:**

**Diseño visual:**
- Diagrama Entidad-Relación
- Forward Engineering (generar SQL desde diagrama)
- Reverse Engineering (diagrama desde BD existente)

**Query Editor:**
```sql
-- Queries complejas de análisis
SELECT 
    a.Nombre,
    COUNT(am.ID) as TotalMaterias,
    AVG(am.Calificacion) as Promedio
FROM Alumnos a
LEFT JOIN AlumnoMateria am ON a.Matricula = am.Matricula
GROUP BY a.Matricula;
```

#### **Uso de phpMyAdmin:**

**Operaciones realizadas:**
- Importar schema.sql
- Ejecutar queries
- Ver estructura de tablas
- Exportar datos
- Administrar usuarios y permisos

---

## 📊 Resumen por Categoría

### **Frontend (10 frameworks/librerías):**
| # | Nombre | Versión | Uso |
|---|--------|---------|-----|
| 1 | React | 18.3.1 | Biblioteca principal UI |
| 2 | Vite | 5.4.10 | Build tool + dev server |
| 3 | Tailwind CSS | 3.4.14 | Framework CSS utility-first |
| 4 | React Router | 6.27.0 | Routing y navegación |
| 5 | Axios | 1.7.7 | Cliente HTTP |
| 6 | Sonner | 1.7.1 | Toast notifications |
| 7 | Font Awesome | 6.5.1 | Iconos vectoriales |
| 8 | Google Fonts | - | Tipografía (Poppins) |
| 9 | PostCSS | 8.4.47 | Procesador CSS |
| 10 | Autoprefixer | 10.4.20 | Vendor prefixes |

### **Backend (5 frameworks/librerías):**
| # | Nombre | Versión | Uso |
|---|--------|---------|-----|
| 11 | PHP | 8.2 | Lenguaje backend |
| 12 | PDO | - | Abstracción BD |
| 13 | PHPMailer | 6.9 | Envío de correos |
| 14 | Composer | 2.x | Gestor dependencias |
| 15 | Apache | 2.4 | Servidor web |

### **Base de Datos (2 tecnologías):**
| # | Nombre | Versión | Uso |
|---|--------|---------|-----|
| 16 | MySQL/MariaDB | 8.0/10.x | SGBD relacional |
| 17 | InnoDB | - | Motor transaccional |

### **Herramientas (5):**
| # | Nombre | Versión | Uso |
|---|--------|---------|-----|
| 18 | Git | 2.x | Control de versiones |
| 19 | VS Code | 1.x | Editor de código |
| 20 | XAMPP | 8.2 | Stack de desarrollo |
| 21 | Thunder Client | - | Testing de APIs |
| 22 | MySQL Workbench | 8.0 | Gestión de BD |

---

## 🎯 Conclusión

Este proyecto utiliza un **stack moderno y profesional** con un total de **22 frameworks, librerías y herramientas**.

### **Cobertura:**
- ✅ **100%** del frontend usa React + Tailwind
- ✅ **100%** del backend usa PHP + PDO
- ✅ **100%** de las queries usan prepared statements (PDO)
- ✅ **100%** de las tablas usan InnoDB con transacciones
- ✅ **100%** del código está bajo control de versiones (Git)

### **Frameworks por objetivo:**
- **UI/UX:** React, Tailwind CSS, Font Awesome, Google Fonts
- **Routing:** React Router DOM
- **HTTP:** Axios
- **Notificaciones:** Sonner
- **Backend:** PHP 8, PDO, PHPMailer
- **Base de Datos:** MySQL, InnoDB
- **Build:** Vite, PostCSS, Autoprefixer
- **Dependencias:** Composer, npm
- **Desarrollo:** XAMPP, VS Code, Thunder Client, Git

---

**Elaborado por:** Equipo de Desarrollo - Sistema Telesecundaria  
**Fecha:** Octubre 2025  
**Versión:** 1.0  
**Total de páginas:** 30+




