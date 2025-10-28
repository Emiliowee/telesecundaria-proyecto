<?php
/**
 * API de Préstamos - Eliminar (devolver)
 * POST /api/prestamos/delete.php
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
    
    // Obtener datos del body
    $data = getJSONInput();
    
    // Validar ID
    if (!isset($data['id']) || empty($data['id'])) {
        sendError('ID de préstamo requerido', HTTP_BAD_REQUEST);
    }
    
    $id = (int) $data['id'];
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Iniciar transacción
    $db->beginTransaction();
    
    try {
        // Verificar que el préstamo exista
        $checkQuery = "SELECT Matricula FROM Prestamo WHERE IDPrestamo = :id";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
        $checkStmt->execute();
        $prestamo = $checkStmt->fetch();
        
        if (!$prestamo) {
            throw new Exception('Préstamo no encontrado');
        }
        
        // Obtener detalles del préstamo para devolver el stock
        $queryDetalles = "SELECT IDMaterial, Cantidad FROM DetallePrestamo WHERE IDPrestamo = :id";
        $stmtDetalles = $db->prepare($queryDetalles);
        $stmtDetalles->bindParam(':id', $id, PDO::PARAM_INT);
        $stmtDetalles->execute();
        $detalles = $stmtDetalles->fetchAll();
        
        // Devolver stock de cada material
        foreach ($detalles as $detalle) {
            $updateStockQuery = "UPDATE Materiales 
                                SET CantidadDisponible = CantidadDisponible + :cantidad 
                                WHERE IDMaterial = :idMaterial";
            
            $stmtUpdateStock = $db->prepare($updateStockQuery);
            $stmtUpdateStock->bindParam(':cantidad', $detalle['Cantidad'], PDO::PARAM_INT);
            $stmtUpdateStock->bindParam(':idMaterial', $detalle['IDMaterial'], PDO::PARAM_INT);
            
            if (!$stmtUpdateStock->execute()) {
                throw new Exception("Error al devolver el stock del material ID {$detalle['IDMaterial']}");
            }
        }
        
        // Eliminar detalles del préstamo
        $queryDeleteDetalles = "DELETE FROM DetallePrestamo WHERE IDPrestamo = :id";
        $stmtDeleteDetalles = $db->prepare($queryDeleteDetalles);
        $stmtDeleteDetalles->bindParam(':id', $id, PDO::PARAM_INT);
        
        if (!$stmtDeleteDetalles->execute()) {
            throw new Exception('Error al eliminar los detalles del préstamo');
        }
        
        // Eliminar préstamo
        $query = "DELETE FROM Prestamo WHERE IDPrestamo = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        
        if (!$stmt->execute()) {
            throw new Exception('Error al eliminar el préstamo');
        }
        
        // Confirmar transacción
        $db->commit();
        
        logMessage("Préstamo eliminado/devuelto - ID: $id, Matrícula: {$prestamo['Matricula']}", 'INFO');
        
        sendResponse([
            'success' => true,
            'message' => 'Préstamo eliminado y materiales devueltos al stock'
        ], HTTP_OK);
        
    } catch (Exception $e) {
        // Revertir transacción en caso de error
        $db->rollBack();
        throw $e;
    }
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al eliminar préstamo: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al eliminar préstamo: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>





