<?php
/**
 * API de autenticación - Logout
 * POST /api/auth/logout.php
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

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método no permitido', 405);
}

try {
    // Verificar si hay sesión activa
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        sendResponse([
            'success' => true,
            'message' => 'No hay sesión activa'
        ], HTTP_OK);
    }
    
    // Log del logout
    $userName = $_SESSION['user_name'] ?? 'Desconocido';
    $userId = $_SESSION['user_id'] ?? 0;
    logMessage("Logout - Usuario: $userName (ID: $userId)", 'INFO');
    
    // Destruir sesión
    $_SESSION = [];
    
    // Destruir cookie de sesión
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params["path"],
            $params["domain"],
            $params["secure"],
            $params["httponly"]
        );
    }
    
    // Destruir sesión
    session_destroy();
    
    sendResponse([
        'success' => true,
        'message' => 'Sesión cerrada exitosamente'
    ], HTTP_OK);
    
} catch (Exception $e) {
    logMessage("Error en logout: " . $e->getMessage(), 'ERROR');
    sendError('Error al cerrar sesión', HTTP_SERVER_ERROR);
}

?>


