<?php
/**
 * API de Usuarios - Actualizar existente
 * POST /api/usuarios/update.php
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
    if (!hasPermission($_SESSION['user_type'], 'usuarios')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar campos requeridos
    $validation = validateRequired($data, ['IDUsuario', 'Nombre', 'Correo', 'TipoUsuario']);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    $id = (int) $data['IDUsuario'];
    $nombre = sanitizeString($data['Nombre']);
    $correo = sanitizeString($data['Correo']);
    $tipoUsuario = sanitizeString($data['TipoUsuario']);
    
    // Validar email
    if (!validateEmail($correo)) {
        sendError('Correo electrónico inválido', HTTP_BAD_REQUEST);
    }
    
    // Validar tipo de usuario
    if (!in_array($tipoUsuario, USER_TYPES)) {
        sendError('Tipo de usuario inválido', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el usuario exista
    $checkQuery = "SELECT COUNT(*) as count FROM Usuarios WHERE IDUsuario = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    $result = $checkStmt->fetch();
    
    if ($result['count'] == 0) {
        sendError('Usuario no encontrado', HTTP_NOT_FOUND);
    }
    
    // Verificar si el correo ya existe en otro usuario
    $checkEmailQuery = "SELECT COUNT(*) as count FROM Usuarios 
                       WHERE Correo = :correo AND IDUsuario != :id";
    $checkEmailStmt = $db->prepare($checkEmailQuery);
    $checkEmailStmt->bindParam(':correo', $correo);
    $checkEmailStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkEmailStmt->execute();
    $emailResult = $checkEmailStmt->fetch();
    
    if ($emailResult['count'] > 0) {
        sendError('El correo electrónico ya está registrado por otro usuario', HTTP_BAD_REQUEST);
    }
    
    // Validar contraseña si se está cambiando
    if (isset($data['Contraseña']) && !empty($data['Contraseña'])) {
        $contraseña = $data['Contraseña'];
        
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
    }
    
    // Construir query de actualización
    if (isset($data['Contraseña']) && !empty($data['Contraseña'])) {
        // Actualizar con contraseña
        // En producción hashear: $contraseñaHash = hashPassword($data['Contraseña']);
        $contraseñaHash = $data['Contraseña'];
        
        $query = "UPDATE Usuarios 
                  SET Nombre = :nombre, 
                      Correo = :correo, 
                      Contrasena = :contrasena,
                      TipoUsuario = :tipoUsuario 
                  WHERE IDUsuario = :id";
        
        $stmt = $db->prepare($query);
        $stmt->bindParam(':contrasena', $contraseñaHash);
    } else {
        // Actualizar sin cambiar contraseña
        $query = "UPDATE Usuarios 
                  SET Nombre = :nombre, 
                      Correo = :correo, 
                      TipoUsuario = :tipoUsuario 
                  WHERE IDUsuario = :id";
        
        $stmt = $db->prepare($query);
    }
    
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':tipoUsuario', $tipoUsuario);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    
    $stmt->execute();
    
    logMessage("Usuario actualizado - ID: $id, Nombre: $nombre", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Usuario actualizado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al actualizar usuario: " . $e->getMessage(), 'ERROR');
    sendError('Error al actualizar usuario', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al actualizar usuario: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>


