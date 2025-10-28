<?php
/**
 * API de Aulas - Eliminar
 * POST /api/aulas/delete.php
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
    if (!hasPermission($_SESSION['user_type'], 'aulas')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar ID
    if (!isset($data['id']) || empty($data['id'])) {
        sendError('ID de aula requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $data['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el aula exista
    $checkQuery = "SELECT Nombre FROM Aulas WHERE IDAula = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    $aula = $checkStmt->fetch();
    
    if (!$aula) {
        sendError('Aula no encontrada', HTTP_NOT_FOUND);
    }
    
    // Verificar que no tenga maestros o alumnos asignados
    $checkMaestrosQuery = "SELECT COUNT(*) as count FROM Maestros WHERE IdAula = :id";
    $checkMaestrosStmt = $db->prepare($checkMaestrosQuery);
    $checkMaestrosStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkMaestrosStmt->execute();
    $maestrosResult = $checkMaestrosStmt->fetch();
    
    if ($maestrosResult['count'] > 0) {
        sendError('No se puede eliminar el aula porque tiene maestros asignados', HTTP_BAD_REQUEST);
    }
    
    $checkAlumnosQuery = "SELECT COUNT(*) as count FROM Alumnos WHERE IdAula = :id";
    $checkAlumnosStmt = $db->prepare($checkAlumnosQuery);
    $checkAlumnosStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkAlumnosStmt->execute();
    $alumnosResult = $checkAlumnosStmt->fetch();
    
    if ($alumnosResult['count'] > 0) {
        sendError('No se puede eliminar el aula porque tiene alumnos asignados', HTTP_BAD_REQUEST);
    }
    
    // Eliminar aula
    $query = "DELETE FROM Aulas WHERE IDAula = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    logMessage("Aula eliminada - ID: $id, Nombre: {$aula['Nombre']}", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Aula eliminada exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al eliminar aula: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al eliminar aula: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





