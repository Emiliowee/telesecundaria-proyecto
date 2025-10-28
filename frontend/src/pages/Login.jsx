/**
 * Página de Login - Diseño Split Screen con Ilustraciones Educativas
 * Telesecundaria - Sistema de Gestión Escolar
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    IDUsuario: '',
    contraseña: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [sendingReset, setSendingReset] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Manejar cambios en los inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Manejar envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.IDUsuario || !formData.contraseña) {
      toast.error('Por favor, complete todos los campos');
      return;
    }

    const idUsuario = parseInt(formData.IDUsuario);
    
    if (isNaN(idUsuario) || idUsuario <= 0) {
      toast.error('El ID de usuario debe ser un número válido');
      return;
    }

    setLoading(true);

    try {
      const result = await login(idUsuario, formData.contraseña);
      
      if (result.success) {
        toast.success('¡Bienvenido! Iniciando sesión...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        toast.error(result.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Error al iniciar sesión. Intente nuevamente');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manejar solicitud de recuperación de contraseña
   */
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail || !resetEmail.includes('@')) {
      toast.error('Por favor, ingrese un correo electrónico válido');
      return;
    }

    setSendingReset(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/forgot-password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Se ha enviado un enlace de recuperación a tu correo');
        setShowForgotPassword(false);
        setResetEmail('');
      } else {
        toast.error(data.error || 'No se encontró un usuario con ese correo');
      }
    } catch (error) {
      console.error('Error al solicitar recuperación:', error);
      toast.error('Error al procesar la solicitud. Intente nuevamente');
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LADO IZQUIERDO - Formulario de Login */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-gradient-to-br from-gray-50 to-white relative">
        {/* Overlay decorativo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-purple-50/30 pointer-events-none"></div>
        
        <div className="w-full max-w-md relative z-10">
          {/* Logo y Título */}
          <div className="mb-10">
            <div className="flex items-center justify-center mb-6">
              {/* Logo Telesecundaria */}
              <div className="relative group">
                <div className="w-36 h-36 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300 p-3 border-4 border-gray-100">
                  <img 
                    src="/logo-telesecundaria.jpg" 
                    alt="Logo Telesecundaria" 
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Círculos decorativos */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full animate-pulse delay-75 shadow-lg"></div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
              TELEsecundaria
            </h1>
            <p className="text-center text-gray-600 font-medium">
              Sistema de Gestión Escolar
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bienvenido
              </h2>
              <p className="text-gray-600 text-sm">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ID de Usuario */}
              <div>
                <label htmlFor="IDUsuario" className="block text-sm font-semibold text-gray-700 mb-2">
                  ID de Usuario <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-user text-pink-400"></i>
                  </div>
                  <input
                    type="number"
                    id="IDUsuario"
                    name="IDUsuario"
                    value={formData.IDUsuario}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                    placeholder="Ingrese su ID"
                    required
                    autoFocus
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="contraseña" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-pink-400"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    className="w-full pl-11 pr-11 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-900 placeholder-gray-400 font-medium"
                    placeholder="Ingrese su contraseña"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-pink-500 transition-colors"
                    tabIndex={-1}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

               {/* Enlace de recuperación de contraseña */}
               <div className="flex items-center justify-end">
                 <button
                   type="button"
                   onClick={() => setShowForgotPassword(true)}
                   className="text-sm text-pink-500 hover:text-pink-600 font-medium transition-colors"
                 >
                   ¿Olvidaste tu contraseña?
                 </button>
               </div>

               {/* Botón de Iniciar Sesión */}
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {loading ? (
                   <span className="flex items-center justify-center">
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Iniciando sesión...
                   </span>
                 ) : (
                   <span className="flex items-center justify-center">
                     <i className="fas fa-sign-in-alt mr-2"></i>
                     Iniciar Sesión
                   </span>
                 )}
               </button>
             </form>

            {/* Ayuda */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <i className="fas fa-question-circle mr-2 text-pink-400"></i>
                <span>¿Necesitas ayuda? Contacta al administrador</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Sistema de Gestión Escolar v2.0
            </p>
          </div>
        </div>
      </div>

      {/* LADO DERECHO - Imagen de Fondo de Telesecundaria */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/background.png)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
          {/* Overlay oscuro sutil para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20"></div>
        </div>


        {/* Decoración superior con logo sutil */}
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
          <img 
            src="/logo-telesecundaria.jpg" 
            alt="Logo" 
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>

      {/* Modal de Recuperación de Contraseña */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slide-in">
            {/* Botón cerrar */}
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetEmail('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            {/* Contenido del modal */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-key text-pink-500 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                Recuperar Contraseña
              </h3>
              <p className="text-gray-600 text-sm text-center">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="resetEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-pink-400"></i>
                  </div>
                  <input
                    type="email"
                    id="resetEmail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-gray-900 placeholder-gray-400"
                    placeholder="correo@ejemplo.com"
                    required
                    disabled={sendingReset}
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmail('');
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  disabled={sendingReset}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={sendingReset}
                  className="flex-1 px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingReset ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Enlace'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;


