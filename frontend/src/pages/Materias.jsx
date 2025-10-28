/**
 * Página de Gestión de Materias
 * CRUD completo
 */

import { useState, useEffect } from 'react';
import { materiasService } from '../services/api';
import { toast } from 'sonner';

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState('crear');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    IDMateria: '',
    Nombre: ''
  });

  // Cargar materias al montar
  useEffect(() => {
    cargarMaterias();
  }, []);

  /**
   * Cargar todas las materias
   */
  const cargarMaterias = async () => {
    try {
      setLoading(true);
      const response = await materiasService.getAll();
      
      if (response.success) {
        setMaterias(response.materias);
      }
    } catch (error) {
      console.error('Error al cargar materias:', error);
      toast.error('Error al cargar materias');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar formulario
   */
  const limpiarFormulario = () => {
    setFormData({
      IDMateria: '',
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
   * Buscar materia por ID
   */
  const buscarMateria = async (id) => {
    try {
      const response = await materiasService.getById(id);
      
      if (response.success) {
        setFormData(response.materia);
        setFormMode('editar');
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error al buscar materia:', error);
      toast.error('Error al buscar materia');
    }
  };

  /**
   * Crear nueva materia
   */
  const crearMateria = async (e) => {
    e.preventDefault();
    
    if (!formData.IDMateria || !formData.Nombre) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await materiasService.create(formData);

      if (response.success) {
        toast.success('Materia registrada exitosamente');
        limpiarFormulario();
        cargarMaterias();
      }
    } catch (error) {
      console.error('Error al crear materia:', error);
      toast.error(error.error || 'Error al crear materia');
    }
  };

  /**
   * Actualizar materia existente
   */
  const actualizarMateria = async (e) => {
    e.preventDefault();
    
    if (!formData.Nombre) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await materiasService.update(formData);

      if (response.success) {
        toast.success('Materia actualizada exitosamente');
        limpiarFormulario();
        cargarMaterias();
      }
    } catch (error) {
      console.error('Error al actualizar materia:', error);
      toast.error(error.error || 'Error al actualizar materia');
    }
  };

  /**
   * Eliminar materia
   */
  const eliminarMateria = async (id, nombre) => {
    if (!confirm(`¿Está seguro de eliminar la materia "${nombre}"?\n\nNo se puede eliminar si tiene calificaciones o maestros asignados.`)) {
      return;
    }

    try {
      const response = await materiasService.delete(id);

      if (response.success) {
        toast.success('Materia eliminada exitosamente');
        cargarMaterias();
      }
    } catch (error) {
      console.error('Error al eliminar materia:', error);
      toast.error(error.error || 'Error al eliminar materia');
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
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Materias</h1>
          <p className="text-gray-600 mt-1">Catálogo de materias educativas</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Nueva Materia
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formMode === 'crear' ? 'Registrar Nueva Materia' : 'Editar Materia'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={formMode === 'crear' ? crearMateria : actualizarMateria}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID Materia */}
              <div>
                <label htmlFor="IDMateria" className="label label-required">
                  ID de la Materia
                </label>
                <input
                  type="number"
                  id="IDMateria"
                  name="IDMateria"
                  value={formData.IDMateria}
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
                  Nombre de la Materia
                </label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ej: Matemáticas, Español, Ciencias"
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
                {formMode === 'crear' ? 'Registrar Materia' : 'Guardar Cambios'}
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

      {/* Tabla de Materias */}
      <div className="card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : materias.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-book text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay materias registradas</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-plus mr-2"></i>
                Registrar Primera Materia
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de la Materia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materias.map((materia) => (
                  <tr key={materia.IDMateria}>
                    <td className="font-medium">
                      <span className="badge badge-primary text-lg">
                        {materia.IDMateria}
                      </span>
                    </td>
                    <td className="font-medium text-lg">{materia.Nombre}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => buscarMateria(materia.IDMateria)}
                          className="text-warning hover:text-orange-700 transition-colors"
                          title="Editar"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => eliminarMateria(materia.IDMateria, materia.Nombre)}
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
        {!loading && materias.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total de materias: <span className="font-semibold">{materias.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materias;





