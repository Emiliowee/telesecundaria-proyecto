<?php
/**
 * API: Restablecer contraseña con token
 * Valida el token y actualiza la contraseña del usuario
 */

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/constants.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/email.php';
require_once __DIR__ . '/../../utils/helpers.php';

header('Content-Type: application/json');

try {
    // Obtener datos del request
    $data = getJSONInput();
    
    if (!isset($data['token']) || empty($data['token'])) {
        sendError('El token es requerido', HTTP_BAD_REQUEST);
    }
    
    if (!isset($data['password']) || empty($data['password'])) {
        sendError('La nueva contraseña es requerida', HTTP_BAD_REQUEST);
    }
    
    $token = trim($data['token']);
    $newPassword = $data['password']; // No trim para preservar caracteres especiales
    
    // Validar requisitos de contraseña segura
    if (strlen($newPassword) < 8) {
        sendError('La contraseña debe tener al menos 8 caracteres', HTTP_BAD_REQUEST);
    }
    
    if (!preg_match('/[A-Z]/', $newPassword)) {
        sendError('La contraseña debe contener al menos una letra mayúscula', HTTP_BAD_REQUEST);
    }
    
    if (!preg_match('/[a-z]/', $newPassword)) {
        sendError('La contraseña debe contener al menos una letra minúscula', HTTP_BAD_REQUEST);
    }
    
    if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $newPassword)) {
        sendError('La contraseña debe contener al menos un carácter especial (!@#$%^&*...)', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar el token y validar que no haya expirado
    $stmt = $db->prepare("
        SELECT pr.id, pr.user_id, pr.expires_at, u.Nombre, u.Correo
        FROM password_resets pr
        INNER JOIN Usuarios u ON pr.user_id = u.IDUsuario
        WHERE pr.token = ?
    ");
    $stmt->execute([$token]);
    $resetRequest = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$resetRequest) {
        sendError('Token inválido o ya utilizado', HTTP_BAD_REQUEST);
    }
    
    // Verificar si el token ha expirado
    $now = new DateTime();
    $expiresAt = new DateTime($resetRequest['expires_at']);
    
    if ($now > $expiresAt) {
        sendError('El token ha expirado. Solicita uno nuevo', HTTP_BAD_REQUEST);
    }
    
    // Hashear la contraseña antes de guardarla
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    
    // Actualizar la contraseña del usuario
    $stmt = $db->prepare("UPDATE Usuarios SET Contrasena = ? WHERE IDUsuario = ?");
    $stmt->execute([$hashedPassword, $resetRequest['user_id']]);
    
    // Eliminar el token usado (más seguro que marcarlo como usado)
    $stmt = $db->prepare("DELETE FROM password_resets WHERE token = ?");
    $stmt->execute([$token]);
    
    // Preparar el contenido del correo de confirmación - Estilo minimalista
    $emailContent = "
        <p style='color: #1f2937; font-size: 15px; line-height: 1.7; margin: 0 0 25px 0;'>
            Hola <strong>{$resetRequest['Nombre']}</strong>,
        </p>
        
        <div style='background-color: #d1fae5; padding: 20px; margin: 0 0 30px 0; border-radius: 6px; border-left: 4px solid #10b981;'>
            <p style='margin: 0; font-weight: 600; color: #065f46; font-size: 15px;'>
                ✅ Tu contraseña ha sido actualizada exitosamente
            </p>
        </div>
        
        <p style='color: #374151; font-size: 14px; line-height: 1.8; margin: 0 0 25px 0;'>
            Ya puedes iniciar sesión en el Sistema de Gestión Escolar con tu nueva contraseña.
        </p>
        
        <div style='background-color: #f9fafb; padding: 18px; margin: 0 0 30px 0; border-radius: 6px;'>
            <p style='margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;'>
                <strong style='color: #374151;'>Fecha y hora:</strong><br>
                " . date('d/m/Y H:i:s') . "
            </p>
        </div>
        
        <div style='background-color: #fef2f2; padding: 20px; margin: 30px 0; border-radius: 6px; border-left: 4px solid #ef4444;'>
            <p style='margin: 0 0 8px 0; font-weight: 600; color: #991b1b; font-size: 13px;'>
                ⚠️ Aviso de Seguridad
            </p>
            <p style='margin: 0; color: #7f1d1d; font-size: 13px; line-height: 1.7;'>
                Si <strong>no realizaste</strong> este cambio, contacta <strong>inmediatamente</strong> al administrador del sistema.
            </p>
        </div>
        
        <p style='color: #6b7280; font-size: 13px; line-height: 1.6; margin: 40px 0 5px 0;'>
            Saludos,
        </p>
        <p style='color: #374151; font-size: 13px; line-height: 1.5; margin: 0; font-weight: 500;'>
            Equipo de Soporte Técnico
        </p>
    ";
    
    // Generar el HTML completo usando la plantilla minimalista
    $emailHTML = getEmailTemplate('Contraseña Actualizada', $emailContent);
    
    // Enviar el correo de confirmación (opcional, no crítico si falla)
    sendEmail(
        $resetRequest['Correo'],
        'Contraseña Actualizada - Sistema de Gestión Escolar',
        $emailHTML
    );
    
    sendResponse([
        'success' => true,
        'message' => 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión'
    ], HTTP_OK);
    
} catch (PDOException $e) {
    error_log("Error de BD en reset-password: " . $e->getMessage());
    sendError('Error al actualizar la contraseña', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error en reset-password: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_BAD_REQUEST);
}
?>

