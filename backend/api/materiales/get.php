<?php
/**
 * API de Materiales - Obtener uno por ID
 * GET /api/materiales/get.php?id=X
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
    
    // Validar ID
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        sendError('ID de material requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $_GET['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar material
    $query = "SELECT IDMaterial, Nombre, CantidadDisponible, Descripcion 
              FROM Materiales 
              WHERE IDMaterial = :id 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $material = $stmt->fetch();
    
    if (!$material) {
        sendError('Material no encontrado', HTTP_NOT_FOUND);
    }
    
    sendResponse([
        'success' => true,
        'material' => $material
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al obtener material: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener material', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al obtener material: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





