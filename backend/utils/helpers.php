<?php
/**
 * Funciones helper del sistema
 * Sistema de Gestión Escolar - Telesecundaria
 */

/**
 * Enviar respuesta JSON
 * @param mixed $data Datos a enviar
 * @param int $statusCode Código HTTP
 * @param string|null $message Mensaje adicional
 */
function sendResponse($data = null, $statusCode = 200, $message = null) {
    http_response_code($statusCode);
    
    $response = [];
    
    if ($message !== null) {
        $response['message'] = $message;
    }
    
    if ($data !== null) {
        if (is_array($data) && isset($data['success'])) {
            $response = array_merge($response, $data);
        } else {
            $response['data'] = $data;
        }
    }
    
    $response['timestamp'] = date('Y-m-d H:i:s');
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}

/**
 * Enviar respuesta de error
 * @param string $message Mensaje de error
 * @param int $statusCode Código HTTP
 * @param array|null $details Detalles adicionales
 */
function sendError($message, $statusCode = 400, $details = null) {
    http_response_code($statusCode);
    
    $response = [
        'success' => false,
        'error' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    if ($details !== null) {
        $response['details'] = $details;
    }
    
    if (APP_ENV === 'development' && $statusCode >= 500) {
        $response['trace'] = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}

/**
 * Validar datos requeridos
 * @param array $data Datos a validar
 * @param array $required Campos requeridos
 * @return array|true Retorna true si es válido, array de errores si no
 */
function validateRequired($data, $required) {
    $errors = [];
    
    foreach ($required as $field) {
        if (!isset($data[$field]) || empty(trim($data[$field]))) {
            $errors[] = "El campo '$field' es requerido";
        }
    }
    
    return empty($errors) ? true : $errors;
}

/**
 * Sanitizar string
 * @param string $data Dato a sanitizar
 * @return string
 */
function sanitizeString($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validar email
 * @param string $email Email a validar
 * @return bool
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Obtener datos del body JSON
 * @return array
 */
function getJSONInput() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendError('JSON inválido: ' . json_last_error_msg(), HTTP_BAD_REQUEST);
    }
    
    return $data ?? [];
}

/**
 * Logging de errores
 * @param string $message Mensaje a registrar
 * @param string $level Nivel de log (ERROR, WARNING, INFO)
 */
function logMessage($message, $level = 'INFO') {
    if (!LOG_ENABLED) return;
    
    $logDir = dirname(LOG_FILE);
    if (!file_exists($logDir)) {
        mkdir($logDir, 0755, true);
    }
    
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$level] $message" . PHP_EOL;
    
    error_log($logEntry, 3, LOG_FILE);
}

/**
 * Verificar si el usuario tiene permisos
 * @param string $userType Tipo de usuario
 * @param string $resource Recurso al que se quiere acceder
 * @return bool
 */
function hasPermission($userType, $resource) {
    if (!isset(PERMISSIONS[$userType])) {
        return false;
    }
    
    return in_array($resource, PERMISSIONS[$userType]);
}

/**
 * Generar ID único
 * @return string
 */
function generateUniqueId() {
    return uniqid('', true);
}

/**
 * Formatear fecha para MySQL
 * @param string $date Fecha en formato cualquiera
 * @return string Fecha en formato Y-m-d
 */
function formatDateForMySQL($date) {
    return date('Y-m-d', strtotime($date));
}

/**
 * Formatear fecha para mostrar
 * @param string $date Fecha en formato MySQL
 * @return string Fecha en formato legible
 */
function formatDateForDisplay($date) {
    return date('d/m/Y', strtotime($date));
}

/**
 * Hashear contraseña
 * @param string $password Contraseña en texto plano
 * @return string Contraseña hasheada
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

/**
 * Verificar contraseña
 * @param string $password Contraseña en texto plano
 * @param string $hash Hash almacenado
 * @return bool
 */
function verifyPassword($password, $hash) {
    // Para compatibilidad con datos antiguos (sin hash)
    if ($password === $hash) {
        return true;
    }
    return password_verify($password, $hash);
}

?>



