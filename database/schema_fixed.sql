-- ============================================
-- SISTEMA DE GESTION ESCOLAR - TELESECUNDARIA
-- Base de Datos MySQL
-- Version: 2.0 - Corregida
-- ============================================

-- Crear base de datos
DROP DATABASE IF EXISTS telesecundaria_db;
CREATE DATABASE telesecundaria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE telesecundaria_db;

-- ============================================
-- TABLA: Usuarios
-- Gestion de usuarios del sistema
-- ============================================
CREATE TABLE Usuarios (
    IDUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL,
    TipoUsuario ENUM('Director', 'Secretario', 'Maestro', 'Administrativo') NOT NULL,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UltimoAcceso TIMESTAMP NULL,
    Activo BOOLEAN DEFAULT TRUE,
    INDEX idx_correo (Correo),
    INDEX idx_tipo (TipoUsuario)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Aulas
-- Informacion de las aulas
-- ============================================
CREATE TABLE Aulas (
    IDAula INT PRIMARY KEY,
    Capacidad INT NOT NULL,
    Nombre VARCHAR(50),
    INDEX idx_aula (IDAula)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: Maestros
-- Informacion de los maestros
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
-- Informacion de los alumnos
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
-- Catalogo de materias
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
-- Relacion de maestros con materias que imparten
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
-- Catalogo de materiales didacticos
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
-- Registro de prestamos de materiales
-- ============================================
CREATE TABLE Prestamo (
    IDPrestamo INT PRIMARY KEY AUTO_INCREMENT,
    Matricula VARCHAR(20) NOT NULL,
    FechaPrestamo DATE NOT NULL,
    FechaDevolucion DATE NULL,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Matricula) REFERENCES Alumnos(Matricula) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_prestamo (IDPrestamo),
    INDEX idx_alumno_prestamo (Matricula),
    INDEX idx_fecha (FechaPrestamo)
) ENGINE=InnoDB;

-- ============================================
-- TABLA: DetallePrestamo
-- Detalles de prestamos (materiales prestados)
-- ============================================
CREATE TABLE DetallePrestamo (
    IDPrestamo INT NOT NULL,
    IDMaterial INT NOT NULL,
    Cantidad INT NOT NULL DEFAULT 1,
    PRIMARY KEY (IDPrestamo, IDMaterial),
    FOREIGN KEY (IDPrestamo) REFERENCES Prestamo(IDPrestamo) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (IDMaterial) REFERENCES Materiales(IDMaterial) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- TABLA: password_resets
-- Tokens para recuperacion de contrasena
-- ============================================
CREATE TABLE password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Usuarios(IDUsuario) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB;

-- ============================================
-- DATOS DE PRUEBA
-- ============================================

-- Insertar usuarios de prueba (contrasenas hasheadas)
INSERT INTO Usuarios (IDUsuario, Nombre, Correo, Contrasena, TipoUsuario) VALUES
(1, 'Director General', 'director@telesecundaria.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Director'),
(2, 'Secretaria Escolar', 'secretaria@telesecundaria.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Secretario'),
(3, 'Profesor Lopez', 'maestro@telesecundaria.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Maestro'),
(4, 'Admin Materiales', 'admin@telesecundaria.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrativo');

-- Insertar aulas de ejemplo
INSERT INTO Aulas (IDAula, Capacidad, Nombre) VALUES
(101, 30, 'Aula 1-A'),
(102, 30, 'Aula 1-B'),
(201, 35, 'Aula 2-A'),
(202, 35, 'Aula 2-B'),
(301, 40, 'Aula 3-A');

-- Insertar materias
INSERT INTO Materias (IDMateria, Nombre) VALUES
(1, 'Matematicas'),
(2, 'Espanol'),
(3, 'Ciencias'),
(4, 'Historia'),
(5, 'Geografia'),
(6, 'Ingles'),
(7, 'Educacion Fisica'),
(8, 'Artes');

-- Insertar maestros de ejemplo
INSERT INTO Maestros (IdMaestro, Nombre, Apellidos, Telefono, Correo, Horario, IdAula) VALUES
(1001, 'Juan', 'Lopez Garcia', '5551234567', 'juan.lopez@telesecundaria.edu.mx', 'Matutino 7:00-14:00', 101),
(1002, 'Maria', 'Martinez Ruiz', '5559876543', 'maria.martinez@telesecundaria.edu.mx', 'Matutino 7:00-14:00', 102);

-- Insertar alumnos de ejemplo
INSERT INTO Alumnos (Matricula, Nombre, ApellidoPaterno, ApellidoMaterno, Edad, Semestre, Grado, Correo, Telefono, NombreTutor, TelefonoTutor, CorreoTutor, IdAula) VALUES
('20240001', 'Carlos', 'Hernandez', 'Lopez', 13, 1, 1, 'carlos.h@email.com', '5551112222', 'Roberto Hernandez', '5553334444', 'roberto.h@email.com', 101),
('20240002', 'Ana', 'Garcia', 'Martinez', 14, 2, 1, 'ana.g@email.com', '5555556666', 'Laura Garcia', '5557778888', 'laura.g@email.com', 101);

-- Insertar materiales de ejemplo
INSERT INTO Materiales (IDMaterial, Nombre, CantidadDisponible, Descripcion) VALUES
(1, 'Proyector', 5, 'Proyector multimedia para presentaciones'),
(2, 'Laptop', 10, 'Laptop para uso educativo'),
(3, 'Calculadora Cientifica', 25, 'Calculadora cientifica basica');

-- Insertar calificaciones de ejemplo
INSERT INTO AlumnoMateria (Matricula, IDMateria, Calificacion, PeriodoBimestre) VALUES
('20240001', 1, 85, 'Primer Bimestre'),
('20240001', 2, 90, 'Primer Bimestre'),
('20240002', 1, 78, 'Primer Bimestre'),
('20240002', 2, 88, 'Primer Bimestre');

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

SELECT 'Base de datos telesecundaria_db creada exitosamente' AS Status;
SELECT COUNT(*) AS Usuarios FROM Usuarios;
SELECT COUNT(*) AS Alumnos FROM Alumnos;
SELECT COUNT(*) AS Maestros FROM Maestros;
SELECT COUNT(*) AS Materias FROM Materias;
SELECT COUNT(*) AS Materiales FROM Materiales;




