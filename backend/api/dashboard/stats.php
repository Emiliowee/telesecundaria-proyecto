<?php
/**
 * API de Dashboard - Estadísticas según rol del usuario
 * GET /api/dashboard/stats.php
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
    
    $userType = $_SESSION['user_type'];
    $db = getDBConnection();
    
    $stats = [];
    
    // Estadísticas según el tipo de usuario
    switch ($userType) {
        case 'Director':
            // Total de usuarios
            $stmtUsuarios = $db->query("SELECT COUNT(*) as total FROM Usuarios WHERE Activo = 1");
            $stats['totalUsuarios'] = $stmtUsuarios->fetch()['total'];
            
            // Total de maestros
            $stmtMaestros = $db->query("SELECT COUNT(*) as total FROM Maestros");
            $stats['totalMaestros'] = $stmtMaestros->fetch()['total'];
            
            // Usuarios por tipo
            $stmtTipos = $db->query("SELECT TipoUsuario, COUNT(*) as total FROM Usuarios WHERE Activo = 1 GROUP BY TipoUsuario");
            $stats['usuariosPorTipo'] = $stmtTipos->fetchAll();
            
            break;
            
        case 'Secretario':
            // Total de alumnos
            $stmtAlumnos = $db->query("SELECT COUNT(*) as total FROM Alumnos");
            $stats['totalAlumnos'] = $stmtAlumnos->fetch()['total'];
            
            // Total de maestros
            $stmtMaestros = $db->query("SELECT COUNT(*) as total FROM Maestros");
            $stats['totalMaestros'] = $stmtMaestros->fetch()['total'];
            
            // Total de aulas
            $stmtAulas = $db->query("SELECT COUNT(*) as total FROM Aulas");
            $stats['totalAulas'] = $stmtAulas->fetch()['total'];
            
            // Total de materias
            $stmtMaterias = $db->query("SELECT COUNT(*) as total FROM Materias");
            $stats['totalMaterias'] = $stmtMaterias->fetch()['total'];
            
            // Total de usuarios
            $stmtUsuarios = $db->query("SELECT COUNT(*) as total FROM Usuarios WHERE Activo = 1");
            $stats['totalUsuarios'] = $stmtUsuarios->fetch()['total'];
            
            // Alumnos por grado
            $stmtGrados = $db->query("SELECT Grado, COUNT(*) as total FROM Alumnos GROUP BY Grado ORDER BY Grado");
            $stats['alumnosPorGrado'] = $stmtGrados->fetchAll();
            
            break;
            
        case 'Maestro':
            // Total de calificaciones registradas
            $stmtCalificaciones = $db->query("SELECT COUNT(*) as total FROM AlumnoMateria");
            $stats['totalCalificaciones'] = $stmtCalificaciones->fetch()['total'];
            
            // Total de alumnos con calificaciones
            $stmtAlumnosConCal = $db->query("SELECT COUNT(DISTINCT Matricula) as total FROM AlumnoMateria");
            $stats['alumnosConCalificaciones'] = $stmtAlumnosConCal->fetch()['total'];
            
            // Total de materias
            $stmtMaterias = $db->query("SELECT COUNT(*) as total FROM Materias");
            $stats['totalMaterias'] = $stmtMaterias->fetch()['total'];
            
            // Promedio general de la institución
            $stmtPromedio = $db->query("SELECT ROUND(AVG(Calificacion), 2) as promedio FROM AlumnoMateria");
            $stats['promedioGeneral'] = $stmtPromedio->fetch()['promedio'] ?? 0;
            
            // Calificaciones por periodo
            $stmtPeriodos = $db->query("
                SELECT PeriodoBimestre, COUNT(*) as total 
                FROM AlumnoMateria 
                GROUP BY PeriodoBimestre 
                ORDER BY PeriodoBimestre
            ");
            $stats['calificacionesPorPeriodo'] = $stmtPeriodos->fetchAll();
            
            // Rango de calificaciones
            $stmtRangos = $db->query("
                SELECT 
                    SUM(CASE WHEN Calificacion >= 90 THEN 1 ELSE 0 END) as excelente,
                    SUM(CASE WHEN Calificacion >= 80 AND Calificacion < 90 THEN 1 ELSE 0 END) as muyBueno,
                    SUM(CASE WHEN Calificacion >= 70 AND Calificacion < 80 THEN 1 ELSE 0 END) as bueno,
                    SUM(CASE WHEN Calificacion >= 60 AND Calificacion < 70 THEN 1 ELSE 0 END) as regular,
                    SUM(CASE WHEN Calificacion < 60 THEN 1 ELSE 0 END) as reprobado
                FROM AlumnoMateria
            ");
            $stats['distribucionCalificaciones'] = $stmtRangos->fetch();
            
            break;
            
        case 'Administrativo':
            // Total de materiales
            $stmtMateriales = $db->query("SELECT COUNT(*) as total FROM Materiales");
            $stats['totalMateriales'] = $stmtMateriales->fetch()['total'];
            
            // Materiales con stock bajo (menos de 5)
            $stmtStockBajo = $db->query("SELECT COUNT(*) as total FROM Materiales WHERE CantidadDisponible < 5");
            $stats['materialesStockBajo'] = $stmtStockBajo->fetch()['total'];
            
            // Total de préstamos activos
            $stmtPrestamos = $db->query("SELECT COUNT(*) as total FROM Prestamo");
            $stats['totalPrestamos'] = $stmtPrestamos->fetch()['total'];
            
            // Total de materiales en stock
            $stmtTotalStock = $db->query("SELECT SUM(CantidadDisponible) as total FROM Materiales");
            $stats['totalStock'] = $stmtTotalStock->fetch()['total'] ?? 0;
            
            // Materiales más prestados
            $stmtMasPrestados = $db->query("
                SELECT m.Nombre, SUM(dp.Cantidad) as totalPrestado
                FROM DetallePrestamo dp
                INNER JOIN Materiales m ON dp.IDMaterial = m.IDMaterial
                GROUP BY m.Nombre
                ORDER BY totalPrestado DESC
                LIMIT 5
            ");
            $stats['materialesMasPrestados'] = $stmtMasPrestados->fetchAll();
            
            break;
    }
    
    sendResponse([
        'success' => true,
        'userType' => $userType,
        'stats' => $stats,
        'timestamp' => date('Y-m-d H:i:s')
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error al obtener estadísticas: " . $e->getMessage());
    sendError('Error al obtener estadísticas', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error general al obtener estadísticas: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}
?>





