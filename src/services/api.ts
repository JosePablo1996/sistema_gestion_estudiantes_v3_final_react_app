import axios from 'axios';

// Usar variable de entorno con fallback a la URL de Render
const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'https://sistemas-gestion-estudiantes-fastapi-api.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 segundos (bueno para Render)
});

// Interceptor para logs de requests
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.params || '');
    console.log('🔧 Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('❌ Error en request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    // Manejo específico de errores de conexión
    if (error.code === 'ECONNABORTED') {
      const timeoutError = new Error('El servidor está tardando demasiado en responder. Por favor, intenta nuevamente.');
      timeoutError.name = 'TimeoutError';
      return Promise.reject(timeoutError);
    }
    
    if (!error.response) {
      const connectionError = new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      connectionError.name = 'ConnectionError';
      return Promise.reject(connectionError);
    }

    // Manejo de errores HTTP (incluyendo códigos no estándar como 593)
    const status = error.response.status;
    let message = 'Error desconocido';
    
    // Extraer mensaje de error de diferentes formatos de respuesta
    if (error.response.data) {
      if (typeof error.response.data === 'string') {
        message = error.response.data;
      } else if (error.response.data.detail) {
        message = error.response.data.detail;
      } else if (error.response.data.message) {
        message = error.response.data.message;
      } else if (error.response.data.error) {
        message = error.response.data.error;
      }
    }
    
    const customError = new Error(message);
    
    // Clasificar errores por tipo
    if (status >= 500 || status === 593) {
      customError.name = 'ServerError';
    } else if (status >= 400) {
      customError.name = 'ClientError';
    } else {
      customError.name = `HTTPError_${status}`;
    }
    
    console.error(`❌ Error ${status} en ${error.config.url}:`, message);
    console.error('🔧 Config del error:', error.config);
    
    if (error.response) {
      console.error('📊 Response error data:', error.response.data);
    }
    
    return Promise.reject(customError);
  }
);

// Función para verificar la conexión con la API (más tolerante)
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    // Prueba con un endpoint que no dependa de la BD
    const response = await api.get('/docs', { 
      timeout: 10000,
      validateStatus: (status) => status < 500 // Considera éxito cualquier status menor a 500
    });
    return true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

// Función para probar la conexión con mensajes más descriptivos
export const testConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const startTime = Date.now();
    
    // Prueba con un endpoint simple que no requiera BD
    const response = await api.get('/docs', { 
      timeout: 10000,
      validateStatus: (status) => status < 500
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      success: true,
      message: `✅ Conexión exitosa. Tiempo de respuesta: ${responseTime}ms`
    };
  } catch (error) {
    // Manejo seguro del error con tipo unknown
    if (error instanceof Error) {
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
          message: '🗄️ API disponible pero BD desconectada (normal en Render)'
        };
      } else {
        return {
          success: false,
          message: `❌ Error: ${error.message}`
        };
      }
    } else {
      return {
        success: false,
        message: '❌ Error desconocido al conectar con la API'
      };
    }
  }
};

// Función para probar conexión directa (debug)
export const testApiConnection = async (): Promise<{ success: boolean; details: any }> => {
  try {
    console.log('🧪 Probando conexión directa...');
    
    // Prueba con fetch nativo primero
    const fetchResponse = await fetch('https://sistemas-gestion-estudiantes-fastapi-api.onrender.com/docs');
    console.log('🔍 Fetch response status:', fetchResponse.status);
    
    // Prueba con axios
    const axiosResponse = await api.get('/docs', {
      timeout: 10000,
      validateStatus: (status) => status < 500
    });
    
    return {
      success: true,
      details: {
        fetchStatus: fetchResponse.status,
        axiosStatus: axiosResponse.status,
        url: API_BASE_URL
      }
    };
  } catch (error) {
    console.error('❌ Error en test de conexión:', error);
    
    // Manejo seguro del error
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    return {
      success: false,
      details: { error: errorMessage }
    };
  }
};

// Función mejorada para health check que maneja mejor los errores
export const enhancedHealthCheck = async (): Promise<{ 
  healthy: boolean; 
  message: string; 
  responseTime?: number 
}> => {
  const startTime = Date.now();
  
  try {
    const response = await api.get('/docs', {
      timeout: 10000,
      validateStatus: () => true // Acepta cualquier status code
    });
    
    const responseTime = Date.now() - startTime;
    
    if (response.status < 500) {
      return {
        healthy: true,
        message: `✅ API conectada (Status: ${response.status})`,
        responseTime
      };
    } else {
      return {
        healthy: false,
        message: `⚠️ API respondió con error (Status: ${response.status})`,
        responseTime
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    return {
      healthy: false,
      message: `❌ Error de conexión: ${errorMessage}`,
      responseTime
    };
  }
};

export default api;