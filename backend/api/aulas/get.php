<?php
/**
 * API de Aulas - Obtener una por ID
 * GET /api/aulas/get.php?id=X
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
    if (!hasPermission($_SESSION['user_type'], 'aulas')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Validar ID
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        sendError('ID de aula requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $_GET['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar aula
    $query = "SELECT IDAula, Capacidad, Nombre FROM Aulas WHERE IDAula = :id LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $aula = $stmt->fetch();
    
    if (!$aula) {
        sendError('Aula no encontrada', HTTP_NOT_FOUND);
    }
    
    sendResponse([
        'success' => true,
        'aula' => $aula
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al obtener aula: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener aula', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al obtener aula: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





