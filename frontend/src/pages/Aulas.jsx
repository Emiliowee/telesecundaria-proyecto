/**
 * Página de Gestión de Aulas
 * CRUD completo
 */

import { useState, useEffect } from 'react';
import { aulasService } from '../services/api';
import { toast } from 'sonner';

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState('crear');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    IDAula: '',
    Capacidad: '',
    Nombre: ''
  });

  // Cargar aulas al montar
  useEffect(() => {
    cargarAulas();
  }, []);

  /**
   * Cargar todas las aulas
   */
  const cargarAulas = async () => {
    try {
      setLoading(true);
      const response = await aulasService.getAll();
      
      if (response.success) {
        setAulas(response.aulas);
      }
    } catch (error) {
      console.error('Error al cargar aulas:', error);
      toast.error('Error al cargar aulas');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar formulario
   */
  const limpiarFormulario = () => {
    setFormData({
      IDAula: '',
      Capacidad: '',
      Nombre: ''
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
   * Buscar aula por ID
   */
  const buscarAula = async (id) => {
    try {
      const response = await aulasService.getById(id);
      
      if (response.success) {
        setFormData(response.aula);
        setFormMode('editar');
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error al buscar aula:', error);
      toast.error('Error al buscar aula');
    }
  };

  /**
   * Crear nueva aula
   */
  const crearAula = async (e) => {
    e.preventDefault();
    
    if (!formData.IDAula || !formData.Capacidad || !formData.Nombre) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await aulasService.create(formData);

      if (response.success) {
        toast.success('Aula registrada exitosamente');
        limpiarFormulario();
        cargarAulas();
      }
    } catch (error) {
      console.error('Error al crear aula:', error);
      toast.error(error.error || 'Error al crear aula');
    }
  };

  /**
   * Actualizar aula existente
   */
  const actualizarAula = async (e) => {
    e.preventDefault();
    
    if (!formData.Capacidad || !formData.Nombre) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await aulasService.update(formData);

      if (response.success) {
        toast.success('Aula actualizada exitosamente');
        limpiarFormulario();
        cargarAulas();
      }
    } catch (error) {
      console.error('Error al actualizar aula:', error);
      toast.error(error.error || 'Error al actualizar aula');
    }
  };

  /**
   * Eliminar aula
   */
  const eliminarAula = async (id, nombre) => {
    if (!confirm(`¿Está seguro de eliminar el aula "${nombre}"?\n\nNo se puede eliminar si tiene maestros o alumnos asignados.`)) {
      return;
    }

    try {
      const response = await aulasService.delete(id);

      if (response.success) {
        toast.success('Aula eliminada exitosamente');
        cargarAulas();
      }
    } catch (error) {
      console.error('Error al eliminar aula:', error);
      toast.error(error.error || 'Error al eliminar aula');
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
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Aulas</h1>
          <p className="text-gray-600 mt-1">Administración de salones de clase</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Nueva Aula
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formMode === 'crear' ? 'Registrar Nueva Aula' : 'Editar Aula'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={formMode === 'crear' ? crearAula : actualizarAula}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ID Aula */}
              <div>
                <label htmlFor="IDAula" className="label label-required">
                  ID del Aula
                </label>
                <input
                  type="number"
                  id="IDAula"
                  name="IDAula"
                  value={formData.IDAula}
                  onChange={handleChange}
                  className="input"
                  placeholder="1"
                  required
                  disabled={formMode === 'editar'}
                />
              </div>

              {/* Nombre */}
              <div>
                <label htmlFor="Nombre" className="label label-required">
                  Nombre del Aula
                </label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                  className="input"
                  placeholder="Aula A"
                  required
                />
              </div>

              {/* Capacidad */}
              <div>
                <label htmlFor="Capacidad" className="label label-required">
                  Capacidad (alumnos)
                </label>
                <input
                  type="number"
                  id="Capacidad"
                  name="Capacidad"
                  value={formData.Capacidad}
                  onChange={handleChange}
                  className="input"
                  placeholder="30"
                  min="1"
                  max="100"
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
                {formMode === 'crear' ? 'Registrar Aula' : 'Guardar Cambios'}
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

      {/* Tabla de Aulas */}
      <div className="card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : aulas.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-door-open text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay aulas registradas</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-plus mr-2"></i>
                Registrar Primera Aula
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Capacidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {aulas.map((aula) => (
                  <tr key={aula.IDAula}>
                    <td className="font-medium">
                      <span className="badge badge-primary text-lg">
                        {aula.IDAula}
                      </span>
                    </td>
                    <td className="font-medium">{aula.Nombre}</td>
                    <td className="text-center">
                      <span className="badge badge-info">
                        {aula.Capacidad} alumnos
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => buscarAula(aula.IDAula)}
                          className="text-warning hover:text-orange-700 transition-colors"
                          title="Editar"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => eliminarAula(aula.IDAula, aula.Nombre)}
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
        {!loading && aulas.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total de aulas: <span className="font-semibold">{aulas.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aulas;





