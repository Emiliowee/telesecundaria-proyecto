<?php
/**
 * API de Aulas - Listar todas (para selects)
 * GET /api/aulas/list.php
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
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Obtener todas las aulas
    $query = "SELECT IDAula, Capacidad, Nombre FROM Aulas ORDER BY IDAula";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $aulas = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'aulas' => $aulas
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar aulas: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener aulas', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al listar aulas: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





