/**
 * Página de Dashboard Principal
 * Personalizado según el rol del usuario
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardService } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderizar dashboard según el rol
   */
  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="spinner w-12 h-12 border-4 border-primary-600"></div>
        </div>
      );
    }

    switch (user?.tipoUsuario) {
      case 'Director':
        return <DashboardDirector stats={stats} />;
      case 'Secretario':
        return <DashboardSecretario stats={stats} />;
      case 'Maestro':
        return <DashboardMaestro stats={stats} />;
      case 'Administrativo':
        return <DashboardAdministrativo stats={stats} />;
      default:
        return <DashboardGenerico />;
    }
  };

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 text-white rounded-xl p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenido, {user?.nombre}
        </h1>
        <p className="text-lg text-primary-50">
          Panel de {user?.tipoUsuario} - Sistema de Gestión Escolar
        </p>
      </div>

      {/* Información del usuario */}
      <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          <i className="fas fa-user-circle mr-2 text-primary-600"></i>
          Información de Usuario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Nombre Completo</p>
            <p className="text-lg font-medium text-gray-800">{user?.nombre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rol en el Sistema</p>
            <p className="text-lg font-medium text-gray-800">
              <span className="badge badge-primary">{user?.tipoUsuario}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Correo Electrónico</p>
            <p className="text-lg font-medium text-gray-800">{user?.correo}</p>
          </div>
        </div>
      </div>

      {/* Contenido específico del rol */}
      {renderDashboardContent()}
    </div>
  );
};

/**
 * Dashboard para Director
 */
