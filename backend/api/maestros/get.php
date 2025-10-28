<?php
/**
 * API de Maestros - Obtener uno por ID
 * GET /api/maestros/get.php?id=X
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
    if (!hasPermission($_SESSION['user_type'], 'maestros')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Validar ID
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        sendError('ID de maestro requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $_GET['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar maestro
    $query = "SELECT IdMaestro, Nombre, Apellidos, Telefono, Correo, Horario, IdAula
              FROM Maestros 
              WHERE IdMaestro = :id 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $maestro = $stmt->fetch();
    
    if (!$maestro) {
        sendError('Maestro no encontrado', HTTP_NOT_FOUND);
    }
    
    sendResponse([
        'success' => true,
        'maestro' => $maestro
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al obtener maestro: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener maestro', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al obtener maestro: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





