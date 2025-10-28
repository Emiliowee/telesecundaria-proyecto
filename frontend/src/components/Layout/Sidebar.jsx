/**
 * Componente Sidebar
 * Menú lateral con navegación según tipo de usuario
 */

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, hasPermission, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Menú según permisos
  const menuItems = [
    {
      name: 'Dashboard',
      icon: 'fa-home',
      path: '/dashboard',
      permission: null // Todos
    },
    {
      name: 'Usuarios',
      icon: 'fa-user-cog',
      path: '/usuarios',
      permission: 'usuarios',
      description: 'Gestión de usuarios del sistema'
    },
    {
      name: 'Alumnos',
      icon: 'fa-users',
      path: '/alumnos',
      permission: 'alumnos',
      description: 'Gestión de alumnos y registro'
    },
    {
      name: 'Maestros',
      icon: 'fa-chalkboard-teacher',
      path: '/maestros',
      permission: 'maestros',
      description: 'Administración de maestros'
    },
    {
      name: 'Aulas',
      icon: 'fa-door-open',
      path: '/aulas',
      permission: 'aulas',
      description: 'Gestión de aulas y espacios'
    },
    {
      name: 'Materias',
      icon: 'fa-book-open',
      path: '/materias',
      permission: 'materias',
      description: 'Administración de materias'
    },
    {
      name: 'Calificaciones',
      icon: 'fa-chart-line',
      path: '/calificaciones',
      permission: 'calificaciones',
      description: 'Gestión de calificaciones'
    },
    {
      name: 'Reportes',
      icon: 'fa-file-alt',
      path: '/reportes',
      permission: 'calificaciones',
      description: 'Reportes académicos'
    },
    {
      name: 'Materiales',
      icon: 'fa-box',
      path: '/materiales',
      permission: 'materiales',
      description: 'Gestión de materiales'
    },
    {
      name: 'Préstamos',
      icon: 'fa-folder-open',
      path: '/prestamos',
      permission: 'prestamos',
      description: 'Gestión de préstamos'
    }
  ];

  // Filtrar menú según permisos
  const visibleMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-primary-800 via-primary-700 to-primary-900
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shadow-2xl
        `}
      >
        {/* Header del sidebar */}
        <div className="p-4 border-b border-primary-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <i className="fas fa-graduation-cap text-primary-600 text-xl"></i>
              </div>
              <span className="ml-3 text-white font-semibold text-sm">
                Telesecundaria
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:text-primary-200 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Perfil del usuario */}
          <div className="bg-primary-700 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-primary-800 text-lg"></i>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {user?.nombre}
                </p>
                <p className="text-primary-200 text-xs truncate">
                  {user?.tipoUsuario}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {visibleMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  group flex items-center px-3 py-3 mb-1 rounded-lg text-sm font-medium
                  transition-all duration-200 relative overflow-hidden
                  ${isActive
                    ? 'bg-white text-primary-800 shadow-md'
                    : 'text-white hover:bg-primary-600'
                  }
                `
              }
              onClick={() => onClose()}
            >
              {({ isActive }) => (
                <>
                  {/* Indicador activo */}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary-600"></div>
                  )}
                  
                  <i className={`fas ${item.icon} w-5 text-center`}></i>
                  <span className="ml-3">{item.name}</span>
                  
                  {/* Tooltip */}
                  {item.description && (
                    <span className="
                      absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      whitespace-nowrap pointer-events-none z-50
                    ">
                      {item.description}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer del sidebar - Cerrar sesión */}
        <div className="p-4 border-t border-primary-600">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center justify-center px-4 py-3 rounded-lg
              bg-primary-600 hover:bg-red-600 text-white font-medium text-sm
              transition-all duration-200 shadow-md hover:shadow-lg
            "
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Cerrar Sesión
          </button>
          
          <div className="mt-3 text-center text-primary-200 text-xs">
            <p>v2.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

