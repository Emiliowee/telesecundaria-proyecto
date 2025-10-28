<?php
/**
 * API de Préstamos - Obtener uno por ID
 * GET /api/prestamos/get.php?id=X
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
    
    // Validar ID
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        sendError('ID de préstamo requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $_GET['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar préstamo
    $query = "SELECT p.IDPrestamo, p.Matricula, p.FechaPrestamo, p.FechaDevolucion,
              CONCAT(a.Nombre, ' ', a.ApellidoPaterno, ' ', a.ApellidoMaterno) as NombreAlumno
              FROM Prestamo p
              INNER JOIN Alumnos a ON p.Matricula = a.Matricula
              WHERE p.IDPrestamo = :id 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $prestamo = $stmt->fetch();
    
    if (!$prestamo) {
        sendError('Préstamo no encontrado', HTTP_NOT_FOUND);
    }
    
    // Obtener detalles del préstamo
    $queryDetalles = "SELECT dp.IDDetalle, dp.IDMaterial, dp.Cantidad,
                      m.Nombre as NombreMaterial
                      FROM DetallePrestamo dp
                      INNER JOIN Materiales m ON dp.IDMaterial = m.IDMaterial
                      WHERE dp.IDPrestamo = :idPrestamo";
    
    $stmtDetalles = $db->prepare($queryDetalles);
    $stmtDetalles->bindParam(':idPrestamo', $id, PDO::PARAM_INT);
    $stmtDetalles->execute();
    
    $prestamo['materiales'] = $stmtDetalles->fetchAll();
    
    sendResponse([
        'success' => true,
        'prestamo' => $prestamo
    ], HTTP_OK);
    
} catch (PDOException $e) {
    logMessage("Error al obtener préstamo: " . $e->getMessage(), 'ERROR');
    sendError('Error al obtener préstamo', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    logMessage("Error general al obtener préstamo: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





