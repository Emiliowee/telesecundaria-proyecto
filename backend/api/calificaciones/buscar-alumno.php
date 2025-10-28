<?php
/**
 * API de Calificaciones - Buscar calificaciones de un alumno
 * GET /api/calificaciones/buscar-alumno.php?matricula=X
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
    
    // Validar matrícula
    if (!isset($_GET['matricula']) || empty($_GET['matricula'])) {
        sendError('Matrícula requerida', HTTP_BAD_REQUEST);
    }
    
    $matricula = trim($_GET['matricula']);
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar alumno
    $stmtAlumno = $db->prepare("
        SELECT Matricula, Nombre, ApellidoPaterno, ApellidoMaterno, Grado, Semestre
        FROM Alumnos 
        WHERE Matricula = ?
    ");
    $stmtAlumno->execute([$matricula]);
    $alumno = $stmtAlumno->fetch();
    
    if (!$alumno) {
        sendError('Alumno no encontrado', HTTP_NOT_FOUND);
    }
    
    // Obtener calificaciones del alumno
    $stmtCalificaciones = $db->prepare("
        SELECT 
            am.IDMateria,
            am.Calificacion,
            am.PeriodoBimestre,
            m.Nombre as NombreMateria
        FROM AlumnoMateria am
        INNER JOIN Materias m ON am.IDMateria = m.IDMateria
        WHERE am.Matricula = ?
        ORDER BY m.Nombre, am.PeriodoBimestre
    ");
    $stmtCalificaciones->execute([$matricula]);
    $calificaciones = $stmtCalificaciones->fetchAll();
    
    // Calcular promedio general
    $promedio = 0;
    if (count($calificaciones) > 0) {
        $suma = array_sum(array_column($calificaciones, 'Calificacion'));
        $promedio = round($suma / count($calificaciones), 2);
    }
    
    sendResponse([
        'success' => true,
        'alumno' => [
            'Matricula' => $alumno['Matricula'],
            'NombreCompleto' => $alumno['Nombre'] . ' ' . $alumno['ApellidoPaterno'] . ' ' . $alumno['ApellidoMaterno'],
            'Grado' => $alumno['Grado'],
            'Semestre' => $alumno['Semestre']
        ],
        'calificaciones' => $calificaciones,
        'promedio' => $promedio,
        'total' => count($calificaciones)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error al buscar calificaciones del alumno: " . $e->getMessage());
    sendError('Error al buscar calificaciones', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error general al buscar calificaciones: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}
?>





