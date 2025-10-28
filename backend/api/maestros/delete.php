<?php
/**
 * API de Maestros - Eliminar
 * POST /api/maestros/delete.php
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
    if (!hasPermission($_SESSION['user_type'], 'maestros')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar ID
    if (!isset($data['id']) || empty($data['id'])) {
        sendError('ID de maestro requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $data['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el maestro exista
    $checkQuery = "SELECT CONCAT(Nombre, ' ', Apellidos) as NombreCompleto 
                   FROM Maestros 
                   WHERE IdMaestro = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    $maestro = $checkStmt->fetch();
    
    if (!$maestro) {
        sendError('Maestro no encontrado', HTTP_NOT_FOUND);
    }
    
    // Eliminar maestro (las relaciones MaestroMateria se eliminan en cascada)
    $query = "DELETE FROM Maestros WHERE IdMaestro = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    logMessage("Maestro eliminado - ID: $id, Nombre: {$maestro['NombreCompleto']}", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Maestro eliminado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al eliminar maestro: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al eliminar maestro: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





