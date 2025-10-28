/**
 * Página de Gestión de Usuarios
 * CRUD completo
 */

import { useState, useEffect } from 'react';
import { usuariosService } from '../services/api';
import { toast } from 'sonner';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState('crear'); // 'crear' | 'editar'
  const [showForm, setShowForm] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  
  const [formData, setFormData] = useState({
    IDUsuario: '',
    Nombre: '',
    Correo: '',
    Contraseña: '',
    TipoUsuario: 'Secretario'
  });

  // Estado para validación de contraseña
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false
  });

  // Cargar usuarios al montar
  useEffect(() => {
    cargarUsuarios();
  }, []);

  /**
   * Validar requisitos de contraseña
   */
  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  /**
   * Cargar todos los usuarios
   */
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await usuariosService.getAll();
      
      if (response.success) {
        setUsuarios(response.usuarios);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpiar formulario
   */
  const limpiarFormulario = () => {
    setFormData({
      IDUsuario: '',
      Nombre: '',
      Correo: '',
      Contraseña: '',
      TipoUsuario: 'Secretario'
    });
    setFormMode('crear');
    setShowForm(false);
    setSelectedUsuario(null);
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

    // Validar contraseña en tiempo real
    if (name === 'Contraseña') {
      setPasswordValidation(validatePassword(value));
    }
  };

  /**
   * Buscar usuario por ID
   */
  const buscarUsuario = async (id) => {
    try {
      const response = await usuariosService.getById(id);
      
      if (response.success) {
        const usuario = response.usuario;
        setFormData({
          IDUsuario: usuario.IDUsuario,
          Nombre: usuario.Nombre,
          Correo: usuario.Correo,
          Contraseña: '', // No mostrar contraseña
          TipoUsuario: usuario.TipoUsuario
        });
        setSelectedUsuario(usuario);
        setFormMode('editar');
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      toast.error('Error al buscar usuario');
    }
  };

  /**
   * Crear nuevo usuario
   */
  const crearUsuario = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.Nombre || !formData.Correo || !formData.Contraseña) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    // Validar contraseña segura
    if (!passwordValidation.length || !passwordValidation.uppercase || 
        !passwordValidation.lowercase || !passwordValidation.special) {
      toast.error('La contraseña no cumple con los requisitos de seguridad');
      return;
    }

    try {
      const response = await usuariosService.create({
        Nombre: formData.Nombre,
        Correo: formData.Correo,
        Contraseña: formData.Contraseña,
        TipoUsuario: formData.TipoUsuario
      });

      if (response.success) {
        toast.success('Usuario creado exitosamente');
        limpiarFormulario();
        cargarUsuarios();
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
      toast.error(error.error || 'Error al crear usuario');
    }
  };

  /**
   * Actualizar usuario existente
   */
  const actualizarUsuario = async (e) => {
    e.preventDefault();
    
    if (!formData.Nombre || !formData.Correo) {
      toast.error('Complete todos los campos obligatorios');
      return;
    }

    // Si se está cambiando la contraseña, validarla
    if (formData.Contraseña && formData.Contraseña.trim() !== '') {
      if (!passwordValidation.length || !passwordValidation.uppercase || 
          !passwordValidation.lowercase || !passwordValidation.special) {
        toast.error('La contraseña no cumple con los requisitos de seguridad');
        return;
      }
    }

    try {
      const dataToUpdate = {
        IDUsuario: formData.IDUsuario,
        Nombre: formData.Nombre,
        Correo: formData.Correo,
        TipoUsuario: formData.TipoUsuario
      };

      // Solo incluir contraseña si se ingresó una nueva
      if (formData.Contraseña && formData.Contraseña.trim() !== '') {
        dataToUpdate.Contraseña = formData.Contraseña;
      }

      const response = await usuariosService.update(dataToUpdate);

      if (response.success) {
        toast.success('Usuario actualizado exitosamente');
        limpiarFormulario();
        cargarUsuarios();
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      toast.error(error.error || 'Error al actualizar usuario');
    }
  };

  /**
   * Eliminar usuario
   */
  const eliminarUsuario = async (id, nombre) => {
    if (!confirm(`¿Está seguro de eliminar al usuario "${nombre}"?`)) {
      return;
    }

    try {
      const response = await usuariosService.delete(id);

      if (response.success) {
        toast.success('Usuario eliminado exitosamente');
        cargarUsuarios();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      toast.error(error.error || 'Error al eliminar usuario');
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
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-1">Administrar usuarios del sistema</p>
        </div>
        <button
          onClick={abrirFormularioCrear}
          className="btn btn-primary"
        >
          <i className="fas fa-plus mr-2"></i>
          Nuevo Usuario
        </button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="card p-6 mb-6 slide-up">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {formMode === 'crear' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
            </h2>
            <button
              onClick={limpiarFormulario}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <form onSubmit={formMode === 'crear' ? crearUsuario : actualizarUsuario}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <label htmlFor="Nombre" className="label label-required">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleChange}
                  className="input"
                  placeholder="Ej: Juan Pérez García"
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
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="md:col-span-2">
                <label htmlFor="Contraseña" className={formMode === 'crear' ? 'label label-required' : 'label'}>
                  Contraseña {formMode === 'editar' && '(dejar vacío para no cambiar)'}
                </label>
                <input
                  type="password"
                  id="Contraseña"
                  name="Contraseña"
                  value={formData.Contraseña}
                  onChange={handleChange}
                  className="input"
                  placeholder={formMode === 'crear' ? 'Ingrese contraseña' : 'Nueva contraseña'}
                  required={formMode === 'crear'}
                />
                
                {/* Indicador de requisitos de contraseña */}
                {formData.Contraseña && (
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-300 text-sm">
                    <p className="font-medium text-gray-700 mb-2">Requisitos de contraseña:</p>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <i className={`fas fa-${passwordValidation.length ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                        <span className={passwordValidation.length ? 'text-green-700' : 'text-gray-600'}>
                          Mínimo 8 caracteres
                        </span>
                      </div>
                      <div className="flex items-center">
                        <i className={`fas fa-${passwordValidation.uppercase ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                        <span className={passwordValidation.uppercase ? 'text-green-700' : 'text-gray-600'}>
                          Al menos una letra mayúscula (A-Z)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <i className={`fas fa-${passwordValidation.lowercase ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                        <span className={passwordValidation.lowercase ? 'text-green-700' : 'text-gray-600'}>
                          Al menos una letra minúscula (a-z)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <i className={`fas fa-${passwordValidation.special ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                        <span className={passwordValidation.special ? 'text-green-700' : 'text-gray-600'}>
                          Al menos un carácter especial (!@#$%^&*...)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tipo de Usuario */}
              <div>
                <label htmlFor="TipoUsuario" className="label label-required">
                  Tipo de Usuario
                </label>
                <select
                  id="TipoUsuario"
                  name="TipoUsuario"
                  value={formData.TipoUsuario}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="Director">Director</option>
                  <option value="Secretario">Secretario</option>
                  <option value="Maestro">Maestro</option>
                  <option value="Administrativo">Administrativo</option>
                </select>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className={`btn ${formMode === 'crear' ? 'btn-success' : 'btn-warning'}`}
              >
                <i className={`fas ${formMode === 'crear' ? 'fa-plus' : 'fa-save'} mr-2`}></i>
                {formMode === 'crear' ? 'Crear Usuario' : 'Guardar Cambios'}
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

      {/* Tabla de Usuarios */}
      <div className="card">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner w-8 h-8 border-4 border-primary-600"></div>
            </div>
          ) : usuarios.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 text-lg">No hay usuarios registrados</p>
              <button
                onClick={abrirFormularioCrear}
                className="btn btn-primary mt-4"
              >
                <i className="fas fa-plus mr-2"></i>
                Crear Primer Usuario
              </button>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Último Acceso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.IDUsuario}>
                    <td className="font-medium">{usuario.IDUsuario}</td>
                    <td>{usuario.Nombre}</td>
                    <td>{usuario.Correo}</td>
                    <td>
                      <span className={`badge ${
                        usuario.TipoUsuario === 'Director' ? 'badge-error' :
                        usuario.TipoUsuario === 'Secretario' ? 'badge-primary' :
                        usuario.TipoUsuario === 'Maestro' ? 'badge-success' :
                        'badge-warning'
                      }`}>
                        {usuario.TipoUsuario}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${usuario.Activo ? 'badge-success' : 'badge-error'}`}>
                        {usuario.Activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="text-sm text-gray-600">
                      {usuario.UltimoAcceso || 'Nunca'}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => buscarUsuario(usuario.IDUsuario)}
                          className="text-warning hover:text-orange-700 transition-colors"
                          title="Editar"
                        >
                          <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                          onClick={() => eliminarUsuario(usuario.IDUsuario, usuario.Nombre)}
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
        {!loading && usuarios.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total de usuarios: <span className="font-semibold">{usuarios.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;


