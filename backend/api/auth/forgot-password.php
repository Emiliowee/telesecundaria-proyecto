<?php
/**
 * API: Solicitar recuperación de contraseña
 * Genera un token y envía un correo con el enlace de recuperación
 */

// Limpiar cualquier salida previa
if (ob_get_level()) ob_end_clean();
ob_start();

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../config/constants.php';
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/email.php';
require_once __DIR__ . '/../../utils/helpers.php';

header('Content-Type: application/json');

try {
    // Obtener datos del request
    $data = getJSONInput();
    
    if (!isset($data['email']) || empty($data['email'])) {
        sendError('El correo electrónico es requerido', HTTP_BAD_REQUEST);
    }
    
    $email = trim($data['email']);
    
    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendError('El correo electrónico no es válido', HTTP_BAD_REQUEST);
    }
    
    // Conectar a la base de datos
    $db = getDBConnection();
    
    // Buscar usuario por correo
    $stmt = $db->prepare("SELECT IDUsuario, Nombre, Correo FROM Usuarios WHERE Correo = ? AND Activo = 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        // Por seguridad, no revelar si el email existe o no
        sendResponse([
            'success' => true,
            'message' => 'Si el correo existe, se ha enviado un enlace de recuperación'
        ], HTTP_OK);
        exit;
    }
    
    // Generar token único
    $token = bin2hex(random_bytes(32));
    $expiry = date('Y-m-d H:i:s', strtotime('+1 hour')); // Expira en 1 hora
    
    // Guardar token en la base de datos
    // Primero verificar si la tabla existe, si no, crearla
    try {
        $stmt = $db->prepare("
            CREATE TABLE IF NOT EXISTS password_resets (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                token VARCHAR(64) NOT NULL UNIQUE,
                expires_at DATETIME NOT NULL,
                used BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Usuarios(IDUsuario) ON DELETE CASCADE
            ) ENGINE=InnoDB
        ");
        $stmt->execute();
    } catch (PDOException $e) {
        // La tabla ya existe, continuar
    }
    
    // Eliminar tokens antiguos del usuario
    $stmt = $db->prepare("DELETE FROM password_resets WHERE user_id = ?");
    $stmt->execute([$user['IDUsuario']]);
    
    // Insertar nuevo token
    $stmt = $db->prepare("INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$user['IDUsuario'], $token, $expiry]);
    
    // Generar el enlace de recuperación
    // En producción, cambiar por la URL real del frontend
    $resetLink = "http://localhost:5173/reset-password?token=" . $token;
    
        // Preparar el contenido del correo - Estilo minimalista
        $emailContent = "
            <p style='color: #1f2937; font-size: 15px; line-height: 1.7; margin: 0 0 25px 0;'>
                Hola <strong>{$user['Nombre']}</strong>,
            </p>
            
            <p style='color: #374151; font-size: 14px; line-height: 1.8; margin: 0 0 30px 0;'>
                Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si fuiste tú, haz clic en el siguiente botón:
            </p>
            
            <table width='100%' cellpadding='0' cellspacing='0' style='margin: 35px 0;'>
                <tr>
                    <td align='center'>
                        <a href='{$resetLink}' style='display: inline-block; background-color: #ec4899; color: #ffffff; padding: 16px 40px; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: 0.5px; border-radius: 6px;'>
                            Restablecer Contraseña
                        </a>
                    </td>
                </tr>
            </table>
            
            <p style='color: #6b7280; font-size: 13px; line-height: 1.6; margin: 30px 0 15px 0;'>
                Si el botón no funciona, copia y pega este enlace en tu navegador:
            </p>
            
            <div style='background-color: #f9fafb; padding: 18px; margin: 0 0 35px 0; border-radius: 6px;'>
                <p style='margin: 0; font-family: \"Courier New\", Courier, monospace; font-size: 11px; color: #6b7280; word-break: break-all; line-height: 1.7;'>
                    {$resetLink}
                </p>
            </div>
            
            <div style='background-color: #fef2f2; padding: 20px; margin: 30px 0; border-radius: 6px; border-left: 4px solid #ec4899;'>
                <p style='margin: 0 0 12px 0; font-weight: 600; color: #991b1b; font-size: 13px;'>
                    ⚠️ Información Importante
                </p>
                <ul style='margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 13px; line-height: 1.8;'>
                    <li>Este enlace expira en <strong>1 hora</strong></li>
                    <li>Si no solicitaste este cambio, ignora este mensaje</li>
                    <li>Por seguridad, no compartas este enlace</li>
                </ul>
            </div>
            
            <p style='color: #6b7280; font-size: 13px; line-height: 1.6; margin: 40px 0 5px 0;'>
                Saludos,
            </p>
            <p style='color: #374151; font-size: 13px; line-height: 1.5; margin: 0; font-weight: 500;'>
                Equipo de Soporte Técnico
            </p>
        ";
    
    // Generar el HTML completo usando la plantilla
    $emailHTML = getEmailTemplate('Recuperación de Contraseña', $emailContent);
    
    // Enviar el correo
    $mailSent = sendEmail(
        $email,
        'Recuperación de Contraseña - Sistema de Gestión Escolar',
        $emailHTML
    );
    
    if ($mailSent) {
        sendResponse([
            'success' => true,
            'message' => 'Se ha enviado un enlace de recuperación a tu correo electrónico',
            'debug' => [
                'email_sent_to' => $email,
                'reset_link' => $resetLink // Solo para desarrollo, quitar en producción
            ]
        ], HTTP_OK);
    } else {
        // El token se guardó pero el correo no se envió
        // En desarrollo, aún enviar el link
        sendResponse([
            'success' => true,
            'message' => 'Token generado (el servidor de correo no está configurado)',
            'debug' => [
                'reset_link' => $resetLink,
                'note' => 'Configurar servidor SMTP para envío real de correos'
            ]
        ], HTTP_OK);
    }
    
} catch (PDOException $e) {
    error_log("Error de BD en forgot-password: " . $e->getMessage());
    sendError('Error al procesar la solicitud', HTTP_SERVER_ERROR);
} catch (Exception $e) {
    error_log("Error en forgot-password: " . $e->getMessage());
    sendError($e->getMessage(), HTTP_BAD_REQUEST);
}
?>

