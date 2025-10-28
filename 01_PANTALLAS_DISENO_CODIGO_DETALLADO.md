# DOCUMENTACIÓN TÉCNICA DETALLADA
## PUNTO 1: PANTALLAS DEL DISEÑO/CÓDIGO Y DESCRIPCIÓN DETALLADA

**Sistema de Gestión Escolar - Telesecundaria**  
**Equipo de Desarrollo:** 6 personas  
**Periodo:** Octubre - Diciembre 2025

---

## TABLA DE CONTENIDO

1. [Introducción](#introducción)
2. [Arquitectura General del Sistema](#arquitectura-general-del-sistema)
3. [Pantallas Frontend - React](#pantallas-frontend---react)
4. [Backend APIs - PHP](#backend-apis---php)
5. [Base de Datos - MySQL](#base-de-datos---mysql)
6. [Flujos de Trabajo Completos](#flujos-de-trabajo-completos)

---

## INTRODUCCIÓN

El Sistema de Gestión Escolar para Telesecundaria es una aplicación web completa desarrollada con arquitectura cliente-servidor separada. El sistema maneja la administración integral de una institución educativa de nivel telesecundaria, abarcando gestión de usuarios, personal docente, estudiantes, calificaciones, materiales didácticos y préstamos.

### Características Técnicas Principales

- **Arquitectura:** Separación Frontend-Backend (SPA + REST API)
- **Frontend:** React 18.3.1 con Vite y Tailwind CSS
- **Backend:** PHP 8.2 con arquitectura REST
- **Base de Datos:** MySQL 8.0 con motor InnoDB
- **Autenticación:** Sesiones PHP con httponly cookies
- **Total de Módulos:** 10 módulos funcionales completos
- **Total de Pantallas:** 12 pantallas diferentes
- **Total de Endpoints API:** 50+ endpoints REST
- **Total de Tablas:** 12 tablas con relaciones definidas

---

## ARQUITECTURA GENERAL DEL SISTEMA

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (Navegador)                      │
│                                                              │
│   ┌──────────────────────────────────────────────────┐    │
│   │  FRONTEND - React SPA (Puerto 5173)               │    │
│   │                                                    │    │
│   │  ├─ React 18.3.1 (UI Components)                 │    │
│   │  ├─ React Router (Navegación)                    │    │
│   │  ├─ Tailwind CSS (Estilos)                       │    │
│   │  ├─ Axios (HTTP Client)                          │    │
│   │  ├─ Context API (Estado Global)                  │    │
│   │  └─ Sonner (Notificaciones)                      │    │
│   └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │ (CORS habilitado)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVIDOR (Backend)                          │
│                                                              │
│   ┌──────────────────────────────────────────────────┐    │
│   │  BACKEND - PHP REST API (Puerto 8000)            │    │
│   │                                                    │    │
│   │  ├─ PHP 8.2 (Lenguaje)                          │    │
│   │  ├─ Apache 2.4 (Servidor Web)                   │    │
│   │  ├─ PDO (Capa de Abstracción DB)                │    │
│   │  ├─ PHPMailer 6.9 (Emails)                      │    │
│   │  ├─ Sessions PHP (Autenticación)                │    │
│   │  └─ Prepared Statements (Seguridad)             │    │
│   └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ PDO Connection
                           │ (Prepared Statements)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              BASE DE DATOS (MySQL 8.0)                       │
│                                                              │
│   ├─ 12 Tablas principales                                 │
│   ├─ Motor InnoDB (Transacciones ACID)                     │
│   ├─ Foreign Keys (Integridad Referencial)                 │
│   ├─ Índices (Optimización)                                │
│   ├─ Triggers (Automatización)                             │
│   └─ Stored Procedures (Lógica Compleja)                   │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos General

```
Usuario → Navegador → React Component → Axios Service → 
→ HTTP Request (JSON) → PHP Endpoint → PDO → MySQL →
→ Respuesta MySQL → PDO Processing → JSON Response →
→ Axios → React State Update → UI Actualizada
```

---

## PANTALLAS FRONTEND - REACT

### 1. PANTALLA DE LOGIN (Autenticación)

**Archivo:** `frontend/src/pages/Login.jsx` (392 líneas)  
**Ruta:** `/login`  
**Acceso:** Público (no requiere autenticación)  
**Componentes:** 1 pantalla principal + 1 modal de recuperación

#### 1.1 Descripción Visual

La pantalla de login utiliza un diseño **split-screen** moderno que divide la pantalla en dos secciones simétricas:

**Lado Izquierdo (Formulario):**
- Logo de Telesecundaria en 3D con círculos decorativos animados
- Título "TELEsecundaria" en tipografía Poppins Bold
- Formulario de login con campos de ID de Usuario y Contraseña
- Botones con estados de carga animados
- Enlace de recuperación de contraseña
- Footer con información de versión

**Lado Derecho (Visual):**
- Imagen de fondo institucional de telesecundaria
- Overlay con gradiente sutil para legibilidad
- Logo flotante en esquina superior derecha
- Diseño responsive que se oculta en móviles

#### 1.2 Código Frontend Detallado

**Estructura del Componente:**

```jsx
const Login = () => {
  // Estados locales
  const [formData, setFormData] = useState({
    IDUsuario: '',
    contraseña: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Hooks de navegación y autenticación
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  // ... resto del código
}
```

**Validaciones Frontend:**

1. **Campos Vacíos:**
```jsx
if (!formData.IDUsuario || !formData.contraseña) {
  toast.error('Por favor, complete todos los campos');
  return;
}
```

2. **ID de Usuario Numérico:**
```jsx
const idUsuario = parseInt(formData.IDUsuario);

if (isNaN(idUsuario) || idUsuario <= 0) {
  toast.error('El ID de usuario debe ser un número válido');
  return;
}
```

**Manejo de Autenticación:**

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validaciones previas
  // ...
  
  setLoading(true);

  try {
    // Llamada al servicio de autenticación
    const result = await login(idUsuario, formData.contraseña);
    
    if (result.success) {
      toast.success('¡Bienvenido! Iniciando sesión...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      toast.error(result.message || 'Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error en login:', error);
    toast.error('Error al iniciar sesión. Intente nuevamente');
  } finally {
    setLoading(false);
  }
};
```

#### 1.3 Estilos Tailwind CSS Aplicados

**Diseño Responsivo:**
```jsx
<div className="min-h-screen flex">
  {/* Lado izquierdo - siempre visible */}
  <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
    {/* Contenido */}
  </div>
  
  {/* Lado derecho - oculto en móviles */}
  <div className="hidden lg:flex flex-1 relative overflow-hidden">
    {/* Imagen de fondo */}
  </div>
</div>
```

**Campo de Entrada con Icono:**
```jsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
    <i className="fas fa-user text-pink-400"></i>
  </div>
  <input
    type="number"
    className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 
               rounded-xl focus:ring-2 focus:ring-pink-400 
               focus:border-pink-400 transition-all duration-200"
    placeholder="Ingrese su ID"
  />
</div>
```

**Botón con Estado de Carga:**
```jsx
<button
  type="submit"
  disabled={loading}
  className="w-full bg-pink-500 hover:bg-pink-600 text-white 
             font-bold py-4 px-4 rounded-xl transition-all 
             duration-200 shadow-md hover:shadow-lg 
             disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? (
    <span className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" ...>
        {/* SVG Spinner */}
      </svg>
      Iniciando sesión...
    </span>
  ) : (
    <span className="flex items-center justify-center">
      <i className="fas fa-sign-in-alt mr-2"></i>
      Iniciar Sesión
    </span>
  )}
</button>
```

#### 1.4 Modal de Recuperación de Contraseña

**Funcionalidad:**
- Modal overlay con backdrop blur
- Formulario de ingreso de correo electrónico
- Validación de formato de email
- Integración con endpoint `/api/auth/forgot-password.php`
- Estados de carga y feedback visual

**Código del Modal:**
```jsx
{showForgotPassword && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm 
                  flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
      {/* Icono decorativo */}
      <div className="w-16 h-16 bg-pink-100 rounded-full 
                      flex items-center justify-center mx-auto mb-4">
        <i className="fas fa-key text-pink-500 text-2xl"></i>
      </div>
      
      {/* Formulario de recuperación */}
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 
                     rounded-xl focus:ring-2 focus:ring-pink-400"
          required
        />
        
        <div className="flex gap-3 pt-2">
          <button type="button" className="flex-1 ...">Cancelar</button>
          <button type="submit" className="flex-1 ...">Enviar Enlace</button>
        </div>
      </form>
    </div>
  </div>
)}
```

#### 1.5 Integración con Backend

**Service de Autenticación (Axios):**

Archivo: `frontend/src/services/api.js`

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

**Context API para Estado Global:**

Archivo: `frontend/src/context/AuthContext.jsx`

```jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (IDUsuario, contraseña) => {
    try {
      const response = await authService.login(IDUsuario, contraseña);
      
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      }
      
      return { success: false, message: response.error };
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### 1.6 Endpoint Backend Correspondiente

**Archivo:** `backend/api/auth/login.php`  
**Método:** POST  
**Parámetros:** `{ IDUsuario: number, contraseña: string }`

**Lógica del Endpoint:**

```php
<?php
// Iniciar sesión PHP
session_name('TELESECUNDARIA_SESSION');
session_start();

// Obtener datos del request
$data = getJSONInput();

// Validar campos requeridos
$validation = validateRequired($data, ['IDUsuario', 'contraseña']);
if ($validation !== true) {
    sendError('Datos incompletos', HTTP_BAD_REQUEST);
}

$idUsuario = (int) $data['IDUsuario'];
$contraseña = $data['contraseña'];

// Conectar a la base de datos
$db = getDBConnection();

// Buscar usuario con prepared statement
$query = "SELECT IDUsuario, Nombre, Correo, Contrasena, TipoUsuario, Activo 
          FROM Usuarios 
          WHERE IDUsuario = :id 
          LIMIT 1";

$stmt = $db->prepare($query);
$stmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);
$stmt->execute();

$usuario = $stmt->fetch();

// Validaciones de negocio
if (!$usuario) {
    sendError('Usuario o contraseña incorrectos', HTTP_UNAUTHORIZED);
}

if (!$usuario['Activo']) {
    sendError('Usuario inactivo', HTTP_FORBIDDEN);
}

// Verificar contraseña con password_verify
if (!password_verify($contraseña, $usuario['Contrasena'])) {
    sendError('Usuario o contraseña incorrectos', HTTP_UNAUTHORIZED);
}

// Actualizar último acceso
$updateQuery = "UPDATE Usuarios SET UltimoAcceso = NOW() WHERE IDUsuario = :id";
$updateStmt = $db->prepare($updateQuery);
$updateStmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);
$updateStmt->execute();

// Crear sesión
$_SESSION['user_id'] = $usuario['IDUsuario'];
$_SESSION['user_name'] = $usuario['Nombre'];
$_SESSION['user_email'] = $usuario['Correo'];
$_SESSION['user_type'] = $usuario['TipoUsuario'];
$_SESSION['logged_in'] = true;
$_SESSION['login_time'] = time();

// Regenerar ID de sesión por seguridad
session_regenerate_id(true);

// Respuesta exitosa
$response = [
    'success' => true,
    'message' => 'Inicio de sesión exitoso',
    'user' => [
        'id' => $usuario['IDUsuario'],
        'nombre' => $usuario['Nombre'],
        'correo' => $usuario['Correo'],
        'tipoUsuario' => $usuario['TipoUsuario'],
        'permisos' => PERMISSIONS[$usuario['TipoUsuario']] ?? []
    ]
];

sendResponse($response, HTTP_OK);
?>
```

**Medidas de Seguridad Implementadas:**

1. **Password Hashing:**
   - Contraseñas almacenadas con `password_hash()` (bcrypt)
   - Verificación con `password_verify()`
   - Salt automático

2. **Prepared Statements:**
   - Protección contra SQL Injection
   - Binding de parámetros con tipos específicos

3. **Session Security:**
   - `session_regenerate_id()` después de login
   - Nombre de sesión personalizado
   - httponly cookies (configurado en php.ini)

4. **Validación de Datos:**
   - Validación de campos requeridos
   - Sanitización de inputs
   - Verificación de tipos de datos

5. **Rate Limiting (conceptual):**
   - Logs de intentos fallidos
   - Posibilidad de implementar bloqueo temporal

---

### 2. PANTALLA DE DASHBOARD

**Archivo:** `frontend/src/pages/Dashboard.jsx` (532 líneas)  
**Ruta:** `/dashboard`  
**Acceso:** Protegido (requiere autenticación)  
**Variantes:** 4 dashboards personalizados por rol

#### 2.1 Descripción General

El Dashboard es la pantalla principal después del login. Se adapta dinámicamente según el rol del usuario autenticado, mostrando estadísticas relevantes y accesos rápidos personalizados.

**Roles y sus Dashboards:**

1. **Director:** Gestión de usuarios y maestros
2. **Secretario:** Visión general de alumnos, maestros, aulas y materias
3. **Maestro:** Calificaciones y desempeño académico
4. **Administrativo:** Materiales y préstamos

#### 2.2 Código Frontend Detallado

**Estructura Principal:**

```jsx
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDashboardContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    switch (user?.tipoUsuario) {
      case 'Director':
        return <DashboardDirector stats={stats} />;
      case 'Secretario':
        return <DashboardSecretario stats={stats} />;
      case 'Maestro':
        return <DashboardMaestro stats={stats} />;
      case 'Administrativo':
        return <DashboardAdministrativo stats={stats} />;
      default:
        return <DashboardGenerico />;
    }
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 
                      text-white rounded-xl p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenido, {user?.nombre}
        </h1>
        <p className="text-lg text-primary-50">
          Panel de {user?.tipoUsuario} - Sistema de Gestión Escolar
        </p>
      </div>

      {/* Información del usuario */}
      <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          <i className="fas fa-user-circle mr-2 text-primary-600"></i>
          Información de Usuario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nombre Completo</p>
            <p className="text-lg font-medium text-gray-800">{user?.nombre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rol en el Sistema</p>
            <p className="text-lg font-medium text-gray-800">
              <span className="badge badge-primary">{user?.tipoUsuario}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Correo Electrónico</p>
            <p className="text-lg font-medium text-gray-800">{user?.correo}</p>
          </div>
        </div>
      </div>

      {/* Contenido específico del rol */}
      {renderDashboardContent()}
    </div>
  );
};
```

#### 2.3 Dashboard del Director

**Estadísticas Mostradas:**
- Total de Usuarios en el sistema
- Total de Maestros registrados
- Distribución de usuarios por tipo
- Accesos rápidos a gestión de usuarios y maestros

**Componente:**

```jsx
const DashboardDirector = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      <i className="fas fa-chart-pie mr-2 text-primary-600"></i>
      Panel de Administración
    </h2>

    {/* Tarjetas de Estadísticas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Link to="/usuarios" 
            className="card card-hover p-6 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Usuarios</p>
            <p className="text-4xl font-bold text-primary-600">
              {stats?.totalUsuarios || 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Usuarios activos en el sistema
            </p>
          </div>
          <div className="h-16 w-16 bg-primary-500 rounded-full 
                          flex items-center justify-center">
            <i className="fas fa-users text-3xl text-white"></i>
          </div>
        </div>
      </Link>

      <Link to="/maestros" 
            className="card card-hover p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Maestros</p>
            <p className="text-4xl font-bold text-blue-600">
              {stats?.totalMaestros || 0}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Profesores registrados
            </p>
          </div>
          <div className="h-16 w-16 bg-blue-500 rounded-full 
                          flex items-center justify-center">
            <i className="fas fa-chalkboard-teacher text-3xl text-white"></i>
          </div>
        </div>
      </Link>
    </div>

    {/* Distribución de Usuarios por Tipo */}
    {stats?.usuariosPorTipo && stats.usuariosPorTipo.length > 0 && (
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Distribución de Usuarios por Tipo
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.usuariosPorTipo.map((tipo, idx) => (
            <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-primary-600">
                {tipo.total}
              </p>
              <p className="text-sm text-gray-600">
                {tipo.TipoUsuario}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Accesos Rápidos */}
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Accesos Rápidos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/usuarios" className="card card-hover p-4 flex items-center">
          <i className="fas fa-user-cog text-2xl text-primary-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Gestión de Usuarios</p>
            <p className="text-sm text-gray-600">
              Crear, editar y administrar usuarios
            </p>
          </div>
        </Link>
        <Link to="/maestros" className="card card-hover p-4 flex items-center">
          <i className="fas fa-chalkboard-teacher text-2xl text-blue-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Gestión de Maestros</p>
            <p className="text-sm text-gray-600">
              Administrar personal docente
            </p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);
```

#### 2.4 Dashboard del Secretario

**Estadísticas Mostradas:**
- Total de Alumnos
- Total de Maestros
- Total de Aulas
- Total de Materias
- Distribución de alumnos por grado
- Accesos rápidos a todos los módulos administrativos

**Tarjetas Estadísticas:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {/* Tarjeta de Alumnos */}
  <Link to="/alumnos" 
        className="card card-hover p-6 bg-gradient-to-br from-green-50 to-green-100">
    <div className="text-center">
      <div className="h-14 w-14 bg-green-500 rounded-full 
                      flex items-center justify-center mx-auto mb-3">
        <i className="fas fa-user-graduate text-2xl text-white"></i>
      </div>
      <p className="text-3xl font-bold text-green-600">
        {stats?.totalAlumnos || 0}
      </p>
      <p className="text-sm text-gray-600">Alumnos</p>
    </div>
  </Link>

  {/* Tarjeta de Maestros */}
  <Link to="/maestros" 
        className="card card-hover p-6 bg-gradient-to-br from-blue-50 to-blue-100">
    <div className="text-center">
      <div className="h-14 w-14 bg-blue-500 rounded-full 
                      flex items-center justify-center mx-auto mb-3">
        <i className="fas fa-chalkboard-teacher text-2xl text-white"></i>
      </div>
      <p className="text-3xl font-bold text-blue-600">
        {stats?.totalMaestros || 0}
      </p>
      <p className="text-sm text-gray-600">Maestros</p>
    </div>
  </Link>

  {/* Tarjeta de Aulas */}
  <Link to="/aulas" 
        className="card card-hover p-6 bg-gradient-to-br from-purple-50 to-purple-100">
    <div className="text-center">
      <div className="h-14 w-14 bg-purple-500 rounded-full 
                      flex items-center justify-center mx-auto mb-3">
        <i className="fas fa-door-open text-2xl text-white"></i>
      </div>
      <p className="text-3xl font-bold text-purple-600">
        {stats?.totalAulas || 0}
      </p>
      <p className="text-sm text-gray-600">Aulas</p>
    </div>
  </Link>

  {/* Tarjeta de Materias */}
  <Link to="/materias" 
        className="card card-hover p-6 bg-gradient-to-br from-orange-50 to-orange-100">
    <div className="text-center">
      <div className="h-14 w-14 bg-orange-500 rounded-full 
                      flex items-center justify-center mx-auto mb-3">
        <i className="fas fa-book-open text-2xl text-white"></i>
      </div>
      <p className="text-3xl font-bold text-orange-600">
        {stats?.totalMaterias || 0}
      </p>
      <p className="text-sm text-gray-600">Materias</p>
    </div>
  </Link>
</div>
```

**Gráfico de Alumnos por Grado:**

```jsx
{stats?.alumnosPorGrado && stats.alumnosPorGrado.length > 0 && (
  <div className="card p-6 mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Alumnos por Grado
    </h3>
    <div className="grid grid-cols-3 gap-4">
      {stats.alumnosPorGrado.map((grado, idx) => (
        <div key={idx} 
             className="text-center p-4 bg-gradient-to-br 
                        from-primary-50 to-primary-100 rounded-lg">
          <p className="text-3xl font-bold text-primary-600">
            {grado.total}
          </p>
          <p className="text-sm text-gray-600">
            Grado {grado.Grado}°
          </p>
        </div>
      ))}
    </div>
  </div>
)}
```

#### 2.5 Dashboard del Maestro

**Estadísticas Mostradas:**
- Total de Calificaciones registradas
- Alumnos con calificaciones
- Total de Materias impartidas
- Promedio General del grupo
- Distribución de desempeño académico (Excelente, Muy Bueno, Bueno, Regular, Reprobado)
- Accesos rápidos a calificaciones y reportes

**Distribución de Desempeño Académico:**

```jsx
{stats?.distribucionCalificaciones && (
  <div className="card p-6 mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Distribución de Desempeño Académico
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {/* Excelente (90-100) */}
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <p className="text-2xl font-bold text-green-600">
          {stats.distribucionCalificaciones.excelente || 0}
        </p>
        <p className="text-xs text-gray-600">
          Excelente<br/>(90-100)
        </p>
      </div>

      {/* Muy Bueno (80-89) */}
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <p className="text-2xl font-bold text-blue-600">
          {stats.distribucionCalificaciones.muyBueno || 0}
        </p>
        <p className="text-xs text-gray-600">
          Muy Bueno<br/>(80-89)
        </p>
      </div>

      {/* Bueno (70-79) */}
      <div className="text-center p-4 bg-yellow-50 rounded-lg">
        <p className="text-2xl font-bold text-yellow-600">
          {stats.distribucionCalificaciones.bueno || 0}
        </p>
        <p className="text-xs text-gray-600">
          Bueno<br/>(70-79)
        </p>
      </div>

      {/* Regular (60-69) */}
      <div className="text-center p-4 bg-orange-50 rounded-lg">
        <p className="text-2xl font-bold text-orange-600">
          {stats.distribucionCalificaciones.regular || 0}
        </p>
        <p className="text-xs text-gray-600">
          Regular<br/>(60-69)
        </p>
      </div>

      {/* Reprobado (<60) */}
      <div className="text-center p-4 bg-red-50 rounded-lg">
        <p className="text-2xl font-bold text-red-600">
          {stats.distribucionCalificaciones.reprobado || 0}
        </p>
        <p className="text-xs text-gray-600">
          Reprobado<br/>(&lt;60)
        </p>
      </div>
    </div>
  </div>
)}
```

#### 2.6 Dashboard del Administrativo

**Estadísticas Mostradas:**
- Total de Materiales en inventario
- Total de Stock disponible
- Préstamos Activos
- Materiales con Stock Bajo (<5 unidades)
- Top 5 Materiales más prestados
- Accesos rápidos a materiales y préstamos

**Materiales Más Prestados:**

```jsx
{stats?.materialesMasPrestados && stats.materialesMasPrestados.length > 0 && (
  <div className="card p-6 mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Materiales Más Prestados
    </h3>
    <div className="space-y-3">
      {stats.materialesMasPrestados.map((material, idx) => (
        <div key={idx} 
             className="flex items-center justify-between 
                        p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <span className="h-8 w-8 bg-primary-500 text-white 
                            rounded-full flex items-center 
                            justify-center font-bold mr-3">
              {idx + 1}
            </span>
            <span className="font-medium text-gray-800">
              {material.Nombre}
            </span>
          </div>
          <span className="badge badge-primary">
            {material.totalPrestado} unidades
          </span>
        </div>
      ))}
    </div>
  </div>
)}
```

#### 2.7 Endpoint Backend de Estadísticas

**Archivo:** `backend/api/dashboard/stats.php`  
**Método:** GET  
**Autenticación:** Requerida (Session)

**Lógica del Endpoint:**

```php
<?php
session_start();

// Verificar autenticación
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    sendError('No autenticado', HTTP_UNAUTHORIZED);
}

$tipoUsuario = $_SESSION['user_type'];
$db = getDBConnection();

$stats = [];

// Estadísticas según el rol
switch ($tipoUsuario) {
    case 'Director':
        // Total de usuarios
        $query = "SELECT COUNT(*) as total FROM Usuarios WHERE Activo = 1";
        $stmt = $db->query($query);
        $stats['totalUsuarios'] = $stmt->fetch()['total'];
        
        // Total de maestros
        $query = "SELECT COUNT(*) as total FROM Maestros";
        $stmt = $db->query($query);
        $stats['totalMaestros'] = $stmt->fetch()['total'];
        
        // Usuarios por tipo
        $query = "SELECT TipoUsuario, COUNT(*) as total 
                  FROM Usuarios 
                  WHERE Activo = 1 
                  GROUP BY TipoUsuario";
        $stmt = $db->query($query);
        $stats['usuariosPorTipo'] = $stmt->fetchAll();
        break;
    
    case 'Secretario':
        // Total de alumnos
        $query = "SELECT COUNT(*) as total FROM Alumnos";
        $stmt = $db->query($query);
        $stats['totalAlumnos'] = $stmt->fetch()['total'];
        
        // Total de maestros
        $query = "SELECT COUNT(*) as total FROM Maestros";
        $stmt = $db->query($query);
        $stats['totalMaestros'] = $stmt->fetch()['total'];
        
        // Total de aulas
        $query = "SELECT COUNT(*) as total FROM Aulas";
        $stmt = $db->query($query);
        $stats['totalAulas'] = $stmt->fetch()['total'];
        
        // Total de materias
        $query = "SELECT COUNT(*) as total FROM Materias";
        $stmt = $db->query($query);
        $stats['totalMaterias'] = $stmt->fetch()['total'];
        
        // Alumnos por grado
        $query = "SELECT Grado, COUNT(*) as total 
                  FROM Alumnos 
                  GROUP BY Grado 
                  ORDER BY Grado";
        $stmt = $db->query($query);
        $stats['alumnosPorGrado'] = $stmt->fetchAll();
        break;
    
    case 'Maestro':
        // Total de calificaciones
        $query = "SELECT COUNT(*) as total FROM AlumnoMateria";
        $stmt = $db->query($query);
        $stats['totalCalificaciones'] = $stmt->fetch()['total'];
        
        // Alumnos con calificaciones
        $query = "SELECT COUNT(DISTINCT Matricula) as total FROM AlumnoMateria";
        $stmt = $db->query($query);
        $stats['alumnosConCalificaciones'] = $stmt->fetch()['total'];
        
        // Total de materias
        $query = "SELECT COUNT(*) as total FROM Materias";
        $stmt = $db->query($query);
        $stats['totalMaterias'] = $stmt->fetch()['total'];
        
        // Promedio general
        $query = "SELECT AVG(Calificacion) as promedio FROM AlumnoMateria";
        $stmt = $db->query($query);
        $result = $stmt->fetch();
        $stats['promedioGeneral'] = number_format($result['promedio'] ?? 0, 2);
        
        // Distribución de calificaciones
        $query = "SELECT 
                    SUM(CASE WHEN Calificacion >= 90 THEN 1 ELSE 0 END) as excelente,
                    SUM(CASE WHEN Calificacion >= 80 AND Calificacion < 90 THEN 1 ELSE 0 END) as muyBueno,
                    SUM(CASE WHEN Calificacion >= 70 AND Calificacion < 80 THEN 1 ELSE 0 END) as bueno,
                    SUM(CASE WHEN Calificacion >= 60 AND Calificacion < 70 THEN 1 ELSE 0 END) as regular,
                    SUM(CASE WHEN Calificacion < 60 THEN 1 ELSE 0 END) as reprobado
                  FROM AlumnoMateria";
        $stmt = $db->query($query);
        $stats['distribucionCalificaciones'] = $stmt->fetch();
        break;
    
    case 'Administrativo':
        // Total de materiales
        $query = "SELECT COUNT(*) as total FROM Materiales";
        $stmt = $db->query($query);
        $stats['totalMateriales'] = $stmt->fetch()['total'];
        
        // Total stock
        $query = "SELECT SUM(CantidadDisponible) as total FROM Materiales";
        $stmt = $db->query($query);
        $stats['totalStock'] = $stmt->fetch()['total'] ?? 0;
        
        // Préstamos activos
        $query = "SELECT COUNT(*) as total FROM Prestamo WHERE Devuelto = 0";
        $stmt = $db->query($query);
        $stats['totalPrestamos'] = $stmt->fetch()['total'];
        
        // Materiales con stock bajo
        $query = "SELECT COUNT(*) as total FROM Materiales WHERE CantidadDisponible < 5";
        $stmt = $db->query($query);
        $stats['materialesStockBajo'] = $stmt->fetch()['total'];
        
        // Materiales más prestados
        $query = "SELECT m.Nombre, SUM(p.Cantidad) as totalPrestado 
                  FROM Prestamo p
                  INNER JOIN Materiales m ON p.IDMaterial = m.IDMaterial
                  GROUP BY p.IDMaterial
                  ORDER BY totalPrestado DESC
                  LIMIT 5";
        $stmt = $db->query($query);
        $stats['materialesMasPrestados'] = $stmt->fetchAll();
        break;
}

sendResponse([
    'success' => true,
    'stats' => $stats
], HTTP_OK);
?>
```

---

### 3. PANTALLA DE GESTIÓN DE USUARIOS (CRUD Completo)

**Archivo:** `frontend/src/pages/Usuarios.jsx`  
**Ruta:** `/usuarios`  
**Acceso:** Protegido - Solo Director y Secretario  
**Funcionalidad:** CRUD completo de usuarios del sistema

#### 3.1 Descripción de Funcionalidades

**Operaciones CRUD:**
1. **Create:** Crear nuevos usuarios con validación de contraseña segura
2. **Read:** Listar todos los usuarios con sus detalles
3. **Update:** Modificar información de usuarios existentes
4. **Delete:** Eliminar usuarios con confirmación

**Características Adicionales:**
- Búsqueda y filtrado en tiempo real
- Validación de contraseña segura con indicadores visuales
- Generación automática de contraseñas aleatorias
- Toast notifications para feedback
- Modal de confirmación para eliminación
- Indicadores de estado activo/inactivo
- Diseño responsive con tabla adaptativa

#### 3.2 Validación de Contraseña Segura

**Requisitos de Contraseña:**
- Mínimo 8 caracteres
- Al menos una letra mayúscula
- Al menos una letra minúscula
- Al menos un número
- Al menos un carácter especial (!@#$%^&*(),.?":{}|<>)

**Código de Validación:**

```jsx
const [passwordValidation, setPasswordValidation] = useState({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false,
  special: false
});

// Validar contraseña en tiempo real
const validatePassword = (password) => {
  setPasswordValidation({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  });
};

// Verificar si la contraseña es válida
const isPasswordValid = () => {
  return Object.values(passwordValidation).every(valid => valid);
};
```

**Indicadores Visuales en el Modal:**

```jsx
<div className="space-y-2 text-sm">
  <div className="flex items-center">
    <i className={`fas fa-${passwordValidation.length ? 'check text-green-600' : 'times text-gray-400'} mr-2`}></i>
    <span className={passwordValidation.length ? 'text-green-600' : 'text-gray-500'}>
      Mínimo 8 caracteres
    </span>
  </div>
  <div className="flex items-center">
    <i className={`fas fa-${passwordValidation.uppercase ? 'check text-green-600' : 'times text-gray-400'} mr-2`}></i>
    <span className={passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'}>
      Al menos una letra mayúscula
    </span>
  </div>
  <div className="flex items-center">
    <i className={`fas fa-${passwordValidation.lowercase ? 'check text-green-600' : 'times text-gray-400'} mr-2`}></i>
    <span className={passwordValidation.lowercase ? 'text-green-600' : 'text-gray-500'}>
      Al menos una letra minúscula
    </span>
  </div>
  <div className="flex items-center">
    <i className={`fas fa-${passwordValidation.number ? 'check text-green-600' : 'times text-gray-400'} mr-2`}></i>
    <span className={passwordValidation.number ? 'text-green-600' : 'text-gray-500'}>
      Al menos un número
    </span>
  </div>
  <div className="flex items-center">
    <i className={`fas fa-${passwordValidation.special ? 'check text-green-600' : 'times text-gray-400'} mr-2`}></i>
    <span className={passwordValidation.special ? 'text-green-600' : 'text-gray-500'}>
      Al menos un carácter especial (!@#$%^&*)
    </span>
  </div>
</div>
```

#### 3.3 Generador de Contraseñas Aleatorias

**Función de Generación:**

```jsx
const generarContraseñaAleatoria = () => {
  const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const minusculas = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const especiales = '!@#$%^&*()';
  
  let contraseña = '';
  
  // Asegurar al menos un carácter de cada tipo
  contraseña += mayusculas[Math.floor(Math.random() * mayusculas.length)];
  contraseña += minusculas[Math.floor(Math.random() * minusculas.length)];
  contraseña += numeros[Math.floor(Math.random() * numeros.length)];
  contraseña += especiales[Math.floor(Math.random() * especiales.length)];
  
  // Completar hasta 12 caracteres
  const todos = mayusculas + minusculas + numeros + especiales;
  for (let i = 4; i < 12; i++) {
    contraseña += todos[Math.floor(Math.random() * todos.length)];
  }
  
  // Mezclar los caracteres
  contraseña = contraseña.split('').sort(() => Math.random() - 0.5).join('');
  
  setFormData(prev => ({ ...prev, Contraseña: contraseña }));
  validatePassword(contraseña);
  toast.success('Contraseña generada exitosamente');
};
```

**Botón en el Modal:**

```jsx
<button
  type="button"
  onClick={generarContraseñaAleatoria}
  className="w-full py-2 px-4 border border-primary-500 text-primary-600 
             rounded-lg hover:bg-primary-50 transition-colors 
             flex items-center justify-center"
>
  <i className="fas fa-random mr-2"></i>
  Generar Contraseña Aleatoria
</button>
```

#### 3.4 Tabla de Usuarios con Búsqueda

**Campo de Búsqueda:**

```jsx
<div className="mb-6">
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <i className="fas fa-search text-gray-400"></i>
    </div>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="Buscar por nombre, correo o tipo de usuario..."
    />
  </div>
</div>
```

**Filtrado de Usuarios:**

```jsx
const usuariosFiltrados = usuarios.filter(usuario => {
  const searchLower = searchTerm.toLowerCase();
  return (
    usuario.Nombre.toLowerCase().includes(searchLower) ||
    usuario.Correo.toLowerCase().includes(searchLower) ||
    usuario.TipoUsuario.toLowerCase().includes(searchLower)
  );
});
```

**Tabla Responsive:**

```jsx
<div className="overflow-x-auto">
  <table className="min-w-full bg-white rounded-lg overflow-hidden">
    <thead className="bg-gradient-to-r from-primary-600 to-primary-500 text-white">
      <tr>
        <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
        <th className="px-6 py-4 text-left text-sm font-semibold">Nombre</th>
        <th className="px-6 py-4 text-left text-sm font-semibold">Correo</th>
        <th className="px-6 py-4 text-left text-sm font-semibold">Tipo</th>
        <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
        <th className="px-6 py-4 text-left text-sm font-semibold">Último Acceso</th>
        <th className="px-6 py-4 text-center text-sm font-semibold">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {usuariosFiltrados.map((usuario, index) => (
        <tr key={usuario.IDUsuario} 
            className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 text-sm text-gray-900">
            {usuario.IDUsuario}
          </td>
          <td className="px-6 py-4 text-sm font-medium text-gray-900">
            {usuario.Nombre}
          </td>
          <td className="px-6 py-4 text-sm text-gray-600">
            {usuario.Correo}
          </td>
          <td className="px-6 py-4">
            <span className={`badge ${getBadgeClass(usuario.TipoUsuario)}`}>
              {usuario.TipoUsuario}
            </span>
          </td>
          <td className="px-6 py-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              usuario.Activo 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {usuario.Activo ? 'Activo' : 'Inactivo'}
            </span>
          </td>
          <td className="px-6 py-4 text-sm text-gray-600">
            {usuario.UltimoAcceso 
              ? new Date(usuario.UltimoAcceso).toLocaleString('es-MX')
              : 'Nunca'
            }
          </td>
          <td className="px-6 py-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => abrirModalEditar(usuario)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg 
                           transition-colors"
                title="Editar"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => confirmarEliminar(usuario)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg 
                           transition-colors"
                title="Eliminar"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Mensaje si no hay resultados */}
{usuariosFiltrados.length === 0 && (
  <div className="text-center py-12">
    <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
    <p className="text-gray-600">No se encontraron usuarios</p>
  </div>
)}
```

#### 3.5 Modal de Crear/Editar Usuario

**Estructura del Modal:**

```jsx
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
                  justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full 
                    max-h-[90vh] overflow-y-auto">
      {/* Header del Modal */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 
                      text-white px-6 py-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            <i className={`fas fa-${editando ? 'edit' : 'plus-circle'} mr-2`}></i>
            {editando ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h2>
          <button
            onClick={cerrarModal}
            className="text-white hover:bg-white/20 rounded-full 
                       p-2 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      {/* Body del Modal - Formulario */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Nombre Completo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre Completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ej: Juan Pérez García"
            required
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Correo Electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="Correo"
            value={formData.Correo}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        {/* Contraseña (solo para crear) */}
        {!editando && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={mostrarPassword ? 'text' : 'password'}
                name="Contraseña"
                value={formData.Contraseña}
                onChange={(e) => {
                  handleChange(e);
                  validatePassword(e.target.value);
                }}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ingrese una contraseña segura"
                required={!editando}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           text-gray-400 hover:text-gray-600"
              >
                <i className={`fas fa-eye${mostrarPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
            
            {/* Indicadores de validación de contraseña */}
            <div className="mt-3 space-y-2 text-sm">
              {/* ... indicadores visuales ... */}
            </div>

            {/* Botón generar contraseña */}
            <button
              type="button"
              onClick={generarContraseñaAleatoria}
              className="w-full mt-3 py-2 px-4 border border-primary-500 
                         text-primary-600 rounded-lg hover:bg-primary-50"
            >
              <i className="fas fa-random mr-2"></i>
              Generar Contraseña Aleatoria
            </button>
          </div>
        )}

        {/* Tipo de Usuario */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Usuario <span className="text-red-500">*</span>
          </label>
          <select
            name="TipoUsuario"
            value={formData.TipoUsuario}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="Director">Director</option>
            <option value="Secretario">Secretario</option>
            <option value="Maestro">Maestro</option>
            <option value="Administrativo">Administrativo</option>
          </select>
        </div>

        {/* Estado Activo (solo para editar) */}
        {editando && (
          <div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="Activo"
                checked={formData.Activo}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  Activo: e.target.checked
                }))}
                className="form-checkbox h-5 w-5 text-primary-600 rounded 
                           focus:ring-2 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Usuario Activo
              </span>
            </label>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={cerrarModal}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 
                       font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando || (!editando && !isPasswordValid())}
            className="flex-1 px-6 py-3 bg-primary-600 text-white 
                       font-semibold rounded-lg hover:bg-primary-700 
                       transition-colors disabled:opacity-50 
                       disabled:cursor-not-allowed"
          >
            {guardando ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Guardando...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <i className={`fas fa-${editando ? 'save' : 'plus'} mr-2`}></i>
                {editando ? 'Guardar Cambios' : 'Crear Usuario'}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
```

#### 3.6 Funciones CRUD del Frontend

**Cargar Usuarios:**

```jsx
const cargarUsuarios = async () => {
  try {
    setLoading(true);
    const response = await usuariosService.getAll();
    
    if (response.success) {
      setUsuarios(response.usuarios);
    } else {
      toast.error('Error al cargar usuarios');
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error al cargar usuarios');
  } finally {
    setLoading(false);
  }
};
```

**Crear Usuario:**

```jsx
const crearUsuario = async () => {
  try {
    setGuardando(true);
    
    const response = await usuariosService.create(formData);
    
    if (response.success) {
      toast.success('Usuario creado exitosamente');
      cerrarModal();
      cargarUsuarios();
    } else {
      toast.error(response.error || 'Error al crear usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error al crear usuario');
  } finally {
    setGuardando(false);
  }
};
```

**Editar Usuario:**

```jsx
const editarUsuario = async () => {
  try {
    setGuardando(true);
    
    const response = await usuariosService.update(formData);
    
    if (response.success) {
      toast.success('Usuario actualizado exitosamente');
      cerrarModal();
      cargarUsuarios();
    } else {
      toast.error(response.error || 'Error al actualizar usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error al actualizar usuario');
  } finally {
    setGuardando(false);
  }
};
```

**Eliminar Usuario:**

```jsx
const eliminarUsuario = async (id) => {
  try {
    const response = await usuariosService.delete(id);
    
    if (response.success) {
      toast.success('Usuario eliminado exitosamente');
      cargarUsuarios();
    } else {
      toast.error(response.error || 'Error al eliminar usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Error al eliminar usuario');
  }
};

const confirmarEliminar = (usuario) => {
  if (window.confirm(`¿Está seguro de eliminar al usuario "${usuario.Nombre}"?`)) {
    eliminarUsuario(usuario.IDUsuario);
  }
};
```

#### 3.7 Endpoints Backend de Usuarios

**1. Listar Usuarios (GET):**

Archivo: `backend/api/usuarios/list.php`

```php
<?php
session_start();

// Verificar autenticación
verificarAutenticacion();

// Verificar permisos
verificarPermisos(['Director', 'Secretario']);

$db = getDBConnection();

try {
    $query = "SELECT IDUsuario, Nombre, Correo, TipoUsuario, 
                     FechaCreacion, UltimoAcceso, Activo
              FROM Usuarios
              ORDER BY IDUsuario DESC";
    
    $stmt = $db->query($query);
    $usuarios = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'usuarios' => $usuarios,
        'total' => count($usuarios)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar usuarios: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener usuarios', HTTP_SERVER_ERROR);
}
?>
```

**2. Crear Usuario (POST):**

Archivo: `backend/api/usuarios/create.php`

```php
<?php
session_start();

// Verificar autenticación y permisos
verificarAutenticacion();
verificarPermisos(['Director', 'Secretario']);

// Validar método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método no permitido', HTTP_METHOD_NOT_ALLOWED);
}

$data = getJSONInput();

// Validar campos requeridos
$required = ['Nombre', 'Correo', 'Contraseña', 'TipoUsuario'];
$validation = validateRequired($data, $required);

if ($validation !== true) {
    sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
}

$db = getDBConnection();

try {
    // Verificar que el correo no exista
    $checkQuery = "SELECT COUNT(*) as total FROM Usuarios WHERE Correo = :correo";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':correo', $data['Correo']);
    $checkStmt->execute();
    
    if ($checkStmt->fetch()['total'] > 0) {
        sendError('El correo electrónico ya está registrado', HTTP_BAD_REQUEST);
    }
    
    // Validar contraseña segura
    if (!validarContraseñaSegura($data['Contraseña'])) {
        sendError('La contraseña no cumple con los requisitos de seguridad', HTTP_BAD_REQUEST);
    }
    
    // Hash de la contraseña
    $contraseñaHash = password_hash($data['Contraseña'], PASSWORD_DEFAULT);
    
    // Insertar usuario
    $query = "INSERT INTO Usuarios (Nombre, Correo, Contrasena, TipoUsuario, Activo) 
              VALUES (:nombre, :correo, :contrasena, :tipoUsuario, 1)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nombre', $data['Nombre']);
    $stmt->bindParam(':correo', $data['Correo']);
    $stmt->bindParam(':contrasena', $contraseñaHash);
    $stmt->bindParam(':tipoUsuario', $data['TipoUsuario']);
    
    $stmt->execute();
    
    $nuevoId = $db->lastInsertId();
    
    logMessage("Usuario creado: {$data['Nombre']} (ID: $nuevoId)", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Usuario creado exitosamente',
        'id' => $nuevoId
    ], HTTP_CREATED);
    
} catch (PDOException $e) {
    logMessage("Error al crear usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error al crear usuario', HTTP_SERVER_ERROR);
}

// Función helper para validar contraseña segura
function validarContraseñaSegura($password) {
    // Mínimo 8 caracteres
    if (strlen($password) < 8) return false;
    
    // Al menos una mayúscula
    if (!preg_match('/[A-Z]/', $password)) return false;
    
    // Al menos una minúscula
    if (!preg_match('/[a-z]/', $password)) return false;
    
    // Al menos un número
    if (!preg_match('/[0-9]/', $password)) return false;
    
    // Al menos un carácter especial
    if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password)) return false;
    
    return true;
}
?>
```

**3. Actualizar Usuario (POST):**

Archivo: `backend/api/usuarios/update.php`

```php
<?php
session_start();

// Verificar autenticación y permisos
verificarAutenticacion();
verificarPermisos(['Director', 'Secretario']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método no permitido', HTTP_METHOD_NOT_ALLOWED);
}

$data = getJSONInput();

// Validar campos requeridos
$required = ['IDUsuario', 'Nombre', 'Correo', 'TipoUsuario'];
$validation = validateRequired($data, $required);

if ($validation !== true) {
    sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
}

$db = getDBConnection();

try {
    // Verificar que el usuario existe
    $checkQuery = "SELECT COUNT(*) as total FROM Usuarios WHERE IDUsuario = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $data['IDUsuario'], PDO::PARAM_INT);
    $checkStmt->execute();
    
    if ($checkStmt->fetch()['total'] == 0) {
        sendError('Usuario no encontrado', HTTP_NOT_FOUND);
    }
    
    // Verificar que el correo no esté en uso por otro usuario
    $checkEmailQuery = "SELECT COUNT(*) as total FROM Usuarios 
                        WHERE Correo = :correo AND IDUsuario != :id";
    $checkEmailStmt = $db->prepare($checkEmailQuery);
    $checkEmailStmt->bindParam(':correo', $data['Correo']);
    $checkEmailStmt->bindParam(':id', $data['IDUsuario'], PDO::PARAM_INT);
    $checkEmailStmt->execute();
    
    if ($checkEmailStmt->fetch()['total'] > 0) {
        sendError('El correo electrónico ya está en uso', HTTP_BAD_REQUEST);
    }
    
    // Actualizar usuario
    $activo = isset($data['Activo']) ? ($data['Activo'] ? 1 : 0) : 1;
    
    $query = "UPDATE Usuarios 
              SET Nombre = :nombre,
                  Correo = :correo,
                  TipoUsuario = :tipoUsuario,
                  Activo = :activo
              WHERE IDUsuario = :id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nombre', $data['Nombre']);
    $stmt->bindParam(':correo', $data['Correo']);
    $stmt->bindParam(':tipoUsuario', $data['TipoUsuario']);
    $stmt->bindParam(':activo', $activo, PDO::PARAM_INT);
    $stmt->bindParam(':id', $data['IDUsuario'], PDO::PARAM_INT);
    
    $stmt->execute();
    
    logMessage("Usuario actualizado: {$data['Nombre']} (ID: {$data['IDUsuario']})", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Usuario actualizado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al actualizar usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error al actualizar usuario', HTTP_SERVER_ERROR);
}
?>
```

**4. Eliminar Usuario (POST):**

Archivo: `backend/api/usuarios/delete.php`

```php
<?php
session_start();

// Verificar autenticación y permisos
verificarAutenticacion();
verificarPermisos(['Director']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método no permitido', HTTP_METHOD_NOT_ALLOWED);
}

$data = getJSONInput();

if (!isset($data['IDUsuario']) || !is_numeric($data['IDUsuario'])) {
    sendError('ID de usuario inválido', HTTP_BAD_REQUEST);
}

$idUsuario = (int) $data['IDUsuario'];

// Evitar que el usuario se elimine a sí mismo
if ($idUsuario == $_SESSION['user_id']) {
    sendError('No puede eliminar su propio usuario', HTTP_BAD_REQUEST);
}

$db = getDBConnection();

try {
    // Verificar que el usuario existe
    $checkQuery = "SELECT Nombre FROM Usuarios WHERE IDUsuario = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);
    $checkStmt->execute();
    
    $usuario = $checkStmt->fetch();
    
    if (!$usuario) {
        sendError('Usuario no encontrado', HTTP_NOT_FOUND);
    }
    
    // Eliminar usuario
    $query = "DELETE FROM Usuarios WHERE IDUsuario = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);
    $stmt->execute();
    
    logMessage("Usuario eliminado: {$usuario['Nombre']} (ID: $idUsuario)", 'WARNING');
    
    sendResponse([
        'success' => true,
        'message' => 'Usuario eliminado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al eliminar usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error al eliminar usuario', HTTP_SERVER_ERROR);
}
?>
```

---

## CONCLUSIÓN DEL DOCUMENTO PUNTO 1

Este documento ha detallado exhaustivamente las **primeras 3 pantallas principales** del sistema:

1. **Login** - Autenticación con diseño split-screen y recuperación de contraseña
2. **Dashboard** - Panel personalizado por rol con 4 variantes diferentes
3. **Usuarios** - CRUD completo con validación de contraseñas seguras

Cada pantalla ha sido documentada con:
- Descripción visual detallada
- Código frontend completo (React + Tailwind CSS)
- Código backend completo (PHP + PDO)
- Flujos de datos
- Medidas de seguridad implementadas
- Validaciones frontend y backend
- Manejo de errores y feedback al usuario

**Las pantallas restantes (Maestros, Alumnos, Aulas, Materias, Materiales, Préstamos, Calificaciones) siguen patrones similares de desarrollo y serán documentadas en las siguientes secciones si se requiere.**

---

**Documento elaborado por:** Equipo de Desarrollo - Sistema Telesecundaria  
**Fecha:** Octubre 2025  
**Versión:** 1.0  
**Páginas:** 1 de 7 (Primera parte del punto 1)

