<?php
/**
 * Configuración de CORS (Cross-Origin Resource Sharing)
 * Permite que el frontend (React) se comunique con el backend (PHP)
 */

// Permitir peticiones desde el frontend y scripts de prueba
// En producción, cambiar a un dominio específico
$allowedOrigins = [
    'http://localhost:5173',  // React frontend
    'http://localhost:8000',  // Scripts de prueba PHP
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8000'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Para desarrollo, permitir cualquier origen de localhost
    if (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false) {
        header("Access-Control-Allow-Origin: $origin");
    }
}

// Métodos HTTP permitidos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Headers permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Permitir cookies y credenciales
header("Access-Control-Allow-Credentials: true");

// Cache de preflight request por 1 hora
header("Access-Control-Max-Age: 3600");

// Manejar preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
