<?php
/**
 * API de Calificaciones - Eliminar calificación
 * POST /api/calificaciones/delete.php
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
    $required = ['Matricula', 'IDMateria', 'PeriodoBimestre'];
    validateRequired($data, $required);
    
    $matricula = trim($data['Matricula']);
    $idMateria = (int)$data['IDMateria'];
    $periodoBimestre = trim($data['PeriodoBimestre']);
    
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
    
    // Eliminar calificación
    $stmt = $db->prepare("
        DELETE FROM AlumnoMateria 
        WHERE Matricula = ? AND IDMateria = ? AND PeriodoBimestre = ?
    ");
    
    $stmt->execute([
        $matricula,
        $idMateria,
        $periodoBimestre
    ]);
    
    sendResponse([
        'success' => true,
        'message' => 'Calificación eliminada exitosamente'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error de BD en calificaciones/delete: " . $e->getMessage());
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error en calificaciones/delete: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_BAD_REQUEST);
}
?>





