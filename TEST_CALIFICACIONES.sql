-- Script de verificación completa
USE telesecundaria_db;

-- 1. Verificar que la tabla existe
SHOW TABLES LIKE 'AlumnoMateria';

-- 2. Ver estructura
DESCRIBE AlumnoMateria;

-- 3. Contar registros
SELECT COUNT(*) as Total FROM AlumnoMateria;

-- 4. Ver todos los datos
SELECT * FROM AlumnoMateria;

-- 5. Probar la consulta que usa el backend
SELECT 
    am.Matricula,
    am.IDMateria,
    am.Calificacion,
    am.PeriodoBimestre,
    CONCAT(a.Nombre, ' ', a.ApellidoPaterno, ' ', a.ApellidoMaterno) as NombreAlumno,
    a.Grado,
    a.Semestre,
    m.Nombre as NombreMateria
FROM AlumnoMateria am
INNER JOIN Alumnos a ON am.Matricula = a.Matricula
INNER JOIN Materias m ON am.IDMateria = m.IDMateria
ORDER BY a.ApellidoPaterno, a.ApellidoMaterno, a.Nombre, m.Nombre, am.PeriodoBimestre;

-- 6. Verificar que existen alumnos
SELECT * FROM Alumnos LIMIT 3;

-- 7. Verificar que existen materias
SELECT * FROM Materias;





