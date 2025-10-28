/**
 * Página de Gestión de Maestros
 * CRUD completo
 */

import { useState, useEffect } from 'react';
import { maestrosService, aulasService } from '../services/api';
import { toast } from 'sonner';

const Maestros = () => {
  const [maestros, setMaestros] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState('crear');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    IdMaestro: '',
    Nombre: '',
    Apellidos: '',
    Telefono: '',
    Correo: '',
    Horario: '',
    IdAula: ''
  });

  // Cargar maestros y aulas al montar
  useEffect(() => {
    cargarDatos();
  }, []);

  /**
   * Cargar maestros y aulas
   */
  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar ambos en paralelo
      const [maestrosResponse, aulasResponse] = await Promise.all([
        maestrosService.getAll(),
        aulasService.getAll()
      ]);
      
      if (maestrosResponse.success) {
        setMaestros(maestrosResponse.maestros);
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
      IdMaestro: '',
      Nombre: '',
      Apellidos: '',
      Telefono: '',
      Correo: '',
      Horario: '',
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
   * Buscar maestro por ID
   */
  const buscarMaestro = async (id) => {
    try {
      const response = await maestrosService.getById(id);
      
      if (response.success) {
        setFormData(response.maestro);
        setFormMode('editar');
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error al buscar maestro:', error);
      toast.error('Error al buscar maestro');
    }
  };

  /**
   * Crear nuevo maestro
   */
  const crearMaestro = async (e) => {
    e.preventDefault();
    
    if (!formData.IdMaestro || !formData.Nombre || !formData.Apellidos) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await maestrosService.create(formData);

      if (response.success) {
        toast.success('Maestro registrado exitosamente');
        limpiarFormulario();
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al crear maestro:', error);
      toast.error(error.error || 'Error al crear maestro');
    }
  };

  /**
   * Actualizar maestro existente
   */
  const actualizarMaestro = async (e) => {
    e.preventDefault();
    
    if (!formData.Nombre || !formData.Apellidos) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await maestrosService.update(formData);

      if (response.success) {
        toast.success('Maestro actualizado exitosamente');
        limpiarFormulario();
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al actualizar maestro:', error);
      toast.error(error.error || 'Error al actualizar maestro');
    }
  };

  /**
   * Eliminar maestro
   */
  const eliminarMaestro = async (id, nombre) => {
    if (!confirm(`¿Está seguro de eliminar al maestro "${nombre}"?`)) {
      return;
    }

    try {
      const response = await maestrosService.delete(id);

      if (response.success) {
        toast.success('Maestro eliminado exitosamente');
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al eliminar maestro:', error);
      toast.error(error.error || 'Error al eliminar maestro');
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
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Maestros</h1>
          <p className="text-gray-600 mt-1">Administración del personal docente</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-user-plus mr-2"></i>
          Nuevo Maestro
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formMode === 'crear' ? 'Registrar Nuevo Maestro' : 'Editar Maestro'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={formMode === 'crear' ? crearMaestro : actualizarMaestro}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* ID Maestro */}
              <div>
                <label htmlFor="IdMaestro" className="label label-required">
                  ID de Maestro
                </label>
                <input
                  type="number"
                  id="IdMaestro"
                  name="IdMaestro"
                  value={formData.IdMaestro}
                  onChange={handleChange}
                  className="input"
                  placeholder="1001"
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

              {/* Apellidos */}
              <div>
                <label htmlFor="Apellidos" className="label label-required">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="Apellidos"
                  name="Apellidos"
                  value={formData.Apellidos}
                  onChange={handleChange}
                  className="input"
                  placeholder="López García"
                  required
                />
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
              <div>
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
                  placeholder="maestro@ejemplo.com"
                  required
                />
              </div>

              {/* Aula */}
              <div>
                <label htmlFor="IdAula" className="label label-required">
                  Aula Asignada
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

              {/* Horario */}
              <div className="md:col-span-2 lg:col-span-3">
                <label htmlFor="Horario" className="label label-required">
                  Horario
                </label>
                <input
                  type="text"
                  id="Horario"
                  name="Horario"
                  value={formData.Horario}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ej: Matutino 7:00-14:00"
                  required
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className={`btn ${formMode === 'crear' ? 'btn-success' : 'btn-warning'}`}
              >
                <i className={`fas ${formMode === 'crear' ? 'fa-plus' : 'fa-save'} mr-2`}></i>
                {formMode === 'crear' ? 'Registrar Maestro' : 'Guardar Cambios'}
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

      {/* Tabla de Maestros */}
      <div className="card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : maestros.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-chalkboard-teacher text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay maestros registrados</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Registrar Primer Maestro
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Aula</th>
                  <th>Horario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {maestros.map((maestro) => (
                  <tr key={maestro.IdMaestro}>
                    <td className="font-medium">{maestro.IdMaestro}</td>
                    <td>{maestro.Nombre} {maestro.Apellidos}</td>
                    <td>{maestro.Telefono}</td>
                    <td className="text-sm">{maestro.Correo}</td>
                    <td className="text-center">
                      <span className="badge badge-primary">
                        {maestro.IdAula}
                      </span>
                    </td>
                    <td className="text-sm">{maestro.Horario}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => buscarMaestro(maestro.IdMaestro)}
                          className="text-warning hover:text-orange-700 transition-colors"
                          title="Editar"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => eliminarMaestro(maestro.IdMaestro, `${maestro.Nombre} ${maestro.Apellidos}`)}
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
        {!loading && maestros.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total de maestros: <span className="font-semibold">{maestros.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maestros;





