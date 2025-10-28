-- ============================================
-- SISTEMA DE GESTIÓN ESCOLAR - TELESECUNDARIA
-- Base de Datos MySQL
-- ============================================

-- Crear base de datos
DROP DATABASE IF EXISTS telesecundaria;
CREATE DATABASE telesecundaria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE telesecundaria;

-- ============================================
-- TABLA: Usuarios
-- Gestión de usuarios del sistema
-- ============================================
CREATE TABLE Usuarios (
    IDUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL,
    TipoUsuario ENUM('Director', 'Secretario', 'Maestro', 'Administrativo') NOT NULL,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UltimoAcceso TIMESTAMP NULL,
    Activo BOOLEAN DEFAULT TRUE,
    INDEX idx_correo (Correo),
    INDEX idx_tipo (TipoUsuario)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Aulas
-- Información de las aulas
-- ============================================
CREATE TABLE Aulas (
    IDAula INT PRIMARY KEY,
    Capacidad INT NOT NULL,
    Nombre VARCHAR(50),
    INDEX idx_aula (IDAula)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Maestros
-- Información de los maestros
-- ============================================
CREATE TABLE Maestros (
    IdMaestro INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    Horario VARCHAR(50) NOT NULL,
    IdAula INT NOT NULL,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IdAula) REFERENCES Aulas(IDAula) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_maestro (IdMaestro),
    INDEX idx_aula_maestro (IdAula)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Alumnos
-- Información de los alumnos
-- ============================================
CREATE TABLE Alumnos (
    Matricula VARCHAR(20) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    ApellidoPaterno VARCHAR(50) NOT NULL,
    ApellidoMaterno VARCHAR(50) NOT NULL,
    Edad INT NOT NULL CHECK (Edad BETWEEN 10 AND 18),
    Semestre INT NOT NULL CHECK (Semestre BETWEEN 1 AND 6),
    Grado INT NOT NULL CHECK (Grado BETWEEN 1 AND 3),
    Correo VARCHAR(100) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    NombreTutor VARCHAR(100) NOT NULL,
    TelefonoTutor VARCHAR(15) NOT NULL,
    CorreoTutor VARCHAR(100) NOT NULL,
    IdAula INT NOT NULL,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IdAula) REFERENCES Aulas(IDAula) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_matricula (Matricula),
    INDEX idx_grado (Grado),
    INDEX idx_aula_alumno (IdAula)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Materias
-- Catálogo de materias
-- ============================================
CREATE TABLE Materias (
    IDMateria INT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL UNIQUE,
    INDEX idx_materia (IDMateria)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: AlumnoMateria (Calificaciones)
-- Calificaciones de alumnos por materia y periodo
-- ============================================
CREATE TABLE AlumnoMateria (
    Matricula VARCHAR(20) NOT NULL,
    IDMateria INT NOT NULL,
    Calificacion INT NOT NULL CHECK (Calificacion BETWEEN 0 AND 100),
    PeriodoBimestre VARCHAR(25) NOT NULL,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Matricula, IDMateria, PeriodoBimestre),
    FOREIGN KEY (Matricula) REFERENCES Alumnos(Matricula) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDMateria) REFERENCES Materias(IDMateria) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_alumno_calificacion (Matricula),
    INDEX idx_materia_calificacion (IDMateria),
    INDEX idx_periodo (PeriodoBimestre)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: MaestroMateria
-- Relación de maestros con materias que imparten
-- ============================================
CREATE TABLE MaestroMateria (
    IDMaestro INT NOT NULL,
    IDMateria INT NOT NULL,
    PRIMARY KEY (IDMaestro, IDMateria),
    FOREIGN KEY (IDMaestro) REFERENCES Maestros(IdMaestro) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDMateria) REFERENCES Materias(IDMateria) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_maestro_materia (IDMaestro),
    INDEX idx_materia_maestro (IDMateria)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Materiales
-- Catálogo de materiales didácticos
-- ============================================
CREATE TABLE Materiales (
    IDMaterial INT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    CantidadDisponible INT NOT NULL DEFAULT 0,
    Descripcion TEXT,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_material (IDMaterial)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Prestamo
-- Registro de préstamos de materiales
-- ============================================
CREATE TABLE Prestamo (
    IDPrestamo INT PRIMARY KEY,
    Matricula INT NOT NULL,
    IDMaterial INT NOT NULL,
    Cantidad INT NOT NULL,
    Fecha DATE NOT NULL,
    NombreAlumno VARCHAR(150),
    NombreMaterial VARCHAR(100),
    Devuelto BOOLEAN DEFAULT FALSE,
    FechaDevolucion DATE NULL,
    FOREIGN KEY (Matricula) REFERENCES Alumnos(Matricula) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (IDMaterial) REFERENCES Materiales(IDMaterial) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_prestamo (IDPrestamo),
    INDEX idx_alumno_prestamo (Matricula),
    INDEX idx_material_prestamo (IDMaterial),
    INDEX idx_fecha (Fecha)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: DetallePrestamo
-- Detalles de préstamos (tabla intermedia)
-- ============================================
CREATE TABLE DetallePrestamo (
    IDPrestamo INT NOT NULL,
    IDMaterial INT NOT NULL,
    PRIMARY KEY (IDPrestamo, IDMaterial),
    FOREIGN KEY (IDPrestamo) REFERENCES Prestamo(IDPrestamo) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDMaterial) REFERENCES Materiales(IDMaterial) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- DATOS DE PRUEBA
-- ============================================

-- Insertar usuarios de prueba (contraseñas sin hashear para pruebas)
INSERT INTO Usuarios (IDUsuario, Nombre, Correo, Contraseña, TipoUsuario) VALUES
(1, 'Director General', 'director@telesecundaria.edu.mx', '12345', 'Director'),
(2, 'Secretaria Escolar', 'secretaria@telesecundaria.edu.mx', '12345', 'Secretario'),
(3, 'Profesor López', 'maestro@telesecundaria.edu.mx', '12345', 'Maestro'),
(4, 'Admin Materiales', 'admin@telesecundaria.edu.mx', '12345', 'Administrativo');

-- Insertar aulas de ejemplo
INSERT INTO Aulas (IDAula, Capacidad, Nombre) VALUES
(101, 30, 'Aula 1-A'),
(102, 30, 'Aula 1-B'),
(201, 35, 'Aula 2-A'),
(202, 35, 'Aula 2-B'),
(301, 40, 'Aula 3-A');

-- Insertar materias
INSERT INTO Materias (IDMateria, Nombre) VALUES
(1, 'Matemáticas'),
(2, 'Español'),
(3, 'Ciencias'),
(4, 'Historia'),
(5, 'Geografía'),
(6, 'Inglés'),
(7, 'Educación Física'),
(8, 'Artes');

-- Insertar maestros de ejemplo
INSERT INTO Maestros (IdMaestro, Nombre, Apellidos, Telefono, Correo, Horario, IdAula) VALUES
(1001, 'Juan', 'López García', '5551234567', 'juan.lopez@telesecundaria.edu.mx', 'Matutino 7:00-14:00', 101),
(1002, 'María', 'Martínez Ruiz', '5559876543', 'maria.martinez@telesecundaria.edu.mx', 'Matutino 7:00-14:00', 102);

-- Insertar alumnos de ejemplo
INSERT INTO Alumnos (Matricula, Nombre, ApellidoPaterno, ApellidoMaterno, Edad, Semestre, Grado, Correo, Telefono, NombreTutor, TelefonoTutor, CorreoTutor, IdAula) VALUES
('20240001', 'Carlos', 'Hernández', 'López', 13, 1, 1, 'carlos.h@email.com', '5551112222', 'Roberto Hernández', '5553334444', 'roberto.h@email.com', 101),
('20240002', 'Ana', 'García', 'Martínez', 14, 2, 1, 'ana.g@email.com', '5555556666', 'Laura García', '5557778888', 'laura.g@email.com', 101);

-- Insertar materiales de ejemplo
INSERT INTO Materiales (IDMaterial, Nombre, CantidadDisponible, Descripcion) VALUES
(1, 'Proyector', 5, 'Proyector multimedia para presentaciones'),
(2, 'Laptop', 10, 'Laptop para uso educativo'),
(3, 'Calculadora Científica', 25, 'Calculadora científica básica');

-- ============================================
-- VISTAS ÚTILES
-- ============================================

-- Vista de alumnos con su información completa
CREATE VIEW Vista_Alumnos_Completa AS
SELECT 
    a.Matricula,
    CONCAT(a.Nombre, ' ', a.Apellido) AS NombreCompleto,
    a.Grado,
    a.Grupo,
    a.Correo,
    a.Telefono,
    a.NombreTutor,
    a.TelefonoTutor
FROM Alumnos a;

-- Vista de calificaciones con nombres
CREATE VIEW Vista_Calificaciones AS
SELECT 
    am.Matricula,
    CONCAT(a.Nombre, ' ', a.Apellido) AS NombreAlumno,
    m.Nombre AS Materia,
    am.Calificacion,
    am.PeriodoBimestre
FROM AlumnoMateria am
INNER JOIN Alumnos a ON am.Matricula = a.Matricula
INNER JOIN Materias m ON am.IDMateria = m.IDMateria;

-- Vista de préstamos activos
CREATE VIEW Vista_Prestamos_Activos AS
SELECT 
    p.IDPrestamo,
    p.Matricula,
    CONCAT(a.Nombre, ' ', a.Apellido) AS NombreAlumno,
    mat.Nombre AS Material,
    p.Cantidad,
    p.Fecha,
    p.Devuelto
FROM Prestamo p
INNER JOIN Alumnos a ON p.Matricula = a.Matricula
INNER JOIN Materiales mat ON p.IDMaterial = mat.IDMaterial
WHERE p.Devuelto = FALSE;

-- ============================================
-- PROCEDIMIENTOS ALMACENADOS
-- ============================================

DELIMITER //

-- Procedimiento para registrar un préstamo
CREATE PROCEDURE sp_RegistrarPrestamo(
    IN p_IDPrestamo INT,
    IN p_Matricula INT,
    IN p_IDMaterial INT,
    IN p_Cantidad INT,
    IN p_Fecha DATE
)
BEGIN
    DECLARE v_Disponible INT;
    DECLARE v_NombreAlumno VARCHAR(150);
    DECLARE v_NombreMaterial VARCHAR(100);
    
    -- Obtener disponibilidad
    SELECT CantidadDisponible INTO v_Disponible 
    FROM Materiales 
    WHERE IDMaterial = p_IDMaterial;
    
    -- Verificar disponibilidad
    IF v_Disponible >= p_Cantidad THEN
        -- Obtener nombres
        SELECT CONCAT(Nombre, ' ', Apellido) INTO v_NombreAlumno 
        FROM Alumnos 
        WHERE Matricula = p_Matricula;
        
        SELECT Nombre INTO v_NombreMaterial 
        FROM Materiales 
        WHERE IDMaterial = p_IDMaterial;
        
        -- Registrar préstamo
        INSERT INTO Prestamo (IDPrestamo, Matricula, IDMaterial, Cantidad, Fecha, NombreAlumno, NombreMaterial)
        VALUES (p_IDPrestamo, p_Matricula, p_IDMaterial, p_Cantidad, p_Fecha, v_NombreAlumno, v_NombreMaterial);
        
        -- Actualizar disponibilidad
        UPDATE Materiales 
        SET CantidadDisponible = CantidadDisponible - p_Cantidad 
        WHERE IDMaterial = p_IDMaterial;
        
        -- Registrar detalle
        INSERT INTO DetallePrestamo (IDPrestamo, IDMaterial)
        VALUES (p_IDPrestamo, p_IDMaterial);
        
        SELECT 'Préstamo registrado exitosamente' AS Mensaje;
    ELSE
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'No hay suficiente cantidad disponible';
    END IF;
END //

DELIMITER ;

-- ============================================
-- TRIGGERS
-- ============================================

DELIMITER //

-- Trigger para actualizar último acceso del usuario
CREATE TRIGGER trg_ActualizarUltimoAcceso
BEFORE UPDATE ON Usuarios
FOR EACH ROW
BEGIN
    IF NEW.UltimoAcceso IS NOT NULL THEN
        SET NEW.UltimoAcceso = CURRENT_TIMESTAMP;
    END IF;
END //

DELIMITER ;

-- ============================================
-- PERMISOS Y SEGURIDAD
-- ============================================

-- Crear usuario para la aplicación (ajustar según necesidades)
-- CREATE USER 'app_telesecundaria'@'localhost' IDENTIFIED BY 'password_seguro_aqui';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON telesecundaria.* TO 'app_telesecundaria'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

SELECT 'Base de datos creada exitosamente' AS Status;
SELECT COUNT(*) AS Usuarios FROM Usuarios;
SELECT COUNT(*) AS Alumnos FROM Alumnos;
SELECT COUNT(*) AS Maestros FROM Maestros;
SELECT COUNT(*) AS Materias FROM Materias;

