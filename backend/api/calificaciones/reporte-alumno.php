<?php
/**
 * API de Calificaciones - Generar reporte completo de un alumno
 * GET /api/calificaciones/reporte-alumno.php?matricula=X
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
    
    // Obtener información del alumno
    $stmtAlumno = $db->prepare("
        SELECT 
            a.Matricula,
            a.Nombre,
            a.ApellidoPaterno,
            a.ApellidoMaterno,
            a.Grado,
            a.Semestre,
            a.Edad,
            a.Correo,
            a.Telefono,
            au.IDAula,
            au.Capacidad as AulaCapacidad
        FROM Alumnos a
        LEFT JOIN Aulas au ON a.IdAula = au.IDAula
        WHERE a.Matricula = ?
    ");
    $stmtAlumno->execute([$matricula]);
    $alumno = $stmtAlumno->fetch(PDO::FETCH_ASSOC);
    
    if (!$alumno) {
        sendError('Alumno no encontrado', HTTP_NOT_FOUND);
    }
    
    // Obtener todas las calificaciones del alumno agrupadas por periodo
    $stmtCalificaciones = $db->prepare("
        SELECT 
            am.IDMateria,
            am.Calificacion,
            am.PeriodoBimestre,
            m.Nombre as NombreMateria,
            DATE_FORMAT(am.FechaRegistro, '%d/%m/%Y') as FechaRegistro
        FROM AlumnoMateria am
        INNER JOIN Materias m ON am.IDMateria = m.IDMateria
        WHERE am.Matricula = ?
        ORDER BY am.PeriodoBimestre, m.Nombre
    ");
    $stmtCalificaciones->execute([$matricula]);
    $calificaciones = $stmtCalificaciones->fetchAll(PDO::FETCH_ASSOC);
    
    // Agrupar calificaciones por periodo
    $calificacionesPorPeriodo = [];
    $sumaTotal = 0;
    $totalCalificaciones = 0;
    $calificacionesPorMateria = [];
    
    foreach ($calificaciones as $cal) {
        $periodo = $cal['PeriodoBimestre'];
        $materia = $cal['NombreMateria'];
        
        if (!isset($calificacionesPorPeriodo[$periodo])) {
            $calificacionesPorPeriodo[$periodo] = [];
        }
        
        $calificacionesPorPeriodo[$periodo][] = $cal;
        $sumaTotal += $cal['Calificacion'];
        $totalCalificaciones++;
        
        // Calcular promedio por materia
        if (!isset($calificacionesPorMateria[$materia])) {
            $calificacionesPorMateria[$materia] = [
                'suma' => 0,
                'count' => 0,
                'calificaciones' => []
            ];
        }
        $calificacionesPorMateria[$materia]['suma'] += $cal['Calificacion'];
        $calificacionesPorMateria[$materia]['count']++;
        $calificacionesPorMateria[$materia]['calificaciones'][$periodo] = $cal['Calificacion'];
    }
    
    // Calcular promedios por periodo
    $promediosPorPeriodo = [];
    foreach ($calificacionesPorPeriodo as $periodo => $cals) {
        $suma = array_sum(array_column($cals, 'Calificacion'));
        $count = count($cals);
        $promediosPorPeriodo[$periodo] = $count > 0 ? round($suma / $count, 2) : 0;
    }
    
    // Calcular promedios por materia
    $promediosMateria = [];
    foreach ($calificacionesPorMateria as $materia => $data) {
        $promediosMateria[$materia] = [
            'promedio' => round($data['suma'] / $data['count'], 2),
            'calificaciones' => $data['calificaciones']
        ];
    }
    
    // Calcular promedio general
    $promedioGeneral = $totalCalificaciones > 0 ? round($sumaTotal / $totalCalificaciones, 2) : 0;
    
    // Determinar estatus académico
    $estatusAcademico = 'Excelente';
    if ($promedioGeneral < 60) {
        $estatusAcademico = 'Reprobado';
    } elseif ($promedioGeneral < 70) {
        $estatusAcademico = 'Regular';
    } elseif ($promedioGeneral < 80) {
        $estatusAcademico = 'Bueno';
    } elseif ($promedioGeneral < 90) {
        $estatusAcademico = 'Muy Bueno';
    }
    
    sendResponse([
        'success' => true,
        'alumno' => [
            'Matricula' => $alumno['Matricula'],
            'NombreCompleto' => $alumno['Nombre'] . ' ' . $alumno['ApellidoPaterno'] . ' ' . $alumno['ApellidoMaterno'],
            'Grado' => $alumno['Grado'],
            'Semestre' => $alumno['Semestre'],
            'Edad' => $alumno['Edad'],
            'Correo' => $alumno['Correo'],
            'Telefono' => $alumno['Telefono'],
            'Aula' => $alumno['IDAula'] ?? 'N/A'
        ],
        'calificaciones' => $calificaciones,
        'calificacionesPorPeriodo' => $calificacionesPorPeriodo,
        'promediosPorPeriodo' => $promediosPorPeriodo,
        'promediosMateria' => $promediosMateria,
        'estadisticas' => [
            'promedioGeneral' => $promedioGeneral,
            'totalCalificaciones' => $totalCalificaciones,
            'estatusAcademico' => $estatusAcademico,
            'totalMaterias' => count($calificacionesPorMateria),
            'totalPeriodos' => count($calificacionesPorPeriodo)
        ],
        'fechaGeneracion' => date('d/m/Y H:i:s')
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error al generar reporte: " . $e->getMessage());
    sendError('Error al generar reporte', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error general al generar reporte: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}
?>