const DashboardDirector = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      <i className="fas fa-chart-pie mr-2 text-primary-600"></i>
      Panel de Administración
    </h2>

    {/* Estadísticas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Link to="/usuarios" className="card card-hover p-6 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Usuarios</p>
            <p className="text-4xl font-bold text-primary-600">{stats?.totalUsuarios || 0}</p>
            <p className="text-xs text-gray-500 mt-2">Usuarios activos en el sistema</p>
          </div>
          <div className="h-16 w-16 bg-primary-500 rounded-full flex items-center justify-center">
            <i className="fas fa-users text-3xl text-white"></i>
          </div>
        </div>
      </Link>

      <Link to="/maestros" className="card card-hover p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Maestros</p>
            <p className="text-4xl font-bold text-blue-600">{stats?.totalMaestros || 0}</p>
            <p className="text-xs text-gray-500 mt-2">Profesores registrados</p>
          </div>
          <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
            <i className="fas fa-chalkboard-teacher text-3xl text-white"></i>
          </div>
        </div>
      </Link>
    </div>

    {/* Usuarios por tipo */}
    {stats?.usuariosPorTipo && stats.usuariosPorTipo.length > 0 && (
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Distribución de Usuarios por Tipo
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.usuariosPorTipo.map((tipo, idx) => (
            <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-primary-600">{tipo.total}</p>
              <p className="text-sm text-gray-600">{tipo.TipoUsuario}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Accesos rápidos */}
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Accesos Rápidos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/usuarios" className="card card-hover p-4 flex items-center">
          <i className="fas fa-user-cog text-2xl text-primary-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Gestión de Usuarios</p>
            <p className="text-sm text-gray-600">Crear, editar y administrar usuarios</p>
          </div>
        </Link>
        <Link to="/maestros" className="card card-hover p-4 flex items-center">
          <i className="fas fa-chalkboard-teacher text-2xl text-blue-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Gestión de Maestros</p>
            <p className="text-sm text-gray-600">Administrar personal docente</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

/**
 * Dashboard para Secretario
 */
const DashboardSecretario = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      <i className="fas fa-chart-line mr-2 text-primary-600"></i>
      Panel de Control General
    </h2>

    {/* Estadísticas principales */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Link to="/alumnos" className="card card-hover p-6 bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-user-graduate text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats?.totalAlumnos || 0}</p>
          <p className="text-sm text-gray-600">Alumnos</p>
        </div>
      </Link>

      <Link to="/maestros" className="card card-hover p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-chalkboard-teacher text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalMaestros || 0}</p>
          <p className="text-sm text-gray-600">Maestros</p>
        </div>
      </Link>

      <Link to="/aulas" className="card card-hover p-6 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-door-open text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats?.totalAulas || 0}</p>
          <p className="text-sm text-gray-600">Aulas</p>
        </div>
      </Link>

      <Link to="/materias" className="card card-hover p-6 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-book-open text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-orange-600">{stats?.totalMaterias || 0}</p>
          <p className="text-sm text-gray-600">Materias</p>
        </div>
      </Link>
    </div>

    {/* Alumnos por grado */}
    {stats?.alumnosPorGrado && stats.alumnosPorGrado.length > 0 && (
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Alumnos por Grado
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {stats.alumnosPorGrado.map((grado, idx) => (
            <div key={idx} className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <p className="text-3xl font-bold text-primary-600">{grado.total}</p>
              <p className="text-sm text-gray-600">Grado {grado.Grado}°</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Accesos rápidos */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Accesos Rápidos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/usuarios" className="card card-hover p-4 flex items-center">
          <i className="fas fa-user-cog text-2xl text-primary-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Usuarios</p>
            <p className="text-sm text-gray-600">Gestionar accesos</p>
          </div>
        </Link>
        <Link to="/alumnos" className="card card-hover p-4 flex items-center">
          <i className="fas fa-user-graduate text-2xl text-green-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Alumnos</p>
            <p className="text-sm text-gray-600">Gestionar estudiantes</p>
          </div>
        </Link>
        <Link to="/maestros" className="card card-hover p-4 flex items-center">
          <i className="fas fa-chalkboard-teacher text-2xl text-blue-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Maestros</p>
            <p className="text-sm text-gray-600">Gestionar docentes</p>
          </div>
        </Link>
        <Link to="/aulas" className="card card-hover p-4 flex items-center">
          <i className="fas fa-door-open text-2xl text-purple-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Aulas</p>
            <p className="text-sm text-gray-600">Gestionar salones</p>
          </div>
        </Link>
        <Link to="/materias" className="card card-hover p-4 flex items-center">
          <i className="fas fa-book-open text-2xl text-orange-600 mr-4"></i>
          <div>
            <p className="font-semibold text-gray-800">Materias</p>
            <p className="text-sm text-gray-600">Gestionar asignaturas</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

/**
 * Dashboard para Maestro
 */
const DashboardMaestro = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      <i className="fas fa-graduation-cap mr-2 text-primary-600"></i>
      Panel Académico
    </h2>

    {/* Estadísticas principales */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-chart-line text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-primary-600">{stats?.totalCalificaciones || 0}</p>
          <p className="text-sm text-gray-600">Calificaciones</p>
        </div>
      </div>

      <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-user-graduate text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats?.alumnosConCalificaciones || 0}</p>
          <p className="text-sm text-gray-600">Alumnos</p>
        </div>
      </div>

      <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-book-open text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalMaterias || 0}</p>
          <p className="text-sm text-gray-600">Materias</p>
        </div>
      </div>

      <div className="card p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-star text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats?.promedioGeneral || '0.00'}</p>
          <p className="text-sm text-gray-600">Promedio General</p>
        </div>
      </div>
    </div>

    {/* Distribución de calificaciones */}
    {stats?.distribucionCalificaciones && (
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Distribución de Desempeño Académico
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.distribucionCalificaciones.excelente || 0}</p>
            <p className="text-xs text-gray-600">Excelente<br/>(90-100)</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats.distribucionCalificaciones.muyBueno || 0}</p>
            <p className="text-xs text-gray-600">Muy Bueno<br/>(80-89)</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{stats.distribucionCalificaciones.bueno || 0}</p>
            <p className="text-xs text-gray-600">Bueno<br/>(70-79)</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{stats.distribucionCalificaciones.regular || 0}</p>
            <p className="text-xs text-gray-600">Regular<br/>(60-69)</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{stats.distribucionCalificaciones.reprobado || 0}</p>
            <p className="text-xs text-gray-600">Reprobado<br/>(&lt;60)</p>
          </div>
        </div>
      </div>
    )}

    {/* Accesos rápidos */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Accesos Rápidos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/calificaciones" className="card card-hover p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-chart-line text-xl text-white"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Gestionar Calificaciones</p>
              <p className="text-sm text-gray-600">Registrar y modificar calificaciones</p>
            </div>
          </div>
        </Link>
        <Link to="/reportes" className="card card-hover p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-file-alt text-xl text-white"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Generar Reportes</p>
              <p className="text-sm text-gray-600">Reportes individuales y generales</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

/**
 * Dashboard para Administrativo
 */
const DashboardAdministrativo = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">
      <i className="fas fa-boxes mr-2 text-primary-600"></i>
      Panel de Inventario y Préstamos
    </h2>

    {/* Estadísticas principales */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Link to="/materiales" className="card card-hover p-6 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-box text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-primary-600">{stats?.totalMateriales || 0}</p>
          <p className="text-sm text-gray-600">Materiales</p>
        </div>
      </Link>

      <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-cubes text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats?.totalStock || 0}</p>
          <p className="text-sm text-gray-600">Total en Stock</p>
        </div>
      </div>

      <Link to="/prestamos" className="card card-hover p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-hand-holding text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalPrestamos || 0}</p>
          <p className="text-sm text-gray-600">Préstamos Activos</p>
        </div>
      </Link>

      <div className="card p-6 bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-exclamation-triangle text-2xl text-white"></i>
          </div>
          <p className="text-3xl font-bold text-red-600">{stats?.materialesStockBajo || 0}</p>
          <p className="text-sm text-gray-600">Stock Bajo (&lt;5)</p>
        </div>
      </div>
    </div>

    {/* Materiales más prestados */}
    {stats?.materialesMasPrestados && stats.materialesMasPrestados.length > 0 && (
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Materiales Más Prestados
        </h3>
        <div className="space-y-3">
          {stats.materialesMasPrestados.map((material, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="h-8 w-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  {idx + 1}
                </span>
                <span className="font-medium text-gray-800">{material.Nombre}</span>
              </div>
              <span className="badge badge-primary">{material.totalPrestado} unidades</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Accesos rápidos */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Accesos Rápidos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/materiales" className="card card-hover p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-box text-xl text-white"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Gestionar Materiales</p>
              <p className="text-sm text-gray-600">Inventario y control de stock</p>
            </div>
          </div>
        </Link>
        <Link to="/prestamos" className="card card-hover p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-hand-holding text-xl text-white"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Gestionar Préstamos</p>
              <p className="text-sm text-gray-600">Control de préstamos activos</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

/**
 * Dashboard genérico (fallback)
 */
const DashboardGenerico = () => (
  <div className="card p-8 text-center">
    <i className="fas fa-home text-6xl text-gray-300 mb-4"></i>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      Bienvenido al Sistema
    </h3>
    <p className="text-gray-600">
      Use el menú lateral para acceder a las funciones disponibles
    </p>
  </div>
);

export default Dashboard;
