/**
 * Página de Gestión de Alumnos
 * CRUD completo con datos del alumno y tutor
 */

import { useState, useEffect } from 'react';
import { alumnosService, aulasService } from '../services/api';
import { toast } from 'sonner';

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState('crear');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    Matricula: '',
    Nombre: '',
    ApellidoPaterno: '',
    ApellidoMaterno: '',
    Edad: '',
    Semestre: '',
    Grado: '',
    Correo: '',
    Telefono: '',
    NombreTutor: '',
    TelefonoTutor: '',
    CorreoTutor: '',
    IdAula: ''
  });

  // Cargar alumnos y aulas al montar
  useEffect(() => {
    cargarDatos();
  }, []);

  /**
   * Cargar alumnos y aulas
   */
  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      const [alumnosResponse, aulasResponse] = await Promise.all([
        alumnosService.getAll(),
        aulasService.getAll()
      ]);
      
      if (alumnosResponse.success) {
        setAlumnos(alumnosResponse.alumnos);
      }
      
      if (aulasResponse.success) {
        setAulas(aulasResponse.aulas);
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
      Nombre: '',
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      Edad: '',
      Semestre: '',
      Grado: '',
      Correo: '',
      Telefono: '',
      NombreTutor: '',
      TelefonoTutor: '',
      CorreoTutor: '',
      IdAula: ''
    });
    setFormMode('crear');
    setShowForm(false);
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
   * Buscar alumno por matrícula
   */
  const buscarAlumno = async (matricula) => {
    try {
      const response = await alumnosService.getByMatricula(matricula);
      
      if (response.success) {
        setFormData(response.alumno);
        setFormMode('editar');
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error al buscar alumno:', error);
      toast.error('Error al buscar alumno');
    }
  };

  /**
   * Crear nuevo alumno
   */
  const crearAlumno = async (e) => {
    e.preventDefault();
    
    if (!formData.Matricula || !formData.Nombre || !formData.ApellidoPaterno) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await alumnosService.create(formData);

      if (response.success) {
        toast.success('Alumno registrado exitosamente');
        limpiarFormulario();
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al crear alumno:', error);
      toast.error(error.error || 'Error al crear alumno');
    }
  };

  /**
   * Actualizar alumno existente
   */
  const actualizarAlumno = async (e) => {
    e.preventDefault();
    
    if (!formData.Nombre || !formData.ApellidoPaterno) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await alumnosService.update(formData);

      if (response.success) {
        toast.success('Alumno actualizado exitosamente');
        limpiarFormulario();
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al actualizar alumno:', error);
      toast.error(error.error || 'Error al actualizar alumno');
    }
  };

  /**
   * Eliminar alumno
   */
  const eliminarAlumno = async (matricula, nombre) => {
    if (!confirm(`¿Está seguro de eliminar al alumno "${nombre}"?\n\nEsto también eliminará sus calificaciones y préstamos.`)) {
      return;
    }

    try {
      const response = await alumnosService.delete(matricula);

      if (response.success) {
        toast.success('Alumno eliminado exitosamente');
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al eliminar alumno:', error);
      toast.error(error.error || 'Error al eliminar alumno');
    }
  };

  /**
   * Abrir formulario para crear
   */
  const abrirFormularioCrear = () => {
    limpiarFormulario();
    setFormMode('crear');
    setShowForm(true);
  };

  return (
    <div className="fade-in">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Alumnos</h1>
          <p className="text-gray-600 mt-1">Registro y administración de estudiantes</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-user-plus mr-2"></i>
          Nuevo Alumno
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formMode === 'crear' ? 'Registrar Nuevo Alumno' : 'Editar Alumno'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={formMode === 'crear' ? crearAlumno : actualizarAlumno}>
            {/* Sección: Datos del Alumno */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary-700 mb-4 border-b pb-2">
                <i className="fas fa-user mr-2"></i>
                Datos del Alumno
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Matrícula */}
                <div>
                  <label htmlFor="Matricula" className="label label-required">
                    Matrícula
                  </label>
                  <input
                    type="text"
                    id="Matricula"
                    name="Matricula"
                    value={formData.Matricula}
                    onChange={handleChange}
                    className="input"
                    placeholder="202400001"
                    required
                    disabled={formMode === 'editar'}
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label htmlFor="Nombre" className="label label-required">
                    Nombre(s)
                  </label>
                  <input
                    type="text"
                    id="Nombre"
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleChange}
                    className="input"
                    placeholder="Juan Carlos"
                    required
                  />
                </div>

                {/* Apellido Paterno */}
                <div>
                  <label htmlFor="ApellidoPaterno" className="label label-required">
                    Apellido Paterno
                  </label>
                  <input
                    type="text"
                    id="ApellidoPaterno"
                    name="ApellidoPaterno"
                    value={formData.ApellidoPaterno}
                    onChange={handleChange}
                    className="input"
                    placeholder="García"
                    required
                  />
                </div>

                {/* Apellido Materno */}
                <div>
                  <label htmlFor="ApellidoMaterno" className="label label-required">
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    id="ApellidoMaterno"
                    name="ApellidoMaterno"
                    value={formData.ApellidoMaterno}
                    onChange={handleChange}
                    className="input"
                    placeholder="López"
                    required
                  />
                </div>

                {/* Edad */}
                <div>
                  <label htmlFor="Edad" className="label label-required">
                    Edad
                  </label>
                  <input
                    type="number"
                    id="Edad"
                    name="Edad"
                    value={formData.Edad}
                    onChange={handleChange}
                    className="input"
                    placeholder="13"
                    min="10"
                    max="18"
                    required
                  />
                </div>

                {/* Grado */}
                <div>
                  <label htmlFor="Grado" className="label label-required">
                    Grado
                  </label>
                  <select
                    id="Grado"
                    name="Grado"
                    value={formData.Grado}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="1">1° Grado</option>
                    <option value="2">2° Grado</option>
                    <option value="3">3° Grado</option>
                  </select>
                </div>

                {/* Semestre */}
                <div>
                  <label htmlFor="Semestre" className="label label-required">
                    Semestre
                  </label>
                  <select
                    id="Semestre"
                    name="Semestre"
                    value={formData.Semestre}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="1">1° Semestre</option>
                    <option value="2">2° Semestre</option>
                    <option value="3">3° Semestre</option>
                    <option value="4">4° Semestre</option>
                    <option value="5">5° Semestre</option>
                    <option value="6">6° Semestre</option>
                  </select>
                </div>

                {/* Aula */}
                <div>
                  <label htmlFor="IdAula" className="label label-required">
                    Aula
                  </label>
                  <select
                    id="IdAula"
                    name="IdAula"
                    value={formData.IdAula}
                    onChange={handleChange}
                    className="input"
                    required
                  >
                    <option value="">Seleccione un aula...</option>
                    {aulas.map((aula) => (
                      <option key={aula.IDAula} value={aula.IDAula}>
                        Aula {aula.IDAula} - Capacidad: {aula.Capacidad}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="Telefono" className="label label-required">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="Telefono"
                    name="Telefono"
                    value={formData.Telefono}
                    onChange={handleChange}
                    className="input"
                    placeholder="5551234567"
                    required
                  />
                </div>

                {/* Correo */}
                <div className="md:col-span-2">
                  <label htmlFor="Correo" className="label label-required">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="Correo"
                    name="Correo"
                    value={formData.Correo}
                    onChange={handleChange}
                    className="input"
                    placeholder="alumno@ejemplo.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sección: Datos del Tutor */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-secondary-700 mb-4 border-b pb-2">
                <i className="fas fa-user-friends mr-2"></i>
                Datos del Tutor / Padre
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Nombre del Tutor */}
                <div>
                  <label htmlFor="NombreTutor" className="label label-required">
                    Nombre Completo del Tutor
                  </label>
                  <input
                    type="text"
                    id="NombreTutor"
                    name="NombreTutor"
                    value={formData.NombreTutor}
                    onChange={handleChange}
                    className="input"
                    placeholder="María López de García"
                    required
                  />
                </div>

                {/* Teléfono del Tutor */}
                <div>
                  <label htmlFor="TelefonoTutor" className="label label-required">
                    Teléfono del Tutor
                  </label>
                  <input
                    type="tel"
                    id="TelefonoTutor"
                    name="TelefonoTutor"
                    value={formData.TelefonoTutor}
                    onChange={handleChange}
                    className="input"
                    placeholder="5559876543"
                    required
                  />
                </div>

                {/* Correo del Tutor */}
                <div>
                  <label htmlFor="CorreoTutor" className="label label-required">
                    Correo del Tutor
                  </label>
                  <input
                    type="email"
                    id="CorreoTutor"
                    name="CorreoTutor"
                    value={formData.CorreoTutor}
                    onChange={handleChange}
                    className="input"
                    placeholder="tutor@ejemplo.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                type="submit"
                className={`btn ${formMode === 'crear' ? 'btn-success' : 'btn-warning'}`}
              >
                <i className={`fas ${formMode === 'crear' ? 'fa-plus' : 'fa-save'} mr-2`}></i>
                {formMode === 'crear' ? 'Registrar Alumno' : 'Guardar Cambios'}
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

      {/* Tabla de Alumnos */}
      <div className="card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : alumnos.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-user-graduate text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay alumnos registrados</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Registrar Primer Alumno
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nombre Completo</th>
                  <th>Edad</th>
                  <th>Grado</th>
                  <th>Semestre</th>
                  <th>Aula</th>
                  <th>Teléfono</th>
                  <th>Tutor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.Matricula}>
                    <td className="font-medium">{alumno.Matricula}</td>
                    <td>{alumno.Nombre} {alumno.ApellidoPaterno} {alumno.ApellidoMaterno}</td>
                    <td className="text-center">{alumno.Edad}</td>
                    <td className="text-center">{alumno.Grado}°</td>
                    <td className="text-center">{alumno.Semestre}°</td>
                    <td className="text-center">
                      <span className="badge badge-primary">
                        {alumno.IdAula}
                      </span>
                    </td>
                    <td className="text-sm">{alumno.Telefono}</td>
                    <td className="text-sm">{alumno.NombreTutor}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => buscarAlumno(alumno.Matricula)}
                          className="text-warning hover:text-orange-700 transition-colors"
                          title="Editar"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => eliminarAlumno(
                            alumno.Matricula, 
                            `${alumno.Nombre} ${alumno.ApellidoPaterno} ${alumno.ApellidoMaterno}`
                          )}
                          className="text-error hover:text-red-700 transition-colors"
                          title="Eliminar"
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
        {!loading && alumnos.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total de alumnos: <span className="font-semibold">{alumnos.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumnos;
