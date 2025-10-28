<?php
/**
 * API de Préstamos - Buscar alumno por matrícula
 * GET /api/prestamos/buscar-alumno.php?matricula=X
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
    if (!hasPermission($_SESSION['user_type'], 'prestamos')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Validar matrícula
    if (!isset($_GET['matricula']) || empty($_GET['matricula'])) {
        sendError('Matrícula requerida', HTTP_BAD_REQUEST);
    }
    
    $matricula = sanitizeString($_GET['matricula']);
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar alumno
    $query = "SELECT Matricula, 
              CONCAT(Nombre, ' ', ApellidoPaterno, ' ', ApellidoMaterno) as NombreCompleto,
              Grado
              FROM Alumnos 
              WHERE Matricula = :matricula 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':matricula', $matricula);
    $stmt->execute();
    
    $alumno = $stmt->fetch();
    
    if (!$alumno) {
        sendError('Alumno no encontrado', HTTP_NOT_FOUND);
    }
    
    sendResponse([
        'success' => true,
        'alumno' => $alumno
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al buscar alumno: " . $e->getMessage(), 'ERROR');
    sendError('Error al buscar alumno', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al buscar alumno: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





