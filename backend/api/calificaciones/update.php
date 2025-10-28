<?php
/**
 * API de Calificaciones - Actualizar calificación existente
 * POST /api/calificaciones/update.php
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
    
    // Verificar permisos
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
    
    // Verificar que existe la calificación
    $stmtExiste = $db->prepare("
        SELECT Matricula FROM AlumnoMateria 
        WHERE Matricula = ? AND IDMateria = ? AND PeriodoBimestre = ?
    ");
    $stmtExiste->execute([$matricula, $idMateria, $periodoBimestre]);
    if (!$stmtExiste->fetch()) {
        sendError('Calificación no encontrada', HTTP_NOT_FOUND);
    }
    
    // Actualizar calificación
    $stmt = $db->prepare("
        UPDATE AlumnoMateria 
        SET Calificacion = ?
        WHERE Matricula = ? AND IDMateria = ? AND PeriodoBimestre = ?
    ");
    
    $stmt->execute([
        $calificacion,
        $matricula,
        $idMateria,
        $periodoBimestre
    ]);
    
    sendResponse([
        'success' => true,
        'message' => 'Calificación actualizada exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error de BD en calificaciones/update: " . $e->getMessage());
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error en calificaciones/update: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_BAD_REQUEST);
}
?>





