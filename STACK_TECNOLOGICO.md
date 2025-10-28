# 🛠️ Stack Tecnológico - Sistema de Gestión Escolar Telesecundaria

## 📋 Resumen Ejecutivo

Este documento detalla todas las tecnologías, frameworks, bibliotecas y herramientas utilizadas en el desarrollo del Sistema de Gestión Escolar para Telesecundaria.

**Arquitectura:** Cliente-Servidor (Frontend-Backend separados)  
**Paradigma:** API REST  
**Lenguajes:** JavaScript (ES6+), PHP 8, SQL  
**Total de Frameworks/Librerías:** 15+

---

## 🎨 Frontend

### **Framework Principal: React 18.3**
**Descripción:** Biblioteca de JavaScript para construir interfaces de usuario

**¿Por qué React?**
- ✅ Componentes reutilizables
- ✅ Virtual DOM para rendimiento óptimo
- ✅ Gran ecosistema y comunidad
- ✅ Ideal para aplicaciones SPA (Single Page Application)

**Usado en:**
- Todas las vistas del sistema
- Componentes reutilizables (Login, Dashboard, CRUD modules)

**Documentación:** https://react.dev

---

### **Build Tool: Vite 5.x**
**Descripción:** Herramienta de construcción y servidor de desarrollo ultrarrápido

**¿Por qué Vite?**
- ✅ Hot Module Replacement (HMR) instantáneo
- ✅ Build optimizado con Rollup
- ✅ Configuración mínima
- ✅ Soporte nativo para ES modules

**Usado en:**
- Compilación del proyecto
- Servidor de desarrollo (localhost:5173)
- Optimización de producción

**Documentación:** https://vitejs.dev

---

### **Framework CSS: Tailwind CSS 3.x**
**Descripción:** Framework CSS utility-first para desarrollo rápido

**¿Por qué Tailwind?**
- ✅ Desarrollo rápido sin salir del HTML
- ✅ Diseño consistente y profesional
- ✅ Purga automática de CSS no usado
- ✅ Responsive design fácil

**Usado en:**
- Todo el diseño visual del sistema
- Diseño responsive
- Animaciones y transiciones

**Documentación:** https://tailwindcss.com

**Ejemplo:**
```jsx
<button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4">
  Iniciar Sesión
</button>
```

---

### **Routing: React Router DOM 6.x**
**Descripción:** Librería de enrutamiento para aplicaciones React

**¿Por qué React Router?**
- ✅ Navegación SPA sin recargas
- ✅ Rutas protegidas (Private Routes)
- ✅ Parámetros dinámicos en URL
- ✅ Hooks modernos (useNavigate, useParams)

**Usado en:**
- Navegación entre páginas
- Protección de rutas autenticadas
- Manejo de parámetros (ej: /reset-password?token=xxx)

**Documentación:** https://reactrouter.com

**Ejemplo:**
```jsx
<Route path="/usuarios" element={
  <ProtectedRoute>
    <Usuarios />
  </ProtectedRoute>
} />
```

---

### **HTTP Client: Axios 1.x**
**Descripción:** Cliente HTTP basado en promesas para hacer peticiones

**¿Por qué Axios?**
- ✅ API intuitiva y consistente
- ✅ Interceptors para autenticación
- ✅ Manejo automático de JSON
- ✅ Timeout y cancelación de peticiones

**Usado en:**
- Todas las peticiones al backend
- Interceptors para agregar credenciales
- Manejo centralizado de errores

**Documentación:** https://axios-http.com

**Ejemplo:**
```javascript
export const usuariosService = {
  getAll: async () => {
    const response = await api.get('/usuarios/list.php');
    return response.data;
  }
};
```

---

### **Notificaciones: Sonner**
**Descripción:** Librería de toast notifications elegante y ligera

**¿Por qué Sonner?**
- ✅ Diseño moderno y minimalista
- ✅ Sin configuración compleja
- ✅ Animaciones suaves
- ✅ Soporte para promesas

