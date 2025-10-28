<?php
/**
 * API de Préstamos - Crear nuevo
 * POST /api/prestamos/create.php
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
    
    // Validar campos requeridos (excepto materiales que es array)
    $required = ['Matricula', 'FechaPrestamo', 'FechaDevolucion'];
    
    $validation = validateRequired($data, $required);
    if ($validation !== true) {
        sendError('Datos incompletos', HTTP_BAD_REQUEST, $validation);
    }
    
    // Validar que materiales exista y sea array
    if (!isset($data['materiales']) || !is_array($data['materiales']) || count($data['materiales']) === 0) {
        sendError('Debe agregar al menos un material', HTTP_BAD_REQUEST);
    }
    
    // Sanitizar datos
    $matricula = sanitizeString($data['Matricula']);
    $fechaPrestamo = sanitizeString($data['FechaPrestamo']);
    $fechaDevolucion = sanitizeString($data['FechaDevolucion']);
    $materiales = $data['materiales'];
    
    // Validaciones
    if (empty($matricula)) {
        sendError('Matrícula inválida', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Iniciar transacción
    $db->beginTransaction();
    
    try {
        // Verificar que el alumno exista
        $checkAlumnoQuery = "SELECT COUNT(*) as count FROM Alumnos WHERE Matricula = :matricula";
        $checkAlumnoStmt = $db->prepare($checkAlumnoQuery);
        $checkAlumnoStmt->bindParam(':matricula', $matricula);
        $checkAlumnoStmt->execute();
        $alumnoResult = $checkAlumnoStmt->fetch();
        
        if ($alumnoResult['count'] == 0) {
            throw new Exception('El alumno no existe');
        }
        
        // Insertar préstamo
        $queryPrestamo = "INSERT INTO Prestamo (Matricula, FechaPrestamo, FechaDevolucion) 
                          VALUES (:matricula, :fechaPrestamo, :fechaDevolucion)";
        
        $stmtPrestamo = $db->prepare($queryPrestamo);
        $stmtPrestamo->bindParam(':matricula', $matricula);
        $stmtPrestamo->bindParam(':fechaPrestamo', $fechaPrestamo);
        $stmtPrestamo->bindParam(':fechaDevolucion', $fechaDevolucion);
        
        if (!$stmtPrestamo->execute()) {
            throw new Exception('Error al crear el préstamo');
        }
        
        $idPrestamo = $db->lastInsertId();
        
        // Insertar detalles del préstamo y actualizar stock
        foreach ($materiales as $material) {
            $idMaterial = (int) $material['IDMaterial'];
            $cantidad = (int) $material['Cantidad'];
            
            if ($cantidad <= 0) {
                throw new Exception("La cantidad para el material ID $idMaterial debe ser mayor a 0");
            }
            
            // Verificar stock disponible
            $checkStockQuery = "SELECT CantidadDisponible FROM Materiales WHERE IDMaterial = :idMaterial";
            $checkStockStmt = $db->prepare($checkStockQuery);
            $checkStockStmt->bindParam(':idMaterial', $idMaterial, PDO::PARAM_INT);
            $checkStockStmt->execute();
            $stockResult = $checkStockStmt->fetch();
            
            if (!$stockResult) {
                throw new Exception("El material ID $idMaterial no existe");
            }
            
            if ($stockResult['CantidadDisponible'] < $cantidad) {
                throw new Exception("No hay suficiente stock del material ID $idMaterial. Disponible: {$stockResult['CantidadDisponible']}");
            }
            
            // Insertar detalle
            $queryDetalle = "INSERT INTO DetallePrestamo (IDPrestamo, IDMaterial, Cantidad) 
                            VALUES (:idPrestamo, :idMaterial, :cantidad)";
            
            $stmtDetalle = $db->prepare($queryDetalle);
            $stmtDetalle->bindParam(':idPrestamo', $idPrestamo, PDO::PARAM_INT);
            $stmtDetalle->bindParam(':idMaterial', $idMaterial, PDO::PARAM_INT);
            $stmtDetalle->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
            
            if (!$stmtDetalle->execute()) {
                throw new Exception("Error al agregar el material ID $idMaterial al préstamo");
            }
            
            // Actualizar stock
            $updateStockQuery = "UPDATE Materiales 
                                SET CantidadDisponible = CantidadDisponible - :cantidad 
                                WHERE IDMaterial = :idMaterial";
            
            $stmtUpdateStock = $db->prepare($updateStockQuery);
            $stmtUpdateStock->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
            $stmtUpdateStock->bindParam(':idMaterial', $idMaterial, PDO::PARAM_INT);
            
            if (!$stmtUpdateStock->execute()) {
                throw new Exception("Error al actualizar el stock del material ID $idMaterial");
            }
        }
        
        // Confirmar transacción
        $db->commit();
        
        logMessage("Préstamo creado - ID: $idPrestamo, Matrícula: $matricula", 'INFO');
        
        sendResponse([
            'success' => true,
            'message' => 'Préstamo registrado exitosamente',
            'id' => $idPrestamo
        ], HTTP_CREATED);
        
    } catch (Exception $e) {
        // Revertir transacción en caso de error
        $db->rollBack();
        throw $e;
    }
    
} catch (PDOException $e) {
    error_log("PDOException: " . $e->getMessage());
    logMessage("Error de base de datos al crear préstamo: " . $e->getMessage(), 'ERROR');
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Exception: " . $e->getMessage());
    logMessage("Error general al crear préstamo: " . $e->getMessage(), 'ERROR');
    sendError($e->getMessage(), HTTP_SERVER_ERROR);
}

?>

