/**
 * Contexto de Autenticación
 * Maneja el estado global de autenticación del usuario
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar sesión al cargar la aplicación
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verificar si hay una sesión activa
   */
  const checkAuth = async () => {
    try {
      const response = await authService.checkSession();
      
      if (response.authenticated && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login de usuario
   * @param {number} IDUsuario 
   * @param {string} contraseña 
   */
  const login = async (IDUsuario, contraseña) => {
    try {
      const response = await authService.login(IDUsuario, contraseña);
      
      if (response.success && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true, user: response.user };
      } else {
        return { success: false, message: response.message || 'Error al iniciar sesión' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: error.error || error.message || 'Error al iniciar sesión' 
      };
    }
  };

  /**
   * Logout de usuario
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  /**
   * Verificar si el usuario tiene un permiso específico
   * @param {string} permiso 
   * @returns {boolean}
   */
  const hasPermission = (permiso) => {
    if (!user || !user.permisos) return false;
    return user.permisos.includes(permiso);
  };

  /**
   * Verificar si el usuario es de un tipo específico
   * @param {string} tipo 
   * @returns {boolean}
   */
  const isUserType = (tipo) => {
    if (!user) return false;
    return user.tipoUsuario === tipo;
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    hasPermission,
    isUserType
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

export default AuthContext;