**Usado en:**
- Notificaciones de éxito/error
- Feedback de operaciones CRUD
- Mensajes de validación

**Documentación:** https://sonner.emilkowal.ski

**Ejemplo:**
```javascript
toast.success('Usuario creado exitosamente');
toast.error('Error al crear usuario');
```

---

### **Iconos: Font Awesome 6.5**
**Descripción:** Biblioteca de iconos vectoriales y CSS

**¿Por qué Font Awesome?**
- ✅ Miles de iconos disponibles
- ✅ Iconos escalables (SVG)
- ✅ Fácil de usar
- ✅ Consistencia visual

**Usado en:**
- Iconos del sidebar
- Iconos de acciones (editar, eliminar)
- Indicadores visuales

**Documentación:** https://fontawesome.com

**Ejemplo:**
```jsx
<i className="fas fa-user"></i>
<i className="fas fa-check text-green-600"></i>
```

---

### **Tipografía: Google Fonts (Poppins)**
**Descripción:** Servicio de fuentes web de Google

**¿Por qué Poppins?**
- ✅ Moderna y profesional
- ✅ Excelente legibilidad
- ✅ Múltiples pesos disponibles
- ✅ Gratuita y optimizada

**Usado en:**
- Toda la tipografía del sistema

**Documentación:** https://fonts.google.com

---

## 🔧 Backend

### **Lenguaje: PHP 8.x**
**Descripción:** Lenguaje de programación del lado del servidor

**¿Por qué PHP?**
- ✅ Fácil de aprender e implementar
- ✅ Amplio soporte de hosting
- ✅ Integración perfecta con MySQL
- ✅ Gran comunidad

**Usado en:**
- Todas las APIs del backend
- Lógica de negocio
- Autenticación y sesiones

**Documentación:** https://www.php.net

---

### **Base de Datos: PDO (PHP Data Objects)**
**Descripción:** Capa de abstracción para acceso a bases de datos en PHP

**¿Por qué PDO?**
- ✅ Prepared statements (previene SQL Injection)
- ✅ Manejo de excepciones
- ✅ Soporte múltiples bases de datos
- ✅ API orientada a objetos

**Usado en:**
- Todas las consultas a la base de datos
- Manejo seguro de parámetros
- Transacciones (ej: préstamos)

**Documentación:** https://www.php.net/manual/en/book.pdo.php

**Ejemplo:**
```php
$stmt = $db->prepare("SELECT * FROM Usuarios WHERE IDUsuario = :id");
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);
```

---

### **Email: PHPMailer 6.x**
**Descripción:** Biblioteca para envío de correos electrónicos desde PHP

**¿Por qué PHPMailer?**
- ✅ SMTP authentication
- ✅ HTML emails
- ✅ Attachments support
- ✅ Manejo de errores robusto

**Usado en:**
- Recuperación de contraseña
- Confirmación de cambio de contraseña
- Emails HTML con plantillas

**Documentación:** https://github.com/PHPMailer/PHPMailer

**Ejemplo:**
```php
$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->send();
```

---

### **Gestión de Dependencias: Composer**
**Descripción:** Gestor de dependencias para PHP

**¿Por qué Composer?**
- ✅ Instalación fácil de paquetes
- ✅ Autoloading automático
- ✅ Manejo de versiones
- ✅ Estándar de la industria

**Usado en:**
- Instalación de PHPMailer
- Autoloading de clases

**Documentación:** https://getcomposer.org

---

## 🗄️ Base de Datos

### **Sistema: MySQL 8.0 / MariaDB 10.x**
**Descripción:** Sistema de gestión de bases de datos relacional

**¿Por qué MySQL?**
- ✅ Open source y gratuito
- ✅ Alto rendimiento
- ✅ ACID compliance
- ✅ Ampliamente soportado

**Usado en:**
- Almacenamiento de todos los datos del sistema
- Relaciones entre entidades
- Constraints e integridad referencial

**Documentación:** https://dev.mysql.com/doc/

---

### **Motor de Base de Datos: InnoDB**
**Descripción:** Motor de almacenamiento transaccional para MySQL

**¿Por qué InnoDB?**
- ✅ Soporte para transacciones (COMMIT/ROLLBACK)
- ✅ Foreign key constraints
- ✅ Row-level locking
- ✅ Crash recovery

**Usado en:**
- Todas las tablas del sistema
- Transacciones en módulo de préstamos

---

## 🛠️ Herramientas de Desarrollo

### **Control de Versiones: Git**
**Descripción:** Sistema de control de versiones distribuido

**¿Por qué Git?**
- ✅ Estándar de la industria
- ✅ Branching y merging eficiente
- ✅ Historial completo
- ✅ Colaboración en equipo

**Usado en:**
- Control de versiones del código
- Colaboración entre developers
- Historial de cambios

**Documentación:** https://git-scm.com

---

### **IDE: Visual Studio Code**
**Descripción:** Editor de código fuente

**¿Por qué VS Code?**
- ✅ Gratuito y open source
- ✅ Extensiones para React, PHP
- ✅ IntelliSense y debugging
- ✅ Terminal integrada

**Usado en:**
- Desarrollo de frontend
- Desarrollo de backend
- Debugging

**Documentación:** https://code.visualstudio.com

---

### **Servidor de Desarrollo: XAMPP**
**Descripción:** Stack de desarrollo con Apache, MySQL, PHP

**¿Por qué XAMPP?**
- ✅ Todo en uno (Apache, MySQL, PHP)
- ✅ Fácil instalación
- ✅ Perfecto para desarrollo local
- ✅ phpMyAdmin incluido

**Usado en:**
- Servidor PHP local (puerto 8000)
- Base de datos MySQL local
- Gestión de BD con phpMyAdmin

**Documentación:** https://www.apachefriends.org

---

### **Testing de APIs: Thunder Client / Postman**
**Descripción:** Cliente HTTP para probar APIs

**¿Por qué Thunder Client?**
- ✅ Integrado en VS Code
- ✅ Liviano y rápido
- ✅ Interfaz intuitiva
- ✅ Colecciones de requests

**Usado en:**
- Testing de endpoints PHP
- Verificación de respuestas JSON
- Debug de APIs

---

### **Gestión de Base de Datos: MySQL Workbench**
**Descripción:** Herramienta visual para diseño y administración de MySQL

**¿Por qué MySQL Workbench?**
- ✅ Diseño visual de diagramas ER
- ✅ Query editor avanzado
- ✅ Import/Export de datos
- ✅ Administración de usuarios

**Usado en:**
- Diseño del esquema de base de datos
- Ejecución de queries complejos
- Backup y restore

**Documentación:** https://www.mysql.com/products/workbench/

---

## 📦 Gestión de Paquetes

### **Frontend: npm (Node Package Manager)**
**Descripción:** Gestor de paquetes de Node.js

**¿Por qué npm?**
- ✅ Registro más grande de paquetes
- ✅ Scripts personalizados
- ✅ Lock file para versiones consistentes
- ✅ Estándar del ecosistema JavaScript

**Usado en:**
- Instalación de dependencias React
- Scripts de build y dev
- Gestión de versiones

**Documentación:** https://www.npmjs.com

---

## 🔐 Seguridad

### **Hashing: password_hash() / password_verify()**
**Descripción:** Funciones nativas de PHP para hashing de contraseñas

**¿Por qué password_hash?**
- ✅ Usa bcrypt (algoritmo seguro)
- ✅ Salt automático
- ✅ Resistente a ataques
- ✅ Nativo de PHP (no requiere librería)

**Usado en:**
- Almacenamiento seguro de contraseñas
- Validación en login
- Recuperación de contraseña

**Ejemplo:**
```php
$hash = password_hash($password, PASSWORD_DEFAULT);
password_verify($password, $hash); // true/false
```

---

### **Validación: Expresiones Regulares (Regex)**
**Descripción:** Patrones para validación de datos

**Usado en:**
- Validación de contraseñas seguras
- Validación de emails
- Sanitización de inputs

**Ejemplo:**
```javascript
/[A-Z]/ // Al menos una mayúscula
/[a-z]/ // Al menos una minúscula
/[!@#$%^&*(),.?":{}|<>]/ // Carácter especial
```

---

### **Sesiones: PHP Sessions**
**Descripción:** Manejo de sesiones de usuario en PHP

**¿Por qué PHP Sessions?**
- ✅ Nativo de PHP
- ✅ Seguro con httponly cookies
- ✅ Fácil de implementar
- ✅ Funciona con CORS

**Usado en:**
- Autenticación de usuarios
- Mantenimiento de estado
- Verificación de permisos

---

## 🌐 Protocolos y Estándares

### **REST API**
**Descripción:** Architectural style para APIs

**Principios aplicados:**
- ✅ Endpoints con verbos HTTP (GET, POST, PUT, DELETE)
- ✅ Respuestas en JSON
- ✅ Códigos de estado HTTP estándar
- ✅ Stateless (sin estado en el servidor)

**Ejemplo:**
```
GET    /api/usuarios/list.php       -> Obtener todos
GET    /api/usuarios/get.php?id=1   -> Obtener uno
POST   /api/usuarios/create.php     -> Crear
POST   /api/usuarios/update.php     -> Actualizar
POST   /api/usuarios/delete.php     -> Eliminar
```

---

### **CORS (Cross-Origin Resource Sharing)**
**Descripción:** Mecanismo para permitir peticiones entre diferentes orígenes

**Configuración:**
```php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
```

**Usado en:**
- Comunicación frontend (5173) ↔ backend (8000)

---

### **JSON (JavaScript Object Notation)**
**Descripción:** Formato de intercambio de datos

**¿Por qué JSON?**
- ✅ Ligero y legible
- ✅ Nativo en JavaScript
- ✅ Fácil de parsear en PHP
- ✅ Estándar para APIs REST

**Ejemplo:**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "id": 10
}
```

---

## 📊 Arquitectura del Sistema

### **Patrón: MVC (Model-View-Controller) Adaptado**

**Model (Backend):**
- Archivos en `/backend/api/`
- Interacción con base de datos (PDO)
- Lógica de negocio

**View (Frontend):**
- Componentes React en `/frontend/src/pages/`
- Interfaces de usuario
- Presentación de datos

**Controller (Backend + Frontend):**
- Endpoints PHP procesan peticiones
- React maneja eventos y estado
- Axios conecta ambos

---

### **Estructura de Carpetas**

```
proyecto-nuevo/
├── backend/
│   ├── api/
│   │   ├── auth/          # Autenticación
│   │   ├── usuarios/      # CRUD Usuarios
│   │   ├── maestros/      # CRUD Maestros
│   │   ├── alumnos/       # CRUD Alumnos
│   │   ├── aulas/         # CRUD Aulas
│   │   ├── materias/      # CRUD Materias
│   │   ├── materiales/    # CRUD Materiales
│   │   ├── prestamos/     # CRUD Préstamos
│   │   ├── calificaciones/# CRUD Calificaciones
│   │   └── dashboard/     # Estadísticas
│   ├── config/
│   │   ├── database.php   # Conexión BD
│   │   ├── constants.php  # Constantes
│   │   ├── cors.php       # CORS config
│   │   └── email.php      # Config email
│   └── utils/
│       └── helpers.php    # Funciones auxiliares
│
├── frontend/
│   ├── public/
│   │   ├── logo-telesecundaria.jpg
│   │   └── background.png
│   └── src/
│       ├── components/    # Componentes React
│       ├── context/       # Context API
│       ├── pages/         # Páginas
│       ├── services/      # API services
│       └── main.jsx       # Entry point
│
└── database/
    └── schema.sql         # Esquema de BD
