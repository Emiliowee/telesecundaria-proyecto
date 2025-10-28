/**
 * Componente ProtectedRoute
 * Protege rutas que requieren autenticación
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { isAuthenticated, loading, hasPermission } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-50">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar permisos si se requiere
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
          <i className="fas fa-lock text-6xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Acceso Denegado
          </h2>
          <p className="text-gray-600 mb-4">
            No tiene permisos para acceder a esta sección
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Regresar
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;





