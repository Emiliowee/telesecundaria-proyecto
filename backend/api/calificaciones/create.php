<?php
/**
 * API de Calificaciones - Crear nueva calificación
 * POST /api/calificaciones/create.php
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

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método no permitido', HTTP_METHOD_NOT_ALLOWED);
}

try {
    // Verificar sesión
    if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_UNAUTHORIZED);
    }
    
    // Verificar permisos (solo Director, Secretario, Maestro)
    if (!hasPermission($_SESSION['user_type'], 'calificaciones')) {
        sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
    }
    
    // Obtener datos
    $data = getJSONInput();
    
    // Validar campos requeridos
    $required = ['Matricula', 'IDMateria', 'Calificacion', 'PeriodoBimestre'];
    validateRequired($data, $required);
    
    $matricula = trim($data['Matricula']);
    $idMateria = (int)$data['IDMateria'];
    $calificacion = (int)$data['Calificacion'];
    $periodoBimestre = trim($data['PeriodoBimestre']);
    
    // Validar calificación (0-100)
    if ($calificacion < 0 || $calificacion > 100) {
        sendError('La calificación debe estar entre 0 y 100', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Verificar que el alumno existe
    $stmtAlumno = $db->prepare("SELECT Matricula FROM Alumnos WHERE Matricula = ?");
    $stmtAlumno->execute([$matricula]);
    if (!$stmtAlumno->fetch()) {
        sendError('El alumno no existe', HTTP_BAD_REQUEST);
    }
    
    // Verificar que la materia existe
    $stmtMateria = $db->prepare("SELECT IDMateria FROM Materias WHERE IDMateria = ?");
    $stmtMateria->execute([$idMateria]);
    if (!$stmtMateria->fetch()) {
        sendError('La materia no existe', HTTP_BAD_REQUEST);
    }
    
    // Verificar si ya existe una calificación para esta combinación
    $stmtExiste = $db->prepare("
        SELECT Matricula FROM AlumnoMateria 
        WHERE Matricula = ? AND IDMateria = ? AND PeriodoBimestre = ?
    ");
    $stmtExiste->execute([$matricula, $idMateria, $periodoBimestre]);
    if ($stmtExiste->fetch()) {
        sendError('Ya existe una calificación para este alumno, materia y periodo', HTTP_CONFLICT);
    }
    
    // Insertar calificación
    $stmt = $db->prepare("
        INSERT INTO AlumnoMateria (Matricula, IDMateria, Calificacion, PeriodoBimestre)
        VALUES (?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $matricula,
        $idMateria,
        $calificacion,
        $periodoBimestre
    ]);
    
    sendResponse([
        'success' => true,
        'message' => 'Calificación registrada exitosamente'
    ], HTTP_CREATED);
    
} catch (PDOException $e) {
    error_log("Error de BD en calificaciones/create: " . $e->getMessage());
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error en calificaciones/create: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_BAD_REQUEST);
}
?>





