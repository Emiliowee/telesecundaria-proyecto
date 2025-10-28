/**
 * Página de Reportes Académicos
 * Genera reportes individuales y generales de calificaciones
 */

import { useState, useEffect, useRef } from 'react';
import { calificacionesService } from '../services/api';
import { toast } from 'sonner';

const Reportes = () => {
  const [reporteGeneral, setReporteGeneral] = useState(null);
  const [reporteAlumno, setReporteAlumno] = useState(null);
  const [matriculaBusqueda, setMatriculaBusqueda] = useState('');
  const [loading, setLoading] = useState(false);
  const [vistaActiva, setVistaActiva] = useState('general'); // 'general' o 'alumno'
  const reporteRef = useRef(null);

  useEffect(() => {
    cargarReporteGeneral();
  }, []);

  /**
   * Cargar reporte general
   */
  const cargarReporteGeneral = async () => {
    try {
      setLoading(true);
      const response = await calificacionesService.reporteGeneral();
      
      if (response.success) {
        setReporteGeneral(response);
        setVistaActiva('general');
      }
    } catch (error) {
      console.error('Error al cargar reporte:', error);
      toast.error('Error al cargar reporte general');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar reporte individual
   */
  const generarReporteAlumno = async () => {
    if (!matriculaBusqueda.trim()) {
      toast.error('Ingrese una matrícula');
      return;
    }

    try {
      setLoading(true);
      const response = await calificacionesService.reporteAlumno(matriculaBusqueda);
      
      if (response.success) {
        setReporteAlumno(response);
        setVistaActiva('alumno');
        toast.success('Reporte generado');
      }
    } catch (error) {
      console.error('Error al generar reporte:', error);
      toast.error(error.error || 'Error al generar reporte del alumno');
      setReporteAlumno(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Imprimir reporte
   */
  const imprimirReporte = () => {
    window.print();
  };

  /**
   * Obtener color según calificación
   */
  const getColorCalificacion = (calificacion) => {
    if (calificacion >= 90) return 'text-green-600 font-bold';
    if (calificacion >= 80) return 'text-blue-600 font-semibold';
    if (calificacion >= 70) return 'text-yellow-600';
    if (calificacion >= 60) return 'text-orange-600';
    return 'text-red-600 font-bold';
  };

  /**
   * Obtener badge según estatus
   */
  const getBadgeEstatus = (estatus) => {
    const colors = {
      'Excelente': 'badge-success',
      'Muy Bueno': 'badge-info',
      'Bueno': 'badge-warning',
      'Regular': 'badge-warning',
      'Reprobado': 'badge-error'
    };
    return colors[estatus] || 'badge-secondary';
  };

  return (
    <div className="fade-in">
      {/* Encabezado - No imprimir */}
      <div className="no-print mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Reportes Académicos</h1>
            <p className="text-gray-600 mt-1">Informes y estadísticas de calificaciones</p>
          </div>
          <button
            onClick={imprimirReporte}
            className="btn btn-primary"
          >
            <i className="fas fa-print mr-2"></i>
            Imprimir Reporte
          </button>
        </div>

        {/* Búsqueda de alumno */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            <i className="fas fa-user-graduate mr-2 text-primary-600"></i>
            Generar Reporte Individual
          </h2>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={matriculaBusqueda}
              onChange={(e) => setMatriculaBusqueda(e.target.value)}
              placeholder="Ingrese matrícula del alumno..."
              className="input flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') generarReporteAlumno();
              }}
            />
            <button
              onClick={generarReporteAlumno}
              className="btn btn-secondary"
              disabled={loading}
            >
              <i className="fas fa-file-alt mr-2"></i>
              Generar Reporte
            </button>
            <button
              onClick={cargarReporteGeneral}
              className="btn btn-info"
              disabled={loading}
            >
              <i className="fas fa-users mr-2"></i>
              Ver Reporte General
            </button>
          </div>
        </div>
      </div>

      {/* Contenido del Reporte - Para imprimir */}
      <div ref={reporteRef} className="print-content">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
          </div>
        ) : vistaActiva === 'alumno' && reporteAlumno ? (
          /* REPORTE INDIVIDUAL */
          <div className="card p-8">
            {/* Encabezado del reporte */}
            <div className="text-center mb-8 border-b-2 border-primary-600 pb-4">
              <h1 className="text-3xl font-bold text-primary-700 mb-2">
                Reporte Académico Individual
              </h1>
              <p className="text-gray-600">Sistema de Gestión Escolar - Telesecundaria</p>
              <p className="text-sm text-gray-500 mt-2">
                Generado el: {reporteAlumno.fechaGeneracion}
              </p>
            </div>

            {/* Información del alumno */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos del Estudiante</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nombre Completo:</p>
                  <p className="font-semibold text-lg">{reporteAlumno.alumno.NombreCompleto}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Matrícula:</p>
                  <p className="font-semibold">{reporteAlumno.alumno.Matricula}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grado:</p>
                  <p className="font-semibold">{reporteAlumno.alumno.Grado}°</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Semestre:</p>
                  <p className="font-semibold">{reporteAlumno.alumno.Semestre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aula:</p>
                  <p className="font-semibold">{reporteAlumno.alumno.Aula}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Promedio General:</p>
                  <p className={`text-2xl font-bold ${getColorCalificacion(reporteAlumno.estadisticas.promedioGeneral)}`}>
                    {reporteAlumno.estadisticas.promedioGeneral}
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-primary-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Promedio General</p>
                <p className="text-3xl font-bold text-primary-600">
                  {reporteAlumno.estadisticas.promedioGeneral}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Total Materias</p>
                <p className="text-3xl font-bold text-blue-600">
                  {reporteAlumno.estadisticas.totalMaterias}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Calificaciones</p>
                <p className="text-3xl font-bold text-green-600">
                  {reporteAlumno.estadisticas.totalCalificaciones}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Estatus</p>
                <p className={`text-lg font-bold badge ${getBadgeEstatus(reporteAlumno.estadisticas.estatusAcademico)} mt-2`}>
                  {reporteAlumno.estadisticas.estatusAcademico}
                </p>
              </div>
            </div>

            {/* Calificaciones por materia */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Calificaciones por Materia</h3>
              <table className="table table-print">
                <thead>
                  <tr>
                    <th>Materia</th>
                    {Object.keys(reporteAlumno.calificacionesPorPeriodo).map(periodo => (
                      <th key={periodo} className="text-center">{periodo}</th>
                    ))}
                    <th className="text-center">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(reporteAlumno.promediosMateria).map(([materia, data]) => (
                    <tr key={materia}>
                      <td className="font-semibold">{materia}</td>
                      {Object.keys(reporteAlumno.calificacionesPorPeriodo).map(periodo => (
                        <td key={periodo} className={`text-center ${getColorCalificacion(data.calificaciones[periodo] || 0)}`}>
                          {data.calificaciones[periodo] || '-'}
                        </td>
                      ))}
                      <td className={`text-center font-bold ${getColorCalificacion(data.promedio)}`}>
                        {data.promedio}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Promedios por periodo */}
            <div className="mt-6 pt-4 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Promedios por Periodo</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(reporteAlumno.promediosPorPeriodo).map(([periodo, promedio]) => (
                  <div key={periodo} className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">{periodo}</p>
                    <p className={`text-2xl font-bold ${getColorCalificacion(promedio)}`}>
                      {promedio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : vistaActiva === 'general' && reporteGeneral ? (
          /* REPORTE GENERAL */
          <div className="card p-8">
            {/* Encabezado del reporte */}
            <div className="text-center mb-8 border-b-2 border-primary-600 pb-4">
              <h1 className="text-3xl font-bold text-primary-700 mb-2">
                Reporte General de Calificaciones
              </h1>
              <p className="text-gray-600">Sistema de Gestión Escolar - Telesecundaria</p>
              <p className="text-sm text-gray-500 mt-2">
                Generado el: {reporteGeneral.fechaGeneracion}
              </p>
            </div>

            {/* Estadísticas generales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-50 p-6 rounded-lg text-center">
                <i className="fas fa-users text-4xl text-primary-600 mb-2"></i>
                <p className="text-sm text-gray-600 mb-1">Total de Alumnos</p>
                <p className="text-4xl font-bold text-primary-600">
                  {reporteGeneral.estadisticas.totalAlumnos}
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <i className="fas fa-chart-line text-4xl text-blue-600 mb-2"></i>
                <p className="text-sm text-gray-600 mb-1">Promedio Institucional</p>
                <p className={`text-4xl font-bold ${getColorCalificacion(reporteGeneral.estadisticas.promedioInstitucional)}`}>
                  {reporteGeneral.estadisticas.promedioInstitucional}
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-sm text-gray-600 mb-3 text-center font-semibold">Distribución por Desempeño</p>
                {Object.entries(reporteGeneral.estadisticas.distribucionRangos).map(([rango, cantidad]) => (
                  <div key={rango} className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">{rango}</span>
                    <span className="font-semibold text-green-600">{cantidad}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabla de alumnos */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Calificaciones por Alumno</h3>
              <table className="table table-print">
                <thead>
                  <tr>
                    <th>Matrícula</th>
                    <th>Nombre Completo</th>
                    <th className="text-center">Grado</th>
                    <th className="text-center">Semestre</th>
                    <th className="text-center">Calificaciones</th>
                    <th className="text-center">Promedio</th>
                    <th className="text-center">Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {reporteGeneral.alumnos.map((alumno) => (
                    <tr key={alumno.Matricula}>
                      <td className="font-mono">{alumno.Matricula}</td>
                      <td className="font-semibold">{alumno.NombreCompleto}</td>
                      <td className="text-center">{alumno.Grado}°</td>
                      <td className="text-center">{alumno.Semestre}</td>
                      <td className="text-center">{alumno.TotalCalificaciones}</td>
                      <td className={`text-center font-bold text-lg ${getColorCalificacion(alumno.PromedioGeneral)}`}>
                        {alumno.PromedioGeneral}
                      </td>
                      <td className="text-center">
                        <span className={`badge ${getBadgeEstatus(alumno.Estatus)} text-xs`}>
                          {alumno.Estatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-600 text-lg">No hay reporte para mostrar</p>
          </div>
        )}
      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-content {
            width: 100%;
            margin: 0;
            padding: 20px;
          }
          
          .card {
            box-shadow: none !important;
            border: none !important;
          }
          
          .table-print {
            font-size: 10px;
          }
          
          .table-print th,
          .table-print td {
            padding: 4px 8px;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default Reportes;





