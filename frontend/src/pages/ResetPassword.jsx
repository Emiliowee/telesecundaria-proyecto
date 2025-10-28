/**
 * Página de Restablecimiento de Contraseña
 * Permite al usuario establecer una nueva contraseña con un token válido
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estado para validación de contraseña
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false
  });

  // Verificar que existe el token
  useEffect(() => {
    if (!token) {
      toast.error('Token no válido');
      navigate('/login');
    }
  }, [token, navigate]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validar contraseña en tiempo real
    if (name === 'password') {
      setPasswordValidation(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Por favor, complete todos los campos');
      return;
    }

    // Validar longitud mínima
    if (formData.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Validar mayúscula
    if (!passwordValidation.uppercase) {
      toast.error('La contraseña debe contener al menos una letra mayúscula');
      return;
    }

    // Validar minúscula
    if (!passwordValidation.lowercase) {
      toast.error('La contraseña debe contener al menos una letra minúscula');
      return;
    }

    // Validar carácter especial
    if (!passwordValidation.special) {
      toast.error('La contraseña debe contener al menos un carácter especial (!@#$%^&*...)');
      return;
    }

    // Validar que coincidan
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/auth/reset-password.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('¡Contraseña actualizada! Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data.error || 'Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      toast.error('Error al procesar la solicitud. Intente nuevamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Card principal con diseño plano */}
        <div className="bg-white shadow-md">
          {/* Header rosado plano */}
          <div className="bg-pink-500 px-8 py-12 text-center">
            <h2 className="text-white text-2xl font-semibold tracking-wide mb-2">
              TELESECUNDARIA
            </h2>
            <p className="text-pink-100 text-sm">
              Sistema de Gestión Escolar
            </p>
          </div>

          {/* Título */}
          <div className="px-8 py-8 text-center border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">
              Nueva Contraseña
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Ingresa tu nueva contraseña para restablecer el acceso
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="px-8 py-6">
            {/* Nueva Contraseña */}
            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-pink-500 text-gray-900 placeholder-gray-400"
                  placeholder="Ingrese su nueva contraseña"
                  required
                  autoFocus
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              
              {/* Indicador de requisitos de contraseña */}
              {formData.password && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-300">
                  <p className="text-xs font-medium text-gray-700 mb-2">Requisitos de contraseña:</p>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <i className={`fas fa-${passwordValidation.length ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                      <span className={`text-xs ${passwordValidation.length ? 'text-green-700' : 'text-gray-600'}`}>
                        Mínimo 8 caracteres
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className={`fas fa-${passwordValidation.uppercase ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                      <span className={`text-xs ${passwordValidation.uppercase ? 'text-green-700' : 'text-gray-600'}`}>
                        Al menos una letra mayúscula (A-Z)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className={`fas fa-${passwordValidation.lowercase ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                      <span className={`text-xs ${passwordValidation.lowercase ? 'text-green-700' : 'text-gray-600'}`}>
                        Al menos una letra minúscula (a-z)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className={`fas fa-${passwordValidation.special ? 'check text-green-600' : 'times text-gray-400'} text-xs mr-2`}></i>
                      <span className={`text-xs ${passwordValidation.special ? 'text-green-700' : 'text-gray-600'}`}>
                        Al menos un carácter especial (!@#$%^&*...)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-pink-500 text-gray-900 placeholder-gray-400"
                  placeholder="Confirme su nueva contraseña"
                  required
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Actualizando...
              </span>
            ) : (
              'Actualizar Contraseña'
            )}
          </button>
        </form>

        {/* Footer con volver al login */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-pink-500 hover:text-pink-600 font-medium"
          >
            ← Volver al inicio de sesión
          </button>
          <p className="text-xs text-gray-500 mt-3">
            © {new Date().getFullYear()} Sistema de Gestión Escolar
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ResetPassword;

