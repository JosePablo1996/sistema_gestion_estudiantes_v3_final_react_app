import { api, enhancedHealthCheck, testConnection } from './api';
import { Estudiante, EstudianteCreate } from '../types/estudiante';

export const estudianteService = {
  getEstudiantes: async (): Promise<Estudiante[]> => {
    try {
      const response = await api.get<Estudiante[]>('/estudiantes/');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching estudiantes:', error);
      throw new Error(`No se pudieron obtener los estudiantes: ${error.message}`);
    }
  },

  getEstudiante: async (id: number): Promise<Estudiante> => {
    try {
      const response = await api.get<Estudiante>(`/estudiantes/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching estudiante ${id}:`, error);
      
      if (error.name === 'HTTPError_404') {
        throw new Error(`Estudiante con ID ${id} no encontrado`);
      }
      
      throw new Error(`No se pudo obtener el estudiante: ${error.message}`);
    }
  },

  createEstudiante: async (estudiante: EstudianteCreate): Promise<Estudiante> => {
    try {
      // Validación básica antes de enviar
      if (!estudiante.nombre || !estudiante.nombre.trim()) {
        throw new Error('El nombre del estudiante es requerido');
      }
      
      if (!estudiante.edad || estudiante.edad <= 0) {
        throw new Error('La edad debe ser un número positivo');
      }

      if (estudiante.edad > 120) {
        throw new Error('La edad debe ser un valor razonable');
      }

      const response = await api.post<Estudiante>('/estudiantes/', estudiante);
      return response.data;
    } catch (error: any) {
      console.error('Error creating estudiante:', error);
      
      if (error.name === 'HTTPError_400') {
        throw new Error('Datos del estudiante inválidos');
      }
      
      throw new Error(`No se pudo crear el estudiante: ${error.message}`);
    }
  },

  updateEstudiante: async (id: number, estudiante: EstudianteCreate): Promise<Estudiante> => {
    try {
      // Validación básica antes de enviar
      if (!estudiante.nombre || !estudiante.nombre.trim()) {
        throw new Error('El nombre del estudiante es requerido');
      }
      
      if (!estudiante.edad || estudiante.edad <= 0) {
        throw new Error('La edad debe ser un número positivo');
      }

      if (estudiante.edad > 120) {
        throw new Error('La edad debe ser un valor razonable');
      }

      const response = await api.put<Estudiante>(`/estudiantes/${id}`, estudiante);
      return response.data;
    } catch (error: any) {
      console.error(`Error updating estudiante ${id}:`, error);
      
      if (error.name === 'HTTPError_404') {
        throw new Error(`Estudiante con ID ${id} no encontrado`);
      }
      
      if (error.name === 'HTTPError_400') {
        throw new Error('Datos del estudiante inválidos');
      }
      
      throw new Error(`No se pudo actualizar el estudiante: ${error.message}`);
    }
  },

  deleteEstudiante: async (id: number): Promise<void> => {
    try {
      await api.delete(`/estudiantes/${id}`);
    } catch (error: any) {
      console.error(`Error deleting estudiante ${id}:`, error);
      
      if (error.name === 'HTTPError_404') {
        throw new Error(`Estudiante con ID ${id} no encontrado`);
      }
      
      throw new Error(`No se pudo eliminar el estudiante: ${error.message}`);
    }
  },

  healthCheck: async (): Promise<{ 
    healthy: boolean; 
    message: string; 
    responseTime?: number;
    details?: any;
  }> => {
    try {
      // Usamos el endpoint /docs que no depende de la base de datos
      const response = await api.get('/docs', {
        timeout: 10000,
        validateStatus: (status) => status < 500
      });
      
      return {
        healthy: response.status < 400,
        message: response.status < 400 
          ? '✅ API conectada correctamente' 
          : `⚠️ API respondió con status: ${response.status}`,
        responseTime: 0 // Se puede calcular si se necesita
      };
    } catch (error: any) {
      console.error('Health check failed:', error);
      
      if (error.name === 'ServerError' || error.message.includes('base de datos')) {
        return {
          healthy: false,
          message: '🗄️ API disponible pero BD desconectada (normal en Render)'
        };
      }
      
      return {
        healthy: false,
        message: `❌ Error en la conexión: ${error.message}`
      };
    }
  },

  // Método mejorado para verificar conexión
  testConnection: async (): Promise<{ success: boolean; message: string; details?: any }> => {
    try {
      const healthResult = await enhancedHealthCheck();
      
      return {
        success: healthResult.healthy,
        message: healthResult.message,
        details: {
          responseTime: healthResult.responseTime,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: any) {
      console.error('Test connection failed:', error);
      
      if (error.name === 'TimeoutError') {
        return {
          success: false,
          message: '⏰ Timeout: El servidor no respondió a tiempo'
        };
      } else if (error.name === 'ConnectionError') {
        return {
          success: false,
          message: '🔌 Error de conexión: No se pudo conectar al servidor'
        };
      } else if (error.name === 'ServerError' || error.message.includes('base de datos')) {
        return {
          success: false,
          message: '🗄️ API disponible pero BD desconectada (se reactivará automáticamente)'
        };
      } else {
        return {
          success: false,
          message: `❌ Error: ${error.message}`
        };
      }
    }
  },

  // Nuevo método para verificar estado completo del sistema
  getSystemStatus: async (): Promise<{
    api: boolean;
    database: boolean;
    message: string;
    responseTime?: number;
  }> => {
    const startTime = Date.now();
    
    try {
      // Primero probamos la API con un endpoint simple
      const apiResponse = await api.get('/docs', {
        timeout: 10000,
        validateStatus: () => true // Aceptamos cualquier status
      });
      
      const responseTime = Date.now() - startTime;
      const apiStatus = apiResponse.status < 500;
      
      // Intentamos verificar la base de datos (pero de forma tolerante)
      let dbStatus = false;
      let dbMessage = 'Base de datos no verificada';
      
      try {
        // Intentamos un endpoint que use la BD, pero con timeout corto
        const dbTest = await api.get('/estudiantes/', { 
          timeout: 5000,
          validateStatus: () => true
        });
        dbStatus = dbTest.status < 500;
        dbMessage = dbStatus ? 'Base de datos conectada' : 'Base de datos con problemas';
      } catch (dbError) {
        dbMessage = 'Base de datos desconectada (modo suspensión Render)';
      }
      
      return {
        api: apiStatus,
        database: dbStatus,
        message: apiStatus 
          ? `✅ Sistema operativo (${responseTime}ms)` 
          : '❌ Problemas de conexión',
        responseTime
      };
      
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      return {
        api: false,
        database: false,
        message: `❌ Error del sistema: ${error.message}`,
        responseTime
      };
    }
  }
};