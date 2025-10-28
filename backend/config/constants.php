<?php
/**
 * Constantes globales del sistema
 * Sistema de Gestión Escolar - Telesecundaria
 */

// Configuración de zona horaria
date_default_timezone_set('America/Mexico_City');

// Configuración de sesiones
define('SESSION_LIFETIME', 1800); // 30 minutos en segundos
define('SESSION_NAME', 'TELESECUNDARIA_SESSION');

// Tipos de usuario permitidos
define('USER_TYPES', [
    'Director',
    'Secretario',
    'Maestro',
    'Administrativo'
]);

// Permisos por tipo de usuario
define('PERMISSIONS', [
    'Director' => ['usuarios', 'maestros'],
    'Secretario' => ['usuarios', 'maestros', 'alumnos', 'aulas', 'materias'],
    'Maestro' => ['calificaciones'],
    'Administrativo' => ['materiales', 'prestamos']
]);

// Mensajes de respuesta
define('MESSAGES', [
    'LOGIN_SUCCESS' => 'Inicio de sesión exitoso',
    'LOGIN_ERROR' => 'Usuario o contraseña incorrectos',
    'SESSION_EXPIRED' => 'Sesión expirada',
    'UNAUTHORIZED' => 'No tiene permisos para realizar esta acción',
    'SERVER_ERROR' => 'Error en el servidor',
    'INVALID_DATA' => 'Datos inválidos',
    'SUCCESS' => 'Operación exitosa',
    'NOT_FOUND' => 'Recurso no encontrado'
]);

// Códigos de estado HTTP
define('HTTP_OK', 200);
define('HTTP_CREATED', 201);
define('HTTP_BAD_REQUEST', 400);
define('HTTP_UNAUTHORIZED', 401);
define('HTTP_FORBIDDEN', 403);
define('HTTP_NOT_FOUND', 404);
define('HTTP_SERVER_ERROR', 500);

// Configuración de la aplicación
define('APP_NAME', 'Sistema de Gestión Escolar');
define('APP_VERSION', '2.0.0');
define('APP_ENV', 'development'); // development | production

// Configuración de logging
define('LOG_ENABLED', true);
define('LOG_FILE', __DIR__ . '/../logs/app.log');

?>

