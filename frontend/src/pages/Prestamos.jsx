/**
 * Página de Gestión de Préstamos
 * CRUD para préstamos de materiales
 */

import { useState, useEffect } from 'react';
import { prestamosService, materialesService } from '../services/api';
import { toast } from 'sonner';

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  
  const [formData, setFormData] = useState({
    Matricula: '',
    NombreAlumno: '',
    FechaPrestamo: '',
    FechaDevolucion: '',
    materiales: []
  });

  const [materialActual, setMaterialActual] = useState({
    IDMaterial: '',
    Cantidad: ''
  });

  // Cargar datos al montar
  useEffect(() => {
    cargarDatos();
  }, []);

  /**
   * Cargar préstamos y materiales
   */
  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      const [prestamosResponse, materialesResponse] = await Promise.all([
        prestamosService.getAll(),
        materialesService.getAll()
      ]);
      
      if (prestamosResponse.success) {
        setPrestamos(prestamosResponse.prestamos);
      }
      
      if (materialesResponse.success) {
        setMateriales(materialesResponse.materiales);
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
      NombreAlumno: '',
      FechaPrestamo: '',
      FechaDevolucion: '',
      materiales: []
    });
    setMaterialActual({
      IDMaterial: '',
      Cantidad: ''
    });
    setShowForm(false);
    setModoEdicion(false);
    setIdEditando(null);
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
  const buscarAlumno = async () => {
    if (!formData.Matricula) {
      toast.error('Ingrese una matrícula');
      return;
    }

    try {
      const response = await prestamosService.buscarAlumno(formData.Matricula);
      
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          NombreAlumno: response.alumno.NombreCompleto
        }));
        toast.success('Alumno encontrado');
      }
    } catch (error) {
      console.error('Error al buscar alumno:', error);
      toast.error(error.error || 'Alumno no encontrado');
      setFormData(prev => ({
        ...prev,
        NombreAlumno: ''
      }));
    }
  };

  /**
   * Agregar material a la lista
   */
  const agregarMaterial = () => {
    if (!materialActual.IDMaterial || !materialActual.Cantidad) {
      toast.error('Complete todos los campos del material');
      return;
    }

    const cantidad = parseInt(materialActual.Cantidad);
    if (cantidad <= 0) {
      toast.error('La cantidad debe ser mayor a 0');
      return;
    }

    // Buscar el material seleccionado
    const material = materiales.find(m => m.IDMaterial === parseInt(materialActual.IDMaterial));
    
    if (!material) {
      toast.error('Material no encontrado');
      return;
    }

    // Verificar stock disponible
    if (material.CantidadDisponible < cantidad) {
      toast.error(`No hay suficiente stock. Disponible: ${material.CantidadDisponible}`);
      return;
    }

    // Verificar si ya está en la lista
    const yaExiste = formData.materiales.find(m => m.IDMaterial === parseInt(materialActual.IDMaterial));
    if (yaExiste) {
      toast.error('Este material ya está en la lista');
      return;
    }

    // Agregar a la lista
    const nuevoMaterial = {
      IDMaterial: parseInt(materialActual.IDMaterial),
      Nombre: material.Nombre,
      Cantidad: cantidad,
      StockDisponible: material.CantidadDisponible
    };
    
    setFormData(prev => ({
      ...prev,
      materiales: [
        ...prev.materiales,
        nuevoMaterial
      ]
    }));

    // Limpiar campos
    setMaterialActual({
      IDMaterial: '',
      Cantidad: ''
    });

    toast.success('Material agregado');
  };

  /**
   * Eliminar material de la lista
   */
  const eliminarMaterial = (idMaterial) => {
    setFormData(prev => ({
      ...prev,
      materiales: prev.materiales.filter(m => m.IDMaterial !== idMaterial)
    }));
    toast.info('Material removido');
  };

  /**
   * Crear o actualizar préstamo
   */
  const guardarPrestamo = async (e) => {
    e.preventDefault();
    
    if (!formData.Matricula || !formData.FechaPrestamo || !formData.FechaDevolucion) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    if (formData.materiales.length === 0) {
      toast.error('Debe agregar al menos un material');
      return;
    }

    try {
      const datos = {
        Matricula: formData.Matricula,
        FechaPrestamo: formData.FechaPrestamo,
        FechaDevolucion: formData.FechaDevolucion,
        materiales: formData.materiales.map(m => ({
          IDMaterial: m.IDMaterial,
          Cantidad: m.Cantidad
        }))
      };

      let response;
      
      if (modoEdicion) {
        // Actualizar préstamo existente
        datos.id = idEditando;
        response = await prestamosService.update(datos);
        toast.success('Préstamo actualizado exitosamente');
      } else {
        // Crear nuevo préstamo
        response = await prestamosService.create(datos);
        toast.success('Préstamo registrado exitosamente');
      }

      if (response.success) {
        limpiarFormulario();
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al guardar préstamo:', error);
      toast.error(error.error || `Error al ${modoEdicion ? 'actualizar' : 'crear'} préstamo`);
    }
  };

  /**
   * Eliminar préstamo (devolver materiales al stock)
   */
  const devolverPrestamo = async (id, nombreAlumno) => {
    if (!confirm(`¿Eliminar préstamo de "${nombreAlumno}"?\n\nLos materiales se devolverán automáticamente al stock.`)) {
      return;
    }

    try {
      const response = await prestamosService.delete(id);

      if (response.success) {
        toast.success('Préstamo eliminado. Stock restaurado.');
        cargarDatos();
      }
    } catch (error) {
      console.error('Error al eliminar préstamo:', error);
      toast.error(error.error || 'Error al eliminar préstamo');
    }
  };

  /**
   * Abrir formulario para crear
   */
  const abrirFormularioCrear = () => {
    limpiarFormulario();
    setShowForm(true);
    setModoEdicion(false);
    // Establecer fecha de hoy por defecto
    const hoy = new Date().toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      FechaPrestamo: hoy
    }));
  };

  /**
   * Editar préstamo
   */
  const editarPrestamo = async (prestamo) => {
    try {
      setModoEdicion(true);
      setIdEditando(prestamo.IDPrestamo);
      setShowForm(true);

      // Cargar datos del préstamo al formulario
      setFormData({
        Matricula: prestamo.Matricula,
        NombreAlumno: prestamo.NombreAlumno,
        FechaPrestamo: prestamo.FechaPrestamo,
        FechaDevolucion: prestamo.FechaDevolucion,
        materiales: prestamo.materiales.map(m => ({
          IDMaterial: m.IDMaterial,
          Nombre: m.NombreMaterial,
          Cantidad: m.Cantidad,
          StockDisponible: m.CantidadDisponible || 0
        }))
      });

      // Scroll al formulario
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error al cargar préstamo:', error);
      toast.error('Error al cargar datos del préstamo');
    }
  };

  return (
    <div className="fade-in">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Préstamos</h1>
          <p className="text-gray-600 mt-1">Control de préstamos de materiales</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Nuevo Préstamo
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {modoEdicion ? 'Editar Préstamo' : 'Registrar Nuevo Préstamo'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={guardarPrestamo}>
            {/* Sección: Datos del Alumno */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-primary-700 mb-4 border-b pb-2">
                <i className="fas fa-user mr-2"></i>
                Alumno
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="Matricula" className="label label-required">
                    Matrícula del Alumno
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="Matricula"
                      name="Matricula"
                      value={formData.Matricula}
                      onChange={handleChange}
                      className={`input flex-1 ${modoEdicion ? 'bg-gray-100' : ''}`}
                      placeholder="Ej: 20240001"
                      disabled={modoEdicion}
                      required
                    />
                    <button
                      type="button"
                      onClick={buscarAlumno}
                      className="btn btn-secondary"
                      disabled={modoEdicion}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                  {modoEdicion && (
                    <p className="text-xs text-gray-500 mt-1">
                      <i className="fas fa-info-circle mr-1"></i>
                      No se puede cambiar el alumno en un préstamo existente
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Nombre del Alumno</label>
                  <input
                    type="text"
                    value={formData.NombreAlumno}
                    className="input bg-gray-100"
                    disabled
                    placeholder="Busque por matrícula..."
                  />
                </div>
              </div>
            </div>

            {/* Sección: Fechas */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-secondary-700 mb-4 border-b pb-2">
                <i className="fas fa-calendar mr-2"></i>
                Fechas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="FechaPrestamo" className="label label-required">
                    Fecha de Préstamo
                  </label>
                  <input
                    type="date"
                    id="FechaPrestamo"
                    name="FechaPrestamo"
                    value={formData.FechaPrestamo}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="FechaDevolucion" className="label label-required">
                    Fecha de Devolución
                  </label>
                  <input
                    type="date"
                    id="FechaDevolucion"
                    name="FechaDevolucion"
                    value={formData.FechaDevolucion}
                    onChange={handleChange}
                    className="input"
                    min={formData.FechaPrestamo}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sección: Materiales */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-success-700 mb-4 border-b pb-2">
                <i className="fas fa-boxes mr-2"></i>
                Materiales a Prestar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label htmlFor="IDMaterial" className="label">
                    Material
                  </label>
                  <select
                    id="IDMaterial"
                    value={materialActual.IDMaterial}
                    onChange={(e) => setMaterialActual(prev => ({ ...prev, IDMaterial: e.target.value }))}
                    className="input"
                  >
                    <option value="">Seleccione un material...</option>
                    {materiales.filter(m => m.CantidadDisponible > 0).map((material) => (
                      <option key={material.IDMaterial} value={material.IDMaterial}>
                        {material.Nombre} (Stock: {material.CantidadDisponible})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="Cantidad" className="label">
                    Cantidad
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      id="Cantidad"
                      value={materialActual.Cantidad}
                      onChange={(e) => setMaterialActual(prev => ({ ...prev, Cantidad: e.target.value }))}
                      className="input flex-1"
                      placeholder="1"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={agregarMaterial}
                      className="btn btn-success"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista de materiales agregados */}
              {formData.materiales.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Cantidad</th>
                        <th>Stock Disponible</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.materiales.map((material, index) => (
                        <tr key={index}>
                          <td>{material.Nombre}</td>
                          <td className="text-center">
                            <span className="badge badge-info">{material.Cantidad}</span>
                          </td>
                          <td className="text-center">
                            <span className="badge badge-secondary">{material.StockDisponible}</span>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => eliminarMaterial(material.IDMaterial)}
                              className="text-error hover:text-red-700"
                              title="Quitar"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="btn btn-success"
              >
                <i className="fas fa-check mr-2"></i>
                {modoEdicion ? 'Actualizar Préstamo' : 'Registrar Préstamo'}
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

      {/* Tabla de Préstamos */}
      <div className="card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : prestamos.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-hand-holding text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay préstamos registrados</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-plus mr-2"></i>
                Registrar Primer Préstamo
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Alumno</th>
                  <th>Matrícula</th>
                  <th>Fecha Préstamo</th>
                  <th>Fecha Devolución</th>
                  <th>Materiales</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {prestamos.map((prestamo) => (
                  <tr key={prestamo.IDPrestamo}>
                    <td className="font-medium">
                      <span className="badge badge-primary">{prestamo.IDPrestamo}</span>
                    </td>
                    <td>{prestamo.NombreAlumno}</td>
                    <td className="text-center">{prestamo.Matricula}</td>
                    <td className="text-sm">{prestamo.FechaPrestamoFormato}</td>
                    <td className="text-sm">{prestamo.FechaDevolucionFormato}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {prestamo.materiales.map((material, idx) => (
                          <span key={idx} className="badge badge-info text-xs">
                            {material.NombreMaterial} ({material.Cantidad})
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => editarPrestamo(prestamo)}
                          className="text-primary-600 hover:text-primary-800 transition-colors"
                          title="Editar préstamo"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => devolverPrestamo(prestamo.IDPrestamo, prestamo.NombreAlumno)}
                          className="text-error hover:text-red-700 transition-colors"
                          title="Eliminar préstamo y devolver materiales"
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
        {!loading && prestamos.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total de préstamos activos: <span className="font-semibold">{prestamos.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prestamos;

