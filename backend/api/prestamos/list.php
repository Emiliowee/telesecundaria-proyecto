<?php
/**
 * API de Préstamos - Listar todos
 * GET /api/prestamos/list.php
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
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Obtener todos los préstamos con información del alumno
    $query = "SELECT p.IDPrestamo, p.Matricula, p.FechaPrestamo, p.FechaDevolucion,
              CONCAT(a.Nombre, ' ', a.ApellidoPaterno, ' ', a.ApellidoMaterno) as NombreAlumno,
              DATE_FORMAT(p.FechaPrestamo, '%d/%m/%Y') as FechaPrestamoFormato,
              DATE_FORMAT(p.FechaDevolucion, '%d/%m/%Y') as FechaDevolucionFormato
              FROM Prestamo p
              INNER JOIN Alumnos a ON p.Matricula = a.Matricula
              ORDER BY p.FechaPrestamo DESC";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $prestamos = $stmt->fetchAll();
    
    // Para cada préstamo, obtener sus detalles (materiales)
    foreach ($prestamos as &$prestamo) {
        $queryDetalles = "SELECT dp.IDDetalle, dp.IDMaterial, dp.Cantidad,
                          m.Nombre as NombreMaterial,
                          m.CantidadDisponible
                          FROM DetallePrestamo dp
                          INNER JOIN Materiales m ON dp.IDMaterial = m.IDMaterial
                          WHERE dp.IDPrestamo = :idPrestamo";
        
        $stmtDetalles = $db->prepare($queryDetalles);
        $stmtDetalles->bindParam(':idPrestamo', $prestamo['IDPrestamo'], PDO::PARAM_INT);
        $stmtDetalles->execute();
        
        $prestamo['materiales'] = $stmtDetalles->fetchAll();
    }
    
    sendResponse([
        'success' => true,
        'prestamos' => $prestamos,
        'total' => count($prestamos)
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al listar préstamos: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener préstamos', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al listar préstamos: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>

