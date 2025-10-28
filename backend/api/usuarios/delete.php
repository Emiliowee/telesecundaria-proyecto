<?php
/**
 * API de Usuarios - Eliminar
 * POST /api/usuarios/delete.php
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

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
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
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar ID
    if (!isset($data['id']) || empty($data['id'])) {
        sendError('ID de usuario requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $data['id'];
    
    // Prevenir que se elimine a sí mismo
    if ($id == $_SESSION['user_id']) {
        sendError('No puede eliminar su propio usuario', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el usuario exista
    $checkQuery = "SELECT Nombre FROM Usuarios WHERE IDUsuario = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    $usuario = $checkStmt->fetch();
    
    if (!$usuario) {
        sendError('Usuario no encontrado', HTTP_NOT_FOUND);
    }
    
    // Eliminar usuario
    $query = "DELETE FROM Usuarios WHERE IDUsuario = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    logMessage("Usuario eliminado - ID: $id, Nombre: {$usuario['Nombre']}", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Usuario eliminado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al eliminar usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error al eliminar usuario', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al eliminar usuario: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





