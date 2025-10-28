<?php
/**
 * API de Materiales - Crear nuevo
 * POST /api/materiales/create.php
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
    if (!hasPermission($_SESSION['user_type'], 'materiales')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar campos requeridos
    $required = ['IDMaterial', 'Nombre', 'CantidadDisponible', 'Descripcion'];
    
    $validation = validateRequired($data, $required);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    // Sanitizar datos
    $idMaterial = (int) $data['IDMaterial'];
    $nombre = sanitizeString($data['Nombre']);
    $cantidadDisponible = (int) $data['CantidadDisponible'];
    $descripcion = sanitizeString($data['Descripcion']);
    
    // Validaciones
    if ($idMaterial <= 0) {
        sendError('ID de material inválido', HTTP_BAD_REQUEST);
    }
    
    if (empty($nombre)) {
        sendError('El nombre del material es requerido', HTTP_BAD_REQUEST);
    }
    
    if ($cantidadDisponible < 0) {
        sendError('La cantidad disponible no puede ser negativa', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar si el ID ya existe
    $checkQuery = "SELECT COUNT(*) as count FROM Materiales WHERE IDMaterial = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $idMaterial, PDO::PARAM_INT);
    $checkStmt->execute();
    $result = $checkStmt->fetch();
    
    if ($result['count'] > 0) {
        sendError('El ID de material ya está registrado', HTTP_BAD_REQUEST);
    }
    
    // Insertar material
    $query = "INSERT INTO Materiales (IDMaterial, Nombre, CantidadDisponible, Descripcion) 
              VALUES (:idMaterial, :nombre, :cantidad, :descripcion)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':idMaterial', $idMaterial, PDO::PARAM_INT);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':cantidad', $cantidadDisponible, PDO::PARAM_INT);
    $stmt->bindParam(':descripcion', $descripcion);
    
    if (!$stmt->execute()) {
        $errorInfo = $stmt->errorInfo();
        logMessage("Error SQL al crear material: " . json_encode($errorInfo), 'ERROR');
        sendError('Error en la base de datos: ' . $errorInfo[2], HTTP_SERVER_ERROR);
    }
    
    logMessage("Material creado - ID: $idMaterial, Nombre: $nombre", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Material registrado exitosamente',
        'id' => $idMaterial
    ], HTTP_CREATED);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al crear material: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al crear material: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





