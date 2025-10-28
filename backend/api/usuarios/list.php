<?php
/**
 * API de Usuarios - Listar todos
 * GET /api/usuarios/list.php
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

// Solo permitir GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
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
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Obtener todos los usuarios
    $query = "SELECT IDUsuario, Nombre, Correo, TipoUsuario, Activo, 
              DATE_FORMAT(FechaCreacion, '%d/%m/%Y') as FechaCreacion,
              DATE_FORMAT(UltimoAcceso, '%d/%m/%Y %H:%i') as UltimoAcceso
              FROM Usuarios 
              ORDER BY IDUsuario DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $usuarios = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'usuarios' => $usuarios,
        'total' => count($usuarios)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar usuarios: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener usuarios', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al listar usuarios: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





