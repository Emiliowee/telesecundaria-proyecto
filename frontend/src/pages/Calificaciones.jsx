/**
 * Página de Gestión de Calificaciones
 * CRUD para calificaciones de alumnos
 */

import { useState, useEffect } from 'react';
import { calificacionesService, alumnosService, materiasService } from '../services/api';
import { toast } from 'sonner';

const Calificaciones = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  
  const [formData, setFormData] = useState({
    Matricula: '',
    IDMateria: '',
    Calificacion: '',
    PeriodoBimestre: ''
  });

  const [busquedaMatricula, setBusquedaMatricula] = useState('');
  const [alumnoEncontrado, setAlumnoEncontrado] = useState(null);

  const periodos = [
    'Bimestre 1',
    'Bimestre 2',
    'Bimestre 3',
    'Bimestre 4',
    'Bimestre 5',
    'Bimestre 6'
  ];

  // Cargar datos al montar
  useEffect(() => {
    cargarDatos();
  }, []);

  /**
   * Cargar datos desde el servidor
   */
  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [calificacionesResponse, alumnosResponse, materiasResponse] = await Promise.all([
        calificacionesService.getAll(),
        alumnosService.getAll(),
        materiasService.getAll()
      ]);
      
      if (calificacionesResponse.success) {
        setCalificaciones(calificacionesResponse.calificaciones);
      }
      
      if (alumnosResponse.success) {
        setAlumnos(alumnosResponse.alumnos);
      }
      
      if (materiasResponse.success) {
        setMaterias(materiasResponse.materias);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar formulario
   */
  const limpiarFormulario = () => {
    setFormData({
      Matricula: '',
      IDMateria: '',
      Calificacion: '',
      PeriodoBimestre: ''
    });
    setShowForm(false);
    setModoEdicion(false);
  };

  /**
   * Manejar cambios en inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Buscar alumno para consultar calificaciones
   */
  const buscarAlumno = async () => {
    if (!busquedaMatricula.trim()) {
      toast.error('Ingrese una matrícula');
      return;
    }

    try {
      const response = await calificacionesService.buscarAlumno(busquedaMatricula);
      
      if (response.success) {
        setAlumnoEncontrado(response);
        toast.success('Alumno encontrado');
      }
    } catch (error) {
      console.error('Error al buscar alumno:', error);
      toast.error(error.error || 'Alumno no encontrado');
      setAlumnoEncontrado(null);
    }
  };

  /**
   * Guardar calificación (crear o actualizar)
   */
  const guardarCalificacion = async (e) => {
    e.preventDefault();
    
    if (!formData.Matricula || !formData.IDMateria || !formData.Calificacion || !formData.PeriodoBimestre) {
      toast.error('Complete todos los campos');
      return;
    }

    const calificacion = parseInt(formData.Calificacion);
    if (calificacion < 0 || calificacion > 100) {
      toast.error('La calificación debe estar entre 0 y 100');
      return;
    }

    try {
      const datos = {
        Matricula: formData.Matricula,
        IDMateria: parseInt(formData.IDMateria),
        Calificacion: calificacion,
        PeriodoBimestre: formData.PeriodoBimestre
      };

      let response;
      
      if (modoEdicion) {
        response = await calificacionesService.update(datos);
        toast.success('Calificación actualizada exitosamente');
      } else {
        response = await calificacionesService.create(datos);
        toast.success('Calificación registrada exitosamente');
      }

      if (response.success) {
        limpiarFormulario();
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al guardar calificación:', error);
      toast.error(error.error || `Error al ${modoEdicion ? 'actualizar' : 'registrar'} calificación`);
    }
  };

  /**
   * Editar calificación
   */
  const editarCalificacion = (calificacion) => {
    setModoEdicion(true);
    setShowForm(true);
    setFormData({
      Matricula: calificacion.Matricula,
      IDMateria: calificacion.IDMateria,
      Calificacion: calificacion.Calificacion,
      PeriodoBimestre: calificacion.PeriodoBimestre
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Eliminar calificación
   */
  const eliminarCalificacion = async (calificacion) => {
    if (!confirm(`¿Eliminar calificación de ${calificacion.NombreAlumno} en ${calificacion.NombreMateria}?`)) {
      return;
    }

    try {
      const datos = {
        Matricula: calificacion.Matricula,
        IDMateria: calificacion.IDMateria,
        PeriodoBimestre: calificacion.PeriodoBimestre
      };

      const response = await calificacionesService.delete(datos);

      if (response.success) {
        toast.success('Calificación eliminada exitosamente');
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al eliminar calificación:', error);
      toast.error(error.error || 'Error al eliminar calificación');
    }
  };

  /**
   * Abrir formulario para crear
   */
  const abrirFormularioCrear = () => {
    limpiarFormulario();
    setShowForm(true);
    setModoEdicion(false);
  };

  return (
    <div className="fade-in">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Calificaciones</h1>
          <p className="text-gray-600 mt-1">Gestión de calificaciones de alumnos</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Nueva Calificación
        </button>
      </div>

      {/* Búsqueda de Alumno */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          <i className="fas fa-search mr-2 text-primary-600"></i>
          Buscar Calificaciones por Alumno
        </h2>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={busquedaMatricula}
              onChange={(e) => setBusquedaMatricula(e.target.value)}
              placeholder="Ingrese matrícula del alumno..."
              className="input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') buscarAlumno();
              }}
            />
          </div>
          <button
            onClick={buscarAlumno}
            className="btn btn-secondary"
          >
            <i className="fas fa-search mr-2"></i>
            Buscar
          </button>
        </div>

        {/* Resultados de búsqueda */}
        {alumnoEncontrado && (
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {alumnoEncontrado.alumno.NombreCompleto}
                </h3>
                <p className="text-sm text-gray-600">
                  Matrícula: {alumnoEncontrado.alumno.Matricula} | 
                  Grado: {alumnoEncontrado.alumno.Grado} | 
                  Semestre: {alumnoEncontrado.alumno.Semestre}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-3xl font-bold text-primary-600">
                  {alumnoEncontrado.promedio}
                </p>
              </div>
            </div>

            {alumnoEncontrado.calificaciones.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Materia</th>
                      <th className="text-center">Periodo</th>
                      <th className="text-center">Calificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnoEncontrado.calificaciones.map((cal, idx) => (
                      <tr key={idx}>
                        <td>{cal.NombreMateria}</td>
                        <td className="text-center">
                          <span className="badge badge-info">{cal.PeriodoBimestre}</span>
                        </td>
                        <td className="text-center">
                          <span className={`badge text-lg ${
                            cal.Calificacion >= 80 ? 'badge-success' :
                            cal.Calificacion >= 60 ? 'badge-warning' :
                            'badge-error'
                          }`}>
                            {cal.Calificacion}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">
                <i className="fas fa-info-circle mr-2"></i>
                No hay calificaciones registradas para este alumno
              </p>
            )}
          </div>
        )}
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {modoEdicion ? 'Editar Calificación' : 'Registrar Nueva Calificación'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={guardarCalificacion}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="Matricula" className="label label-required">
                  Alumno
                </label>
                <select
                  id="Matricula"
                  name="Matricula"
                  value={formData.Matricula}
                  onChange={handleChange}
                  className={`input ${modoEdicion ? 'bg-gray-100' : ''}`}
                  disabled={modoEdicion}
                  required
                >
                  <option value="">Seleccione un alumno...</option>
                  {alumnos.map((alumno) => (
                    <option key={alumno.Matricula} value={alumno.Matricula}>
                      {alumno.Nombre} {alumno.ApellidoPaterno} {alumno.ApellidoMaterno} - {alumno.Matricula}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="IDMateria" className="label label-required">
                  Materia
                </label>
                <select
                  id="IDMateria"
                  name="IDMateria"
                  value={formData.IDMateria}
                  onChange={handleChange}
                  className={`input ${modoEdicion ? 'bg-gray-100' : ''}`}
                  disabled={modoEdicion}
                  required
                >
                  <option value="">Seleccione una materia...</option>
                  {materias.map((materia) => (
                    <option key={materia.IDMateria} value={materia.IDMateria}>
                      {materia.Nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="PeriodoBimestre" className="label label-required">
                  Periodo
                </label>
                <select
                  id="PeriodoBimestre"
                  name="PeriodoBimestre"
                  value={formData.PeriodoBimestre}
                  onChange={handleChange}
                  className={`input ${modoEdicion ? 'bg-gray-100' : ''}`}
                  disabled={modoEdicion}
                  required
                >
                  <option value="">Seleccione un periodo...</option>
                  {periodos.map((periodo) => (
                    <option key={periodo} value={periodo}>
                      {periodo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="Calificacion" className="label label-required">
                  Calificación (0-100)
                </label>
                <input
                  type="number"
                  id="Calificacion"
                  name="Calificacion"
                  value={formData.Calificacion}
                  onChange={handleChange}
                  className="input"
                  min="0"
                  max="100"
                  placeholder="Ej: 85"
                  required
                />
              </div>
            </div>

            {modoEdicion && (
              <p className="text-xs text-gray-500 mb-4">
                <i className="fas fa-info-circle mr-1"></i>
                No se puede cambiar el alumno, materia o periodo en modo edición
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="btn btn-success"
              >
                <i className="fas fa-check mr-2"></i>
                {modoEdicion ? 'Actualizar Calificación' : 'Registrar Calificación'}
              </button>
              <button
                type="button"
                onClick={limpiarFormulario}
                className="btn btn-secondary"
              >
                <i className="fas fa-times mr-2"></i>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de Calificaciones */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Todas las Calificaciones
          </h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : calificaciones.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-graduation-cap text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay calificaciones registradas</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-plus mr-2"></i>
                Registrar Primera Calificación
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Matrícula</th>
                  <th>Materia</th>
                  <th className="text-center">Periodo</th>
                  <th className="text-center">Calificación</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {calificaciones.map((calificacion, index) => (
                  <tr key={index}>
                    <td>{calificacion.NombreAlumno}</td>
                    <td className="text-center">
                      <span className="badge badge-primary">{calificacion.Matricula}</span>
                    </td>
                    <td>{calificacion.NombreMateria}</td>
                    <td className="text-center">
                      <span className="badge badge-info">{calificacion.PeriodoBimestre}</span>
                    </td>
                    <td className="text-center">
                      <span className={`badge text-lg ${
                        calificacion.Calificacion >= 80 ? 'badge-success' :
                        calificacion.Calificacion >= 60 ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {calificacion.Calificacion}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => editarCalificacion(calificacion)}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                          title="Editar calificación"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => eliminarCalificacion(calificacion)}
                          className="text-error hover:text-red-700 transition-colors"
                          title="Eliminar calificación"
                        >
                          <i className="fas fa-trash text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer con contador */}
        {!loading && calificaciones.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total de calificaciones: <span className="font-semibold">{calificaciones.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calificaciones;

