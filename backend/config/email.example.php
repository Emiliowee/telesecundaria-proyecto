<?php
/**
 * Configuración de correo electrónico - PLANTILLA
 * Copia este archivo como "email.php" y configura tus credenciales
 */

// Configuración del remitente
define('EMAIL_FROM', 'tu_correo@gmail.com'); // CAMBIAR
define('EMAIL_FROM_NAME', 'Sistema de Gestión Escolar - Telesecundaria');

// Configuración SMTP (para usar con ini_set)
// IMPORTANTE: Configura estos valores según tu servidor de correo

// Opción 1: Gmail (requiere "Contraseña de aplicación")
// https://myaccount.google.com/apppasswords
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'tu_correo@gmail.com'); // CAMBIAR
define('SMTP_PASSWORD', 'tu_contraseña_de_aplicacion'); // CAMBIAR (16 caracteres sin espacios)
define('SMTP_SECURE', 'tls');

// Opción 2: Outlook/Hotmail
// define('SMTP_HOST', 'smtp.office365.com');
// define('SMTP_PORT', 587);
// define('SMTP_USERNAME', 'tu_correo@outlook.com');
// define('SMTP_PASSWORD', 'tu_contraseña');
// define('SMTP_SECURE', 'tls');

// Opción 3: Servidor SMTP local (XAMPP Mercury)
// define('SMTP_HOST', 'localhost');
// define('SMTP_PORT', 25);
// define('SMTP_USERNAME', '');
// define('SMTP_PASSWORD', '');
// define('SMTP_SECURE', '');

/**
 * Función para enviar correo HTML con configuración SMTP
 */
function sendEmail($to, $subject, $htmlBody, $plainTextBody = '') {
    // Si no hay texto plano, generarlo desde HTML
    if (empty($plainTextBody)) {
        $plainTextBody = strip_tags($htmlBody);
    }
    
    // Configurar php.ini en tiempo de ejecución
    ini_set('SMTP', SMTP_HOST);
    ini_set('smtp_port', SMTP_PORT);
    
    // Headers para correo HTML
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = 'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM . '>';
    $headers[] = 'Reply-To: ' . EMAIL_FROM;
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    
    $headersString = implode("\r\n", $headers);
    
    // Intentar enviar el correo
    $sent = @mail($to, $subject, $htmlBody, $headersString);
    
    if (!$sent) {
        error_log("Error al enviar correo a: $to - Asunto: $subject");
        return false;
    }
    
    error_log("Correo enviado exitosamente a: $to");
    return true;
}

/**
 * Plantilla HTML para correos
 */
function getEmailTemplate($title, $content, $color = '#EC4899') {
    $year = date('Y');
    
    return "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>$title</title>
    </head>
    <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;'>
        <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #f4f4f4; padding: 20px;'>
            <tr>
                <td align='center'>
                    <table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>
                        <!-- Header -->
                        <tr>
                            <td style='background: linear-gradient(135deg, $color 0%, #8B5CF6 100%); padding: 30px; text-align: center;'>
                                <h1 style='color: #ffffff; margin: 0; font-size: 24px;'>$title</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style='padding: 40px 30px;'>
                                $content
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style='background-color: #f8f9fa; padding: 20px; text-align: center;'>
                                <p style='margin: 0; color: #666666; font-size: 12px;'>
                                    © $year Sistema de Gestión Escolar - Telesecundaria<br>
                                    Todos los derechos reservados
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    ";
}




