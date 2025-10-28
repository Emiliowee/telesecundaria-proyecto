<?php
/**
 * API de Alumnos - Actualizar existente
 * POST /api/alumnos/update.php
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
    
    // Validar campos requeridos
    $required = ['Matricula', 'Nombre', 'ApellidoPaterno', 'ApellidoMaterno', 
                 'Edad', 'Semestre', 'Grado', 'Correo', 'Telefono',
                 'NombreTutor', 'TelefonoTutor', 'CorreoTutor', 'IdAula'];
    
    $validation = validateRequired($data, $required);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    // Sanitizar datos
    $matricula = sanitizeString($data['Matricula']);
    $nombre = sanitizeString($data['Nombre']);
    $apellidoPaterno = sanitizeString($data['ApellidoPaterno']);
    $apellidoMaterno = sanitizeString($data['ApellidoMaterno']);
    $edad = (int) $data['Edad'];
    $semestre = (int) $data['Semestre'];
    $grado = (int) $data['Grado'];
    $correo = sanitizeString($data['Correo']);
    $telefono = sanitizeString($data['Telefono']);
    $nombreTutor = sanitizeString($data['NombreTutor']);
    $telefonoTutor = sanitizeString($data['TelefonoTutor']);
    $correoTutor = sanitizeString($data['CorreoTutor']);
    $idAula = (int) $data['IdAula'];
    
    // Validaciones
    if (!validateEmail($correo)) {
        sendError('Correo del alumno inválido', HTTP_BAD_REQUEST);
    }
    
    if (!validateEmail($correoTutor)) {
        sendError('Correo del tutor inválido', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el alumno exista
    $checkQuery = "SELECT COUNT(*) as count FROM Alumnos WHERE Matricula = :matricula";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':matricula', $matricula);
    $checkStmt->execute();
    $result = $checkStmt->fetch();
    
    if ($result['count'] == 0) {
        sendError('Alumno no encontrado', HTTP_NOT_FOUND);
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
    
    // Actualizar alumno
    $query = "UPDATE Alumnos 
              SET Nombre = :nombre, 
                  ApellidoPaterno = :apellidoPaterno,
                  ApellidoMaterno = :apellidoMaterno,
                  Edad = :edad,
                  Semestre = :semestre,
                  Grado = :grado,
                  Correo = :correo,
                  Telefono = :telefono,
                  NombreTutor = :nombreTutor,
                  TelefonoTutor = :telefonoTutor,
                  CorreoTutor = :correoTutor,
                  IdAula = :idAula
              WHERE Matricula = :matricula";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':apellidoPaterno', $apellidoPaterno);
    $stmt->bindParam(':apellidoMaterno', $apellidoMaterno);
    $stmt->bindParam(':edad', $edad, PDO::PARAM_INT);
    $stmt->bindParam(':semestre', $semestre, PDO::PARAM_INT);
    $stmt->bindParam(':grado', $grado, PDO::PARAM_INT);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':nombreTutor', $nombreTutor);
    $stmt->bindParam(':telefonoTutor', $telefonoTutor);
    $stmt->bindParam(':correoTutor', $correoTutor);
    $stmt->bindParam(':idAula', $idAula, PDO::PARAM_INT);
    $stmt->bindParam(':matricula', $matricula);
    
    if (!$stmt->execute()) {
        $errorInfo = $stmt->errorInfo();
        logMessage("Error SQL al actualizar alumno: " . json_encode($errorInfo), 'ERROR');
        sendError('Error en la base de datos: ' . $errorInfo[2], HTTP_SERVER_ERROR);
    }
    
    logMessage("Alumno actualizado - Matrícula: $matricula", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Alumno actualizado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al actualizar alumno: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al actualizar alumno: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>
