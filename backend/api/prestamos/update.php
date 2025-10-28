<?php
/**
 * Actualizar préstamo existente
 * 
 * Endpoint: POST /api/prestamos/update.php
 * Permisos: Director, Secretario, Administrativo
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

header('Content-Type: application/json');

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Método no permitido', HTTP_METHOD_NOT_ALLOWED);
}

// Verificar sesión
if (!isset($_SESSION['logged_in']) || !$_SESSION['logged_in']) {
    sendError(MESSAGES['UNAUTHORIZED'], HTTP_UNAUTHORIZED);
}

// Verificar permisos
if (!hasPermission($_SESSION['user_type'], 'prestamos')) {
    sendError(MESSAGES['UNAUTHORIZED'], HTTP_FORBIDDEN);
}

try {
    $db = getDBConnection();
    $data = getJSONInput();
    
    // Validar datos requeridos
    $required = ['id', 'Matricula', 'FechaPrestamo', 'FechaDevolucion'];
    validateRequired($data, $required);
    
    $id = (int)$data['id'];
    $matricula = trim($data['Matricula']);
    $fechaPrestamo = trim($data['FechaPrestamo']);
    $fechaDevolucion = trim($data['FechaDevolucion']);
    $materiales = $data['materiales'] ?? [];
    
    // Validar que haya materiales
    if (empty($materiales) || !is_array($materiales)) {
        sendError('Debe incluir al menos un material', HTTP_BAD_REQUEST);
    }
    
    // Validar fechas
    if (strtotime($fechaDevolucion) < strtotime($fechaPrestamo)) {
        sendError('La fecha de devolución debe ser posterior a la fecha de préstamo', HTTP_BAD_REQUEST);
    }
    
    // Validar que el alumno exista
    $stmtAlumno = $db->prepare("SELECT Matricula FROM Alumnos WHERE Matricula = ?");
    $stmtAlumno->execute([$matricula]);
    if (!$stmtAlumno->fetch()) {
        sendError('El alumno no existe', HTTP_BAD_REQUEST);
    }
    
    // Verificar que el préstamo existe
    $stmtCheck = $db->prepare("SELECT IDPrestamo FROM Prestamo WHERE IDPrestamo = ?");
    $stmtCheck->execute([$id]);
    if (!$stmtCheck->fetch()) {
        sendError("El préstamo con ID $id no existe", HTTP_NOT_FOUND);
    }
    
    // Iniciar transacción
    $db->beginTransaction();
    
    try {
        // 1. Obtener los materiales actuales del préstamo
        $stmtDetalle = $db->prepare("
            SELECT IDMaterial, Cantidad 
            FROM DetallePrestamo 
            WHERE IDPrestamo = ?
        ");
        $stmtDetalle->execute([$id]);
        $materialesAnteriores = $stmtDetalle->fetchAll(PDO::FETCH_ASSOC);
        
        // 2. Devolver al stock los materiales anteriores
        foreach ($materialesAnteriores as $material) {
            $stmtDevolver = $db->prepare("
                UPDATE Materiales 
                SET CantidadDisponible = CantidadDisponible + ? 
                WHERE IDMaterial = ?
            ");
            $stmtDevolver->execute([
                $material['Cantidad'],
                $material['IDMaterial']
            ]);
        }
        
        // 3. Eliminar los detalles anteriores
        $stmtDeleteDetalle = $db->prepare("DELETE FROM DetallePrestamo WHERE IDPrestamo = ?");
        $stmtDeleteDetalle->execute([$id]);
        
        // 4. Actualizar la cabecera del préstamo
        $stmtUpdatePrestamo = $db->prepare("
            UPDATE Prestamo 
            SET Matricula = ?,
                FechaPrestamo = ?,
                FechaDevolucion = ?
            WHERE IDPrestamo = ?
        ");
        $stmtUpdatePrestamo->execute([
            $matricula,
            $fechaPrestamo,
            $fechaDevolucion,
            $id
        ]);
        
        // 5. Insertar los nuevos materiales
        $stmtInsertDetalle = $db->prepare("
            INSERT INTO DetallePrestamo (IDPrestamo, IDMaterial, Cantidad)
            VALUES (?, ?, ?)
        ");
        
        $stmtUpdateStock = $db->prepare("
            UPDATE Materiales 
            SET CantidadDisponible = CantidadDisponible - ?
            WHERE IDMaterial = ?
        ");
        
        foreach ($materiales as $material) {
            $idMaterial = (int)$material['IDMaterial'];
            $cantidad = (int)$material['Cantidad'];
            
            // Validar que el material exista
            $stmtMaterial = $db->prepare("
                SELECT CantidadDisponible 
                FROM Materiales 
                WHERE IDMaterial = ?
            ");
            $stmtMaterial->execute([$idMaterial]);
            $materialData = $stmtMaterial->fetch(PDO::FETCH_ASSOC);
            
            if (!$materialData) {
                throw new Exception("Material con ID $idMaterial no existe");
            }
            
            // Validar stock disponible
            if ($materialData['CantidadDisponible'] < $cantidad) {
                throw new Exception("Stock insuficiente para el material ID $idMaterial. Disponible: {$materialData['CantidadDisponible']}, Solicitado: $cantidad");
            }
            
            // Insertar detalle
            $stmtInsertDetalle->execute([$id, $idMaterial, $cantidad]);
            
            // Actualizar stock
            $stmtUpdateStock->execute([$cantidad, $idMaterial]);
        }
        
        // Confirmar transacción
        $db->commit();
        
        sendResponse([
            'success' => true,
            'id' => $id,
            'message' => 'Préstamo actualizado exitosamente'
        ], HTTP_OK);
        
    } catch (Exception $e) {
        $db->rollBack();
        throw $e;
    }
    
} catch (PDOException $e) {
    error_log("Error de BD en prestamos/update: " . $e->getMessage());
    sendError('Error de base de datos: ' . $e->getMessage(), HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error en prestamos/update: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_BAD_REQUEST);
}

