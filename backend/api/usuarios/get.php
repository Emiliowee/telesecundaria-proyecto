<?php
/**
 * API de Usuarios - Obtener uno por ID
 * GET /api/usuarios/get.php?id=X
 */

// Iniciar sesión
if (session_status() === PHP_SESSION_NONE) {
    session_name('TELESECUNDARIA_SESSION');
    session_start();
}

// Incluir archivos necesarios
require_once '../../config/database.php';
require_once '../../config/constants.php';
require_once '../../config/cors.php';
require_once '../../utils/helpers.php';

// Solo permitir GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Método no permitido', 405);
}

try {
    // Verificar sesión
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_UNAUTHORIZED);
    }
    
    // Verificar permisos
    if (!hasPermission($_SESSION['user_type'], 'usuarios')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Validar ID
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        sendError('ID de usuario requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $_GET['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar usuario
    $query = "SELECT IDUsuario, Nombre, Correo, TipoUsuario, Activo
              FROM Usuarios 
              WHERE IDUsuario = :id 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $usuario = $stmt->fetch();
    
    if (!$usuario) {
        sendError('Usuario no encontrado', HTTP_NOT_FOUND);
    }
    
    sendResponse([
        'success' => true,
        'usuario' => $usuario
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al obtener usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener usuario', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al obtener usuario: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





