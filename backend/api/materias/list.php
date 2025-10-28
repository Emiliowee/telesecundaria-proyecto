<?php
/**
 * API de Materias - Listar todas
 * GET /api/materias/list.php
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
    
    // Obtener todas las materias
    $query = "SELECT IDMateria, Nombre FROM Materias ORDER BY Nombre";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $materias = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'materias' => $materias,
        'total' => count($materias)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar materias: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener materias', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al listar materias: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





