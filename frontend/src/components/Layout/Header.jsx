/**
 * Componente Header
 * Barra superior con información y menú móvil
 */

import { useAuth } from '../../context/AuthContext';

const Header = ({ onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-soft mb-6 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Botón de menú móvil */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>

        {/* Título o breadcrumbs */}
        <div className="flex-1 ml-4 lg:ml-0">
          <h1 className="text-xl font-semibold text-gray-800">
            Sistema de Gestión Escolar
          </h1>
        </div>

        {/* Información del usuario */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              {user?.nombre}
            </p>
            <p className="text-xs text-gray-500">
              {user?.tipoUsuario}
            </p>
          </div>
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-primary-600"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;





