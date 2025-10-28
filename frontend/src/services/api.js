/**
 * Servicio de API
 * Configuración de Axios y funciones para comunicarse con el backend PHP
 */

import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  withCredentials: true, // Importante para enviar cookies de sesión
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    // Puedes agregar tokens u otros headers aquí si es necesario
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo global de errores
    if (error.response) {
      // Error de respuesta del servidor
      const { status, data } = error.response;
      
      if (status === 401) {
        // No autenticado - redirigir al login
        console.error('No autenticado');
        // Aquí podrías emitir un evento o usar un store para manejar el logout
      } else if (status === 403) {
        // No autorizado
        console.error('No autorizado');
      } else if (status === 500) {
        console.error('Error del servidor');
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      // Error de red
      console.error('Error de red:', error.message);
      return Promise.reject({ error: 'Error de conexión con el servidor' });
    } else {
      // Error al configurar la petición
      console.error('Error:', error.message);
      return Promise.reject({ error: error.message });
    }
  }
);

/**
 * Servicio de Autenticación
 */
export const authService = {
  /**
   * Login de usuario
   * @param {number} IDUsuario - ID del usuario
   * @param {string} contraseña - Contraseña
   * @returns {Promise}
   */
  login: async (IDUsuario, contraseña) => {
    try {
      const response = await api.post('/auth/login.php', {
        IDUsuario,
        contraseña
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout de usuario
   * @returns {Promise}
   */
  logout: async () => {
    try {
      const response = await api.post('/auth/logout.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verificar sesión activa
   * @returns {Promise}
   */
  checkSession: async () => {
    try {
      const response = await api.get('/auth/session.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Usuarios
 */
export const usuariosService = {
  /**
   * Obtener todos los usuarios
   */
  getAll: async () => {
    try {
      const response = await api.get('/usuarios/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Obtener usuario por ID
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/usuarios/get.php?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Crear nuevo usuario
   */
  create: async (usuario) => {
    try {
      const response = await api.post('/usuarios/create.php', usuario);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Actualizar usuario existente
   */
  update: async (usuario) => {
    try {
      const response = await api.post('/usuarios/update.php', usuario);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Eliminar usuario
   */
  delete: async (id) => {
    try {
      const response = await api.post('/usuarios/delete.php', { id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Alumnos
 */
export const alumnosService = {
  /**
   * Obtener todos los alumnos
   */
  getAll: async () => {
    try {
      const response = await api.get('/alumnos/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Obtener alumno por matrícula
   */
  getByMatricula: async (matricula) => {
    try {
      const response = await api.get(`/alumnos/get.php?matricula=${matricula}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Crear nuevo alumno
   */
  create: async (alumno) => {
    try {
      const response = await api.post('/alumnos/create.php', alumno);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Actualizar alumno existente
   */
  update: async (alumno) => {
    try {
      const response = await api.post('/alumnos/update.php', alumno);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Eliminar alumno
   */
  delete: async (matricula) => {
    try {
      const response = await api.post('/alumnos/delete.php', { matricula });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Maestros
 */
export const maestrosService = {
  getAll: async () => {
    try {
      const response = await api.get('/maestros/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/maestros/get.php?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (maestro) => {
    try {
      const response = await api.post('/maestros/create.php', maestro);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (maestro) => {
    try {
      const response = await api.post('/maestros/update.php', maestro);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.post('/maestros/delete.php', { id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Materias
 */
export const materiasService = {
  getAll: async () => {
    try {
      const response = await api.get('/materias/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/materias/get.php?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (materia) => {
    try {
      const response = await api.post('/materias/create.php', materia);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (materia) => {
    try {
      const response = await api.post('/materias/update.php', materia);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.post('/materias/delete.php', { id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Materiales
 */
export const materialesService = {
  getAll: async () => {
    try {
      const response = await api.get('/materiales/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/materiales/get.php?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (material) => {
    try {
      const response = await api.post('/materiales/create.php', material);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (material) => {
    try {
      const response = await api.post('/materiales/update.php', material);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.post('/materiales/delete.php', { id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Préstamos
 */
export const prestamosService = {
  getAll: async () => {
    try {
      const response = await api.get('/prestamos/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/prestamos/get.php?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  buscarAlumno: async (matricula) => {
    try {
      const response = await api.get(`/prestamos/buscar-alumno.php?matricula=${matricula}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (prestamo) => {
    try {
      const response = await api.post('/prestamos/create.php', prestamo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (prestamo) => {
    try {
      const response = await api.post('/prestamos/update.php', prestamo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.post('/prestamos/delete.php', { id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Calificaciones
 */
export const calificacionesService = {
  getAll: async () => {
    try {
      const response = await api.get('/calificaciones/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  buscarAlumno: async (matricula) => {
    try {
      const response = await api.get(`/calificaciones/buscar-alumno.php?matricula=${matricula}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  reporteAlumno: async (matricula) => {
    try {
      const response = await api.get(`/calificaciones/reporte-alumno.php?matricula=${matricula}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  reporteGeneral: async () => {
    try {
      const response = await api.get('/calificaciones/reporte-general.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (calificacion) => {
    try {
      const response = await api.post('/calificaciones/create.php', calificacion);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (calificacion) => {
    try {
      const response = await api.post('/calificaciones/update.php', calificacion);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (calificacion) => {
    try {
      const response = await api.post('/calificaciones/delete.php', calificacion);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Dashboard
 */
export const dashboardService = {
  getStats: async () => {
    try {
      const response = await api.get('/dashboard/stats.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

/**
 * Servicio de Aulas
 */
export const aulasService = {
  getAll: async () => {
    try {
      const response = await api.get('/aulas/list.php');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/aulas/get.php?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  create: async (aula) => {
    try {
      const response = await api.post('/aulas/create.php', aula);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (aula) => {
    try {
      const response = await api.post('/aulas/update.php', aula);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      const response = await api.post('/aulas/delete.php', { id });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Exportar instancia de axios configurada
export default api;