```

---

## 🎨 Diseño UI/UX

### **Principios Aplicados:**

1. **Diseño Flat (Plano)**
   - Sin sombras excesivas
   - Colores sólidos
   - Bordes simples

2. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: sm, md, lg, xl
   - Grid system de Tailwind

3. **Consistencia Visual**
   - Color primario: Rosa (#ec4899)
   - Color secundario: Verde (#10b981)
   - Tipografía: Poppins

4. **Accesibilidad**
   - Contraste adecuado
   - Labels claros
   - Feedback visual

---

## 📈 Estadísticas del Proyecto

### **Frontend**
- **Componentes React:** ~15
- **Páginas:** 12
- **Rutas:** 13
- **Servicios API:** 8
- **Context Providers:** 1

### **Backend**
- **Endpoints API:** 50+
- **Archivos PHP:** 60+
- **Funciones helper:** 15+

### **Base de Datos**
- **Tablas:** 12
- **Relaciones:** 8
- **Índices:** 20+
- **Foreign Keys:** 10+

---

## 🔄 Flujo de Datos

### **Login Flow:**
```
Usuario → Login.jsx → AuthContext → 
api/auth/login.php → MySQL → 
PHP Session → Response JSON → 
Context Update → Redirect Dashboard
```

### **CRUD Flow (Ejemplo: Usuarios):**
```
User Action → Usuarios.jsx → 
usuariosService.create() → Axios → 
api/usuarios/create.php → 
Validate & Hash → PDO → MySQL → 
Response JSON → Toast Notification → 
Refresh List
```

---

## 📚 Frameworks y Librerías - Lista Completa

### **Frontend (10)**
1. React 18.3
2. Vite 5.x
3. Tailwind CSS 3.x
4. React Router DOM 6.x
5. Axios 1.x
6. Sonner (Toast notifications)
7. Font Awesome 6.5
8. Google Fonts (Poppins)
9. PostCSS
10. Autoprefixer

### **Backend (5)**
11. PHP 8.x
12. PDO (PHP Data Objects)
13. PHPMailer 6.x
14. Composer
15. Apache (XAMPP)

### **Base de Datos (2)**
16. MySQL 8.0 / MariaDB 10.x
17. InnoDB Engine

### **Herramientas (5)**
18. Git
19. Visual Studio Code
20. XAMPP
21. Thunder Client / Postman
22. MySQL Workbench / phpMyAdmin

**Total: 22 Tecnologías/Frameworks/Herramientas**

---

## 🚀 Comandos Útiles

### **Frontend**
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview
```

### **Backend**
```bash
# Iniciar servidor PHP
php -S localhost:8000

# Con XAMPP (ubicarse en carpeta backend)
C:\xampp\php\php.exe -S localhost:8000
```

### **Composer**
```bash
# Instalar dependencias PHP
composer install

# Actualizar dependencias
composer update
```

---

## 📝 Conclusión

El stack tecnológico seleccionado para el Sistema de Gestión Escolar Telesecundaria es:

✅ **Moderno:** React, Tailwind, PHP 8  
✅ **Escalable:** Arquitectura cliente-servidor separada  
✅ **Seguro:** Password hashing, prepared statements, CORS  
✅ **Mantenible:** Código limpio, componentes reutilizables  
✅ **Profesional:** Herramientas estándar de la industria  

Este stack permite un desarrollo ágil, mantenimiento sencillo y alta calidad del producto final.

---

**Elaborado por:** Equipo de Desarrollo - Sistema Telesecundaria  
**Fecha:** Octubre 2025  
**Versión:** 1.0




