<?php
/**
 * Configuración de conexión a la base de datos MySQL
 * Sistema de Gestión Escolar - Telesecundaria
 */

// Configuración de la base de datos
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');
define('DB_NAME', 'telesecundaria_db');
define('DB_USER', 'root');  // Cambiar según tu configuración
define('DB_PASS', '');      // Cambiar según tu configuración
define('DB_CHARSET', 'utf8mb4');

/**
 * Clase Database - Manejo de conexiones con PDO
 */
class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $charset = DB_CHARSET;
    private $conn = null;

    /**
     * Obtener conexión a la base de datos
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host=" . $this->host . ";port=" . DB_PORT . ";dbname=" . $this->db_name . ";charset=" . $this->charset;
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ];

            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            
        } catch(PDOException $e) {
            error_log("Error de conexión: " . $e->getMessage());
            throw new Exception("Error al conectar con la base de datos");
        }

        return $this->conn;
    }

    /**
     * Cerrar conexión
     */
    public function closeConnection() {
        $this->conn = null;
    }
}

/**
 * Función helper para obtener una conexión rápida
 * @return PDO
 */
function getDBConnection() {
    $database = new Database();
    return $database->getConnection();
}
