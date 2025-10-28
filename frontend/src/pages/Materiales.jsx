/**
 * Página de Gestión de Materiales
 * CRUD completo
 */

import { useState, useEffect } from 'react';
import { materialesService } from '../services/api';
import { toast } from 'sonner';

const Materiales = () => {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState('crear');
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    IDMaterial: '',
    Nombre: '',
    CantidadDisponible: '',
    Descripcion: ''
  });

  // Cargar materiales al montar
  useEffect(() => {
    cargarMateriales();
  }, []);

  /**
   * Cargar todos los materiales
   */
  const cargarMateriales = async () => {
    try {
      setLoading(true);
      const response = await materialesService.getAll();
      
      if (response.success) {
        setMateriales(response.materiales);
      }
    } catch (error) {
      console.error('Error al cargar materiales:', error);
      toast.error('Error al cargar materiales');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar formulario
   */
  const limpiarFormulario = () => {
    setFormData({
      IDMaterial: '',
      Nombre: '',
      CantidadDisponible: '',
      Descripcion: ''
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
   * Buscar material por ID
   */
  const buscarMaterial = async (id) => {
    try {
      const response = await materialesService.getById(id);
      
      if (response.success) {
        setFormData(response.material);
        setFormMode('editar');
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error al buscar material:', error);
      toast.error('Error al buscar material');
    }
  };

  /**
   * Crear nuevo material
   */
  const crearMaterial = async (e) => {
    e.preventDefault();
    
    if (!formData.IDMaterial || !formData.Nombre || !formData.CantidadDisponible) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await materialesService.create(formData);

      if (response.success) {
        toast.success('Material registrado exitosamente');
        limpiarFormulario();
        cargarMateriales();
      }
    } catch (error) {
      console.error('Error al crear material:', error);
      toast.error(error.error || 'Error al crear material');
    }
  };

  /**
   * Actualizar material existente
   */
  const actualizarMaterial = async (e) => {
    e.preventDefault();
    
    if (!formData.Nombre || !formData.CantidadDisponible) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    try {
      const response = await materialesService.update(formData);

      if (response.success) {
        toast.success('Material actualizado exitosamente');
        limpiarFormulario();
        cargarMateriales();
      }
    } catch (error) {
      console.error('Error al actualizar material:', error);
      toast.error(error.error || 'Error al actualizar material');
    }
  };

  /**
   * Eliminar material
   */
  const eliminarMaterial = async (id, nombre) => {
    if (!confirm(`¿Está seguro de eliminar el material "${nombre}"?\n\nNo se puede eliminar si tiene préstamos registrados.`)) {
      return;
    }

    try {
      const response = await materialesService.delete(id);

      if (response.success) {
        toast.success('Material eliminado exitosamente');
        cargarMateriales();
      }
    } catch (error) {
      console.error('Error al eliminar material:', error);
      toast.error(error.error || 'Error al eliminar material');
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
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Materiales</h1>
          <p className="text-gray-600 mt-1">Inventario de materiales y equipamiento</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Nuevo Material
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formMode === 'crear' ? 'Registrar Nuevo Material' : 'Editar Material'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={formMode === 'crear' ? crearMaterial : actualizarMaterial}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* ID Material */}
              <div>
                <label htmlFor="IDMaterial" className="label label-required">
                  ID del Material
                </label>
                <input
                  type="number"
                  id="IDMaterial"
                  name="IDMaterial"
                  value={formData.IDMaterial}
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
                  Nombre del Material
                </label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ej: Proyector, Laptop, Balón"
                  required
                />
              </div>

              {/* Cantidad Disponible */}
              <div>
                <label htmlFor="CantidadDisponible" className="label label-required">
                  Cantidad Disponible
                </label>
                <input
                  type="number"
                  id="CantidadDisponible"
                  name="CantidadDisponible"
                  value={formData.CantidadDisponible}
                  onChange={handleChange}
                  className="input"
                  placeholder="10"
                  min="0"
                  required
                />
              </div>

              {/* Descripción */}
              <div className="md:col-span-2 lg:col-span-3">
                <label htmlFor="Descripcion" className="label label-required">
                  Descripción
                </label>
                <textarea
                  id="Descripcion"
                  name="Descripcion"
                  value={formData.Descripcion}
                  onChange={handleChange}
                  className="input"
                  placeholder="Descripción detallada del material..."
                  rows="3"
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
                {formMode === 'crear' ? 'Registrar Material' : 'Guardar Cambios'}
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

      {/* Tabla de Materiales */}
      <div className="card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : materiales.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-boxes text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay materiales registrados</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-plus mr-2"></i>
                Registrar Primer Material
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Cantidad Disponible</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((material) => (
                  <tr key={material.IDMaterial}>
                    <td className="font-medium">
                      <span className="badge badge-primary text-lg">
                        {material.IDMaterial}
                      </span>
                    </td>
                    <td className="font-medium">{material.Nombre}</td>
                    <td className="text-center">
                      <span className={`badge ${
                        material.CantidadDisponible === 0 
                          ? 'badge-error' 
                          : material.CantidadDisponible < 5 
                            ? 'badge-warning' 
                            : 'badge-success'
                      }`}>
                        {material.CantidadDisponible} unidades
                      </span>
                    </td>
                    <td className="text-sm text-gray-600 max-w-xs truncate">
                      {material.Descripcion}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => buscarMaterial(material.IDMaterial)}
                          className="text-warning hover:text-orange-700 transition-colors"
                          title="Editar"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => eliminarMaterial(material.IDMaterial, material.Nombre)}
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
        {!loading && materiales.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Total de materiales: <span className="font-semibold">{materiales.length}</span>
              </p>
              <p className="text-sm text-gray-600">
                Stock total: <span className="font-semibold">
                  {materiales.reduce((sum, m) => sum + parseInt(m.CantidadDisponible), 0)} unidades
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Materiales;





