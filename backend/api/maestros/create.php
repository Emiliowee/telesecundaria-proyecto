<?php
/**
 * API de Maestros - Crear nuevo
 * POST /api/maestros/create.php
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
    
    // Validar campos requeridos
    $required = ['IdMaestro', 'Nombre', 'Apellidos', 'Telefono', 'Correo', 'Horario', 'IdAula'];
    
    $validation = validateRequired($data, $required);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    // Sanitizar datos
    $idMaestro = (int) $data['IdMaestro'];
    $nombre = sanitizeString($data['Nombre']);
    $apellidos = sanitizeString($data['Apellidos']);
    $telefono = sanitizeString($data['Telefono']);
    $correo = sanitizeString($data['Correo']);
    $horario = sanitizeString($data['Horario']);
    $idAula = (int) $data['IdAula'];
    
    // Validaciones
    if ($idMaestro <= 0) {
        sendError('ID de maestro inválido', HTTP_BAD_REQUEST);
    }
    
    if (!validateEmail($correo)) {
        sendError('Correo electrónico inválido', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar si el ID ya existe
    $checkQuery = "SELECT COUNT(*) as count FROM Maestros WHERE IdMaestro = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $idMaestro, PDO::PARAM_INT);
    $checkStmt->execute();
    $result = $checkStmt->fetch();
    
    if ($result['count'] > 0) {
        sendError('El ID de maestro ya está registrado', HTTP_BAD_REQUEST);
    }
    
    // Verificar que el aula exista
    $checkAulaQuery = "SELECT COUNT(*) as count FROM Aulas WHERE IDAula = :idAula";
    $checkAulaStmt = $db->prepare($checkAulaQuery);
    $checkAulaStmt->bindParam(':idAula', $idAula, PDO::PARAM_INT);
    $checkAulaStmt->execute();
    $aulaResult = $checkAulaStmt->fetch();
    
    if ($aulaResult['count'] == 0) {
        sendError('El aula especificada no existe', HTTP_BAD_REQUEST);
    }
    
    // Insertar maestro
    $query = "INSERT INTO Maestros 
              (IdMaestro, Nombre, Apellidos, Telefono, Correo, Horario, IdAula) 
              VALUES 
              (:idMaestro, :nombre, :apellidos, :telefono, :correo, :horario, :idAula)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':idMaestro', $idMaestro, PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':apellidos', $apellidos);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':horario', $horario);
    $stmt->bindParam(':idAula', $idAula, PDO::PARAM_INT);
    
    if (!$stmt->execute()) {
        $errorInfo = $stmt->errorInfo();
        logMessage("Error SQL al crear maestro: " . json_encode($errorInfo), 'ERROR');
        sendError('Error en la base de datos: ' . $errorInfo[2], HTTP_SERVER_ERROR);
    }
    
    logMessage("Maestro creado - ID: $idMaestro, Nombre: $nombre $apellidos", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Maestro registrado exitosamente',
        'id' => $idMaestro
    ], HTTP_CREATED);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al crear maestro: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al crear maestro: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





