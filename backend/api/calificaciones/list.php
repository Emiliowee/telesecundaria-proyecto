<?php
/**
 * API de Calificaciones - Listar todas
 * GET /api/calificaciones/list.php
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
    sendError('Método no permitido', HTTP_METHOD_NOT_ALLOWED);
}

try {
    // Verificar sesión
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_UNAUTHORIZED);
    }
    
    // Verificar permisos
    if (!hasPermission($_SESSION['user_type'], 'calificaciones')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Obtener todas las calificaciones con información del alumno y materia
    $query = "SELECT 
              am.Matricula,
              am.IDMateria,
              am.Calificacion,
              am.PeriodoBimestre,
              CONCAT(a.Nombre, ' ', a.ApellidoPaterno, ' ', a.ApellidoMaterno) as NombreAlumno,
              a.Grado,
              a.Semestre,
              m.Nombre as NombreMateria
              FROM AlumnoMateria am
              INNER JOIN Alumnos a ON am.Matricula = a.Matricula
              INNER JOIN Materias m ON am.IDMateria = m.IDMateria
              ORDER BY a.ApellidoPaterno, a.ApellidoMaterno, a.Nombre, m.Nombre, am.PeriodoBimestre";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $calificaciones = $stmt->fetchAll();
    
    sendResponse([
        'success' => true,
        'calificaciones' => $calificaciones,
        'total' => count($calificaciones)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error al listar calificaciones: " . $e->getMessage());
    sendError('Error al obtener calificaciones', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error general al listar calificaciones: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}
?>





