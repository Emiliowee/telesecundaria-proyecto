<?php
/**
 * API de Materiales - Listar todos
 * GET /api/materiales/list.php
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
    if (!hasPermission($_SESSION['user_type'], 'materiales')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Obtener todos los materiales
    $query = "SELECT IDMaterial, Nombre, CantidadDisponible, Descripcion 
              FROM Materiales 
              ORDER BY Nombre";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $materiales = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'materiales' => $materiales,
        'total' => count($materiales)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar materiales: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener materiales', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al listar materiales: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





