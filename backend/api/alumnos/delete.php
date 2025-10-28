<?php
/**
 * API de Alumnos - Eliminar
 * POST /api/alumnos/delete.php
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
    if (!hasPermission($_SESSION['user_type'], 'alumnos')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar Matrícula
    if (!isset($data['matricula']) || empty($data['matricula'])) {
        sendError('Matrícula requerida', HTTP_BAD_REQUEST);
    }
    
    $matricula = sanitizeString($data['matricula']);
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el alumno exista
    $checkQuery = "SELECT CONCAT(Nombre, ' ', ApellidoPaterno, ' ', ApellidoMaterno) as NombreCompleto 
                   FROM Alumnos 
                   WHERE Matricula = :matricula";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':matricula', $matricula);
    $checkStmt->execute();
    $alumno = $checkStmt->fetch();
    
    if (!$alumno) {
        sendError('Alumno no encontrado', HTTP_NOT_FOUND);
    }
    
    // Eliminar alumno (las relaciones AlumnoMateria y Prestamo se eliminan en cascada)
    $query = "DELETE FROM Alumnos WHERE Matricula = :matricula";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':matricula', $matricula);
    $stmt->execute();
    
    logMessage("Alumno eliminado - Matrícula: $matricula, Nombre: {$alumno['NombreCompleto']}", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Alumno eliminado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al eliminar alumno: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al eliminar alumno: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>
