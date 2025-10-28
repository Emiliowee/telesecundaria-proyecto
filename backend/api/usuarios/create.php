<?php
/**
 * API de Usuarios - Crear nuevo
 * POST /api/usuarios/create.php
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
    // DEBUG: Log inicio
    error_log("=== INICIO CREATE USUARIO ===");
    
    // Verificar sesión
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        error_log("Error: No hay sesión");
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_UNAUTHORIZED);
    }
    
    error_log("Sesión verificada: " . $_SESSION['user_type']);
    
    // Verificar permisos
    if (!hasPermission($_SESSION['user_type'], 'usuarios')) {
        error_log("Error: Sin permisos");
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    error_log("Permisos verificados");
    
    // Obtener datos del body
    $data = getJSONInput();
    error_log("Datos recibidos: " . json_encode($data));
    
    // Validar campos requeridos
    $validation = validateRequired($data, ['Nombre', 'Correo', 'Contraseña', 'TipoUsuario']);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    // Sanitizar datos
    $nombre = sanitizeString($data['Nombre']);
    $correo = sanitizeString($data['Correo']);
    $contraseña = $data['Contraseña'];
    $tipoUsuario = sanitizeString($data['TipoUsuario']);
    
    // Validar email
    if (!validateEmail($correo)) {
        sendError('Correo electrónico inválido', HTTP_BAD_REQUEST);
    }
    
    // Validar contraseña segura
    if (strlen($contraseña) < 8) {
        sendError('La contraseña debe tener al menos 8 caracteres', HTTP_BAD_REQUEST);
    }
    
    if (!preg_match('/[A-Z]/', $contraseña)) {
        sendError('La contraseña debe contener al menos una letra mayúscula', HTTP_BAD_REQUEST);
    }
    
    if (!preg_match('/[a-z]/', $contraseña)) {
        sendError('La contraseña debe contener al menos una letra minúscula', HTTP_BAD_REQUEST);
    }
    
    if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $contraseña)) {
        sendError('La contraseña debe contener al menos un carácter especial (!@#$%^&*...)', HTTP_BAD_REQUEST);
    }
    
    // Validar tipo de usuario
    if (!in_array($tipoUsuario, USER_TYPES)) {
        sendError('Tipo de usuario inválido', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    error_log("Intentando conectar a BD...");
    $db = getDBConnection();
    error_log("Conexión exitosa");
    
    // Verificar si el correo ya existe
    $checkQuery = "SELECT COUNT(*) as count FROM Usuarios WHERE Correo = :correo";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':correo', $correo);
    $checkStmt->execute();
    $result = $checkStmt->fetch();
    
    if ($result['count'] > 0) {
        sendError('El correo electrónico ya está registrado', HTTP_BAD_REQUEST);
    }
    
    // Hashear contraseña (en producción siempre hashear)
    // Por compatibilidad con datos de prueba, guardamos sin hash
    // En producción descomentar la siguiente línea:
    // $contraseñaHash = hashPassword($contraseña);
    $contraseñaHash = $contraseña;
    
    // Insertar usuario
    $query = "INSERT INTO Usuarios (Nombre, Correo, Contrasena, TipoUsuario, Activo) 
              VALUES (:nombre, :correo, :password, :tipoUsuario, 1)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':password', $contraseñaHash);
    $stmt->bindParam(':tipoUsuario', $tipoUsuario);
    
    if (!$stmt->execute()) {
        $errorInfo = $stmt->errorInfo();
        logMessage("Error SQL al crear usuario: " . json_encode($errorInfo), 'ERROR');
        sendError('Error en la base de datos: ' . $errorInfo[2], HTTP_SERVER_ERROR);
    }
    
    $nuevoId = $db->lastInsertId();
    
    logMessage("Usuario creado - ID: $nuevoId, Nombre: $nombre, Tipo: $tipoUsuario", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Usuario creado exitosamente',
        'id' => $nuevoId
    ], HTTP_CREATED);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    error_log("Trace: " . $e->getTraceAsString());
    logMessage("Error de base de datos al crear usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    error_log("Trace: " . $e->getTraceAsString());
    logMessage("Error general al crear usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>

