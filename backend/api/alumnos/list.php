<?php
/**
 * API de Alumnos - Listar todos
 * GET /api/alumnos/list.php
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
    
    // Verificar permisos (Maestro puede ver lista para calificaciones)
    $userType = $_SESSION['user_type'];
    if (!hasPermission($userType, 'alumnos') && $userType !== 'Maestro') {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Obtener todos los alumnos con información del aula
    $query = "SELECT a.Matricula, a.Nombre, a.ApellidoPaterno, a.ApellidoMaterno, 
              a.Edad, a.Semestre, a.Grado, a.Correo, a.Telefono,
              a.NombreTutor, a.TelefonoTutor, a.CorreoTutor,
              a.IdAula, au.Capacidad as AulaCapacidad,
              DATE_FORMAT(a.FechaRegistro, '%d/%m/%Y') as FechaRegistro
              FROM Alumnos a
              LEFT JOIN Aulas au ON a.IdAula = au.IDAula
              ORDER BY a.ApellidoPaterno, a.ApellidoMaterno, a.Nombre";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $alumnos = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'alumnos' => $alumnos,
        'total' => count($alumnos)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar alumnos: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener alumnos', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al listar alumnos: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>
