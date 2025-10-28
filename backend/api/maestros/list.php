<?php
/**
 * API de Maestros - Listar todos
 * GET /api/maestros/list.php
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
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Obtener todos los maestros con información del aula
    $query = "SELECT m.IdMaestro, m.Nombre, m.Apellidos, m.Telefono, m.Correo, 
              m.Horario, m.IdAula, a.Capacidad as AulaCapacidad,
              DATE_FORMAT(m.FechaRegistro, '%d/%m/%Y') as FechaRegistro
              FROM Maestros m
              LEFT JOIN Aulas a ON m.IdAula = a.IDAula
              ORDER BY m.Apellidos, m.Nombre";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $maestros = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'maestros' => $maestros,
        'total' => count($maestros)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar maestros: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener maestros', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al listar maestros: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





