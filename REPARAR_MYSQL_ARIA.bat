@echo off
echo ================================================
echo  REPARACION DE MYSQL - MOTOR ARIA CORRUPTO
echo ================================================
echo.
echo ATENCION: Este script eliminara archivos de log
echo de MySQL para permitir su reinicio.
echo.
echo Asegurate de haber hecho BACKUP de tu base de datos.
echo.
pause

echo.
echo [1/4] Deteniendo MySQL...
C:\xampp\mysql\bin\mysqladmin.exe -u root shutdown 2>nul
timeout /t 3 >nul

echo [2/4] Eliminando archivos de log corruptos de Aria...
cd C:\xampp\mysql\data
if exist aria_log_control del /F /Q aria_log_control
if exist aria_log.00000001 del /F /Q aria_log.00000001
if exist aria_log.00000002 del /F /Q aria_log.00000002

echo [3/4] Eliminando logs de InnoDB...
if exist ib_logfile0 del /F /Q ib_logfile0
if exist ib_logfile1 del /F /Q ib_logfile1

echo [4/4] Archivos eliminados correctamente.
echo.
echo ================================================
echo  AHORA INICIA MYSQL DESDE EL PANEL DE XAMPP
echo ================================================
echo.
pause




