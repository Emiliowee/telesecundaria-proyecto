<?php
/**
 * API de autenticación - Verificar sesión
 * GET /api/auth/session.php
 */

// Iniciar sesión
if (session_status() === PHP_SESSION_NONE) {
    session_name('TELESECUNDARIA_SESSION');
    session_start();
}

// Incluir archivos necesarios
require_once __DIR__ . '/../../config/constants.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../utils/helpers.php';

// Solo permitir GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Método no permitido', 405);
}

try {
    // Verificar si hay sesión activa
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        sendResponse([
            'success' => false,
            'authenticated' => false,
            'message' => 'No hay sesión activa'
        ], HTTP_UNAUTHORIZED);
    }
    
    // Verificar tiempo de inactividad
    $currentTime = time();
    $loginTime = $_SESSION['login_time'] ?? 0;
    $sessionLifetime = SESSION_LIFETIME;
    
    if (($currentTime - $loginTime) > $sessionLifetime) {
        // Sesión expirada
        session_destroy();
        sendResponse([
            'success' => false,
            'authenticated' => false,
            'message' => MESSAGES['SESSION_EXPIRED']
        ], HTTP_UNAUTHORIZED);
    }
    
    // Actualizar tiempo de login (renovar sesión)
    $_SESSION['login_time'] = $currentTime;
    
    // Respuesta con datos de sesión
    $response = [
        'success' => true,
        'authenticated' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'nombre' => $_SESSION['user_name'],
            'correo' => $_SESSION['user_email'],
            'tipoUsuario' => $_SESSION['user_type'],
            'permisos' => PERMISSIONS[$_SESSION['user_type']] ?? []
        ],
        'session' => [
            'id' => session_id(),
            'loginTime' => date('Y-m-d H:i:s', $loginTime),
            'expiresIn' => $sessionLifetime - ($currentTime - $loginTime)
        ]
    ];
    
    sendResponse($response, HTTP_OK);
    
} catch (Exception $e) {
    logMessage("Error al verificar sesión: " . $e->getMessage(), 'ERROR');
    sendError('Error al verificar sesión', HTTP_SERVER_ERROR);
}

?>


