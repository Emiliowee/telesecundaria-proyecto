<?php
/**
 * API de Calificaciones - Reporte general de todos los alumnos
 * GET /api/calificaciones/reporte-general.php
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
    
    // Obtener todos los alumnos con sus promedios
    $query = "
        SELECT 
            a.Matricula,
            CONCAT(a.Nombre, ' ', a.ApellidoPaterno, ' ', a.ApellidoMaterno) as NombreCompleto,
            a.Grado,
            a.Semestre,
            COUNT(am.Calificacion) as TotalCalificaciones,
            ROUND(AVG(am.Calificacion), 2) as PromedioGeneral,
            MIN(am.Calificacion) as CalificacionMinima,
            MAX(am.Calificacion) as CalificacionMaxima
        FROM Alumnos a
        LEFT JOIN AlumnoMateria am ON a.Matricula = am.Matricula
        GROUP BY a.Matricula, a.Nombre, a.ApellidoPaterno, a.ApellidoMaterno, a.Grado, a.Semestre
        HAVING TotalCalificaciones > 0
        ORDER BY a.Grado, a.ApellidoPaterno, a.ApellidoMaterno, a.Nombre
    ";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $alumnos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Calcular estadísticas generales
    $totalAlumnos = count($alumnos);
    $promedios = array_column($alumnos, 'PromedioGeneral');
    $promedioInstitucional = $totalAlumnos > 0 ? round(array_sum($promedios) / $totalAlumnos, 2) : 0;
    
    // Contar alumnos por rango de calificación
    $rangos = [
        'Excelente (90-100)' => 0,
        'Muy Bueno (80-89)' => 0,
        'Bueno (70-79)' => 0,
        'Regular (60-69)' => 0,
        'Reprobado (0-59)' => 0
    ];
    
    foreach ($alumnos as &$alumno) {
        $promedio = $alumno['PromedioGeneral'];
        
        // Agregar estatus
        if ($promedio >= 90) {
            $alumno['Estatus'] = 'Excelente';
            $rangos['Excelente (90-100)']++;
        } elseif ($promedio >= 80) {
            $alumno['Estatus'] = 'Muy Bueno';
            $rangos['Muy Bueno (80-89)']++;
        } elseif ($promedio >= 70) {
            $alumno['Estatus'] = 'Bueno';
            $rangos['Bueno (70-79)']++;
        } elseif ($promedio >= 60) {
            $alumno['Estatus'] = 'Regular';
            $rangos['Regular (60-69)']++;
        } else {
            $alumno['Estatus'] = 'Reprobado';
            $rangos['Reprobado (0-59)']++;
        }
    }
    
    sendResponse([
        'success' => true,
        'alumnos' => $alumnos,
        'estadisticas' => [
            'totalAlumnos' => $totalAlumnos,
            'promedioInstitucional' => $promedioInstitucional,
            'distribucionRangos' => $rangos
        ],
        'fechaGeneracion' => date('d/m/Y H:i:s')
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error al generar reporte general: " . $e->getMessage());
    sendError('Error al generar reporte', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error general al generar reporte: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}
?>





