-- ============================================
-- SCRIPT DE VERIFICACIÓN Y CREACIÓN
-- Tabla AlumnoMateria (Calificaciones)
-- ============================================

USE telesecundaria_db;

-- Verificar si la tabla existe
SELECT 'Verificando tabla AlumnoMateria...' AS Estado;
SHOW TABLES LIKE 'AlumnoMateria';

-- Si existe, mostrar su estructura
DESCRIBE AlumnoMateria;

-- Mostrar datos actuales (si existen)
SELECT COUNT(*) as TotalCalificaciones FROM AlumnoMateria;

-- Si la tabla no existe o tiene problemas, ejecutar esto:
-- (Descomenta las siguientes líneas si necesitas recrear la tabla)

/*
DROP TABLE IF EXISTS AlumnoMateria;

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

-- Insertar datos de ejemplo
INSERT INTO AlumnoMateria (Matricula, IDMateria, Calificacion, PeriodoBimestre) VALUES
('20240001', 1, 85, 'Bimestre 1'),
('20240001', 2, 92, 'Bimestre 1'),
('20240001', 3, 78, 'Bimestre 1'),
('20240002', 1, 88, 'Bimestre 1'),
('20240002', 2, 95, 'Bimestre 1'),
('20240002', 3, 82, 'Bimestre 1'),
('20240001', 1, 90, 'Bimestre 2'),
('20240001', 2, 88, 'Bimestre 2'),
('20240002', 1, 92, 'Bimestre 2'),
('20240002', 2, 97, 'Bimestre 2');

SELECT 'Tabla AlumnoMateria creada y datos insertados exitosamente' AS Resultado;
SELECT * FROM AlumnoMateria;
*/





