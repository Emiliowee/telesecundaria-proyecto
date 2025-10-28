<?php
/**
 * API de autenticación - Login
 * POST /api/auth/login.php
 */

// Iniciar sesión
if (session_status() === PHP_SESSION_NONE) {
    session_name('TELESECUNDARIA_SESSION');
    session_start();
}

// Incluir archivos necesarios
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/constants.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../utils/helpers.php';

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método no permitido', 405);
}

try {
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar campos requeridos
    $validation = validateRequired($data, ['IDUsuario', 'contraseña']);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    $idUsuario = (int) $data['IDUsuario'];
    $contraseña = $data['contraseña'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar usuario
    $query = "SELECT IDUsuario, Nombre, Correo, Contrasena, TipoUsuario, Activo 
              FROM Usuarios 
              WHERE IDUsuario = :id 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);
    $stmt->execute();
    
    $usuario = $stmt->fetch();
    
    // Verificar si existe el usuario
    if (!$usuario) {
        logMessage("Intento de login fallido - Usuario no existe: $idUsuario", 'WARNING');
        sendError(MESSAGES['LOGIN_ERROR'], HTTP_UNAUTHORIZED);
    }
    
    // Verificar si el usuario está activo
    if (!$usuario['Activo']) {
        logMessage("Intento de login - Usuario inactivo: $idUsuario", 'WARNING');
        sendError('Usuario inactivo. Contacte al administrador', HTTP_FORBIDDEN);
    }
    
    // Verificar contraseña
    if (!verifyPassword($contraseña, $usuario['Contrasena'])) {
        logMessage("Intento de login fallido - Contraseña incorrecta: $idUsuario", 'WARNING');
        sendError(MESSAGES['LOGIN_ERROR'], HTTP_UNAUTHORIZED);
    }
    
    // Actualizar último acceso
    $updateQuery = "UPDATE Usuarios SET UltimoAcceso = NOW() WHERE IDUsuario = :id";
    $updateStmt = $db->prepare($updateQuery);
    $updateStmt->bindParam(':id', $idUsuario, PDO::PARAM_INT);
    $updateStmt->execute();
    
    // Crear sesión
    $_SESSION['user_id'] = $usuario['IDUsuario'];
    $_SESSION['user_name'] = $usuario['Nombre'];
    $_SESSION['user_email'] = $usuario['Correo'];
    $_SESSION['user_type'] = $usuario['TipoUsuario'];
    $_SESSION['logged_in'] = true;
    $_SESSION['login_time'] = time();
    
    // Regenerar ID de sesión por seguridad
    session_regenerate_id(true);
    
    // Log exitoso
    logMessage("Login exitoso - Usuario: {$usuario['Nombre']} (ID: $idUsuario)", 'INFO');
    
    // Preparar respuesta
    $response = [
        'success' => true,
        'message' => MESSAGES['LOGIN_SUCCESS'],
        'user' => [
            'id' => $usuario['IDUsuario'],
            'nombre' => $usuario['Nombre'],
            'correo' => $usuario['Correo'],
            'tipoUsuario' => $usuario['TipoUsuario'],
            'permisos' => PERMISSIONS[$usuario['TipoUsuario']] ?? []
        ],
        'session_id' => session_id()
    ];
    
    sendResponse($response, HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error de base de datos en login: " . $e->getMessage(), 'ERROR');
    sendError('Error al procesar la solicitud', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general en login: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>


