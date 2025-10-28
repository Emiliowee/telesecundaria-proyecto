<?php
/**
 * API de Materias - Eliminar
 * POST /api/materias/delete.php
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
    if (!hasPermission($_SESSION['user_type'], 'materias')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar ID
    if (!isset($data['id']) || empty($data['id'])) {
        sendError('ID de materia requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $data['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que la materia exista
    $checkQuery = "SELECT Nombre FROM Materias WHERE IDMateria = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    $materia = $checkStmt->fetch();
    
    if (!$materia) {
        sendError('Materia no encontrada', HTTP_NOT_FOUND);
    }
    
    // Verificar que no tenga relaciones con AlumnoMateria
    $checkAlumnosQuery = "SELECT COUNT(*) as count FROM AlumnoMateria WHERE IDMateria = :id";
    $checkAlumnosStmt = $db->prepare($checkAlumnosQuery);
    $checkAlumnosStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkAlumnosStmt->execute();
    $alumnosResult = $checkAlumnosStmt->fetch();
    
    if ($alumnosResult['count'] > 0) {
        sendError('No se puede eliminar la materia porque tiene calificaciones asignadas', HTTP_BAD_REQUEST);
    }
    
    // Verificar que no tenga relaciones con MaestroMateria
    $checkMaestrosQuery = "SELECT COUNT(*) as count FROM MaestroMateria WHERE IDMateria = :id";
    $checkMaestrosStmt = $db->prepare($checkMaestrosQuery);
    $checkMaestrosStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkMaestrosStmt->execute();
    $maestrosResult = $checkMaestrosStmt->fetch();
    
    if ($maestrosResult['count'] > 0) {
        sendError('No se puede eliminar la materia porque tiene maestros asignados', HTTP_BAD_REQUEST);
    }
    
    // Eliminar materia
    $query = "DELETE FROM Materias WHERE IDMateria = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    logMessage("Materia eliminada - ID: $id, Nombre: {$materia['Nombre']}", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Materia eliminada exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al eliminar materia: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al eliminar materia: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





