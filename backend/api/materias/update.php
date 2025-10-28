<?php
/**
 * API de Materias - Actualizar existente
 * POST /api/materias/update.php
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
    
    // Validar campos requeridos
    $required = ['IDMateria', 'Nombre'];
    
    $validation = validateRequired($data, $required);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    // Sanitizar datos
    $idMateria = (int) $data['IDMateria'];
    $nombre = sanitizeString($data['Nombre']);
    
    // Validaciones
    if (empty($nombre)) {
        sendError('El nombre de la materia es requerido', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que la materia exista
    $checkQuery = "SELECT COUNT(*) as count FROM Materias WHERE IDMateria = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $idMateria, PDO::PARAM_INT);
    $checkStmt->execute();
    $result = $checkStmt->fetch();
    
    if ($result['count'] == 0) {
        sendError('Materia no encontrada', HTTP_NOT_FOUND);
    }
    
    // Verificar si el nuevo nombre ya existe en otra materia
    $checkNombreQuery = "SELECT COUNT(*) as count FROM Materias WHERE Nombre = :nombre AND IDMateria != :id";
    $checkNombreStmt = $db->prepare($checkNombreQuery);
    $checkNombreStmt->bindParam(':nombre', $nombre);
    $checkNombreStmt->bindParam(':id', $idMateria, PDO::PARAM_INT);
    $checkNombreStmt->execute();
    $resultNombre = $checkNombreStmt->fetch();
    
    if ($resultNombre['count'] > 0) {
        sendError('Ya existe otra materia con ese nombre', HTTP_BAD_REQUEST);
    }
    
    // Actualizar materia
    $query = "UPDATE Materias SET Nombre = :nombre WHERE IDMateria = :idMateria";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':idMateria', $idMateria, PDO::PARAM_INT);
    
    if (!$stmt->execute()) {
        $errorInfo = $stmt->errorInfo();
        logMessage("Error SQL al actualizar materia: " . json_encode($errorInfo), 'ERROR');
        sendError('Error en la base de datos: ' . $errorInfo[2], HTTP_SERVER_ERROR);
    }
    
    logMessage("Materia actualizada - ID: $idMateria", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Materia actualizada exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al actualizar materia: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al actualizar materia: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





