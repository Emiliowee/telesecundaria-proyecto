<?php
/**
 * API de Aulas - Crear nueva
 * POST /api/aulas/create.php
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
    
    // Validar campos requeridos
    $required = ['IDAula', 'Capacidad', 'Nombre'];
    
    $validation = validateRequired($data, $required);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    // Sanitizar datos
    $idAula = (int) $data['IDAula'];
    $capacidad = (int) $data['Capacidad'];
    $nombre = sanitizeString($data['Nombre']);
    
    // Validaciones
    if ($idAula <= 0) {
        sendError('ID de aula inválido', HTTP_BAD_REQUEST);
    }
    
    if ($capacidad <= 0 || $capacidad > 100) {
        sendError('Capacidad inválida (debe ser entre 1 y 100)', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar si el ID ya existe
    $checkQuery = "SELECT COUNT(*) as count FROM Aulas WHERE IDAula = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $idAula, PDO::PARAM_INT);
    $checkStmt->execute();
    $result = $checkStmt->fetch();
    
    if ($result['count'] > 0) {
        sendError('El ID de aula ya está registrado', HTTP_BAD_REQUEST);
    }
    
    // Insertar aula
    $query = "INSERT INTO Aulas (IDAula, Capacidad, Nombre) VALUES (:idAula, :capacidad, :nombre)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':idAula', $idAula, PDO::PARAM_INT);
    $stmt->bindParam(':capacidad', $capacidad, PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $nombre);
    
    if (!$stmt->execute()) {
        $errorInfo = $stmt->errorInfo();
        logMessage("Error SQL al crear aula: " . json_encode($errorInfo), 'ERROR');
        sendError('Error en la base de datos: ' . $errorInfo[2], HTTP_SERVER_ERROR);
    }
    
    logMessage("Aula creada - ID: $idAula, Nombre: $nombre", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Aula registrada exitosamente',
        'id' => $idAula
    ], HTTP_CREATED);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al crear aula: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al crear aula: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





