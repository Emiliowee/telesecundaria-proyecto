<?php
/**
 * API de Materiales - Eliminar
 * POST /api/materiales/delete.php
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
    
    // Validar ID
    if (!isset($data['id']) || empty($data['id'])) {
        sendError('ID de material requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $data['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el material exista
    $checkQuery = "SELECT Nombre FROM Materiales WHERE IDMaterial = :id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkStmt->execute();
    $material = $checkStmt->fetch();
    
    if (!$material) {
        sendError('Material no encontrado', HTTP_NOT_FOUND);
    }
    
    // Verificar que no tenga préstamos activos
    $checkPrestamosQuery = "SELECT COUNT(*) as count FROM DetallePrestamo WHERE IDMaterial = :id";
    $checkPrestamosStmt = $db->prepare($checkPrestamosQuery);
    $checkPrestamosStmt->bindParam(':id', $id, PDO::PARAM_INT);
    $checkPrestamosStmt->execute();
    $prestamosResult = $checkPrestamosStmt->fetch();
    
    if ($prestamosResult['count'] > 0) {
        sendError('No se puede eliminar el material porque tiene préstamos registrados', HTTP_BAD_REQUEST);
    }
    
    // Eliminar material
    $query = "DELETE FROM Materiales WHERE IDMaterial = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    logMessage("Material eliminado - ID: $id, Nombre: {$material['Nombre']}", 'INFO');
    
    sendResponse([
        'success' => true,
        'message' => 'Material eliminado exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al eliminar material: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al eliminar material: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), HTTP_SERVER_ERROR);
}

?>





