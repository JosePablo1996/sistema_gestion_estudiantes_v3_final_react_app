import React from 'react'; 
import { 
  CodeBracketIcon, 
  ServerIcon, 
  CpuChipIcon, 
  CircleStackIcon, 
  RocketLaunchIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowsPointingOutIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

export const About: React.FC = () => {
  const technologies = [
    {
      name: 'React 18',
      description: 'Librería frontend moderna para crear interfaces de usuario interactivas y reactivas con componentes reutilizables',
      icon: CodeBracketIcon,
      color: 'from-blue-500 to-cyan-500',
      features: ['Componentes funcionales', 'Hooks avanzados', 'Virtual DOM eficiente']
    },
    {
      name: 'TypeScript',
      description: 'Superset de JavaScript con tipado estático para mayor seguridad en el desarrollo y escalabilidad del código',
      icon: ShieldCheckIcon,
      color: 'from-blue-600 to-blue-700',
      features: ['Tipado estático', 'Autocompletado inteligente', 'Detección temprana de errores']
    },
    {
      name: 'Vite',
      description: 'Herramienta de construcción frontend ultra rápida para desarrollo moderno con hot reload',
      icon: RocketLaunchIcon,
      color: 'from-purple-500 to-pink-500',
      features: ['Hot Module Replacement', 'Build optimizado', 'Desarrollo instantáneo']
    },
    {
      name: 'FastAPI',
      description: 'Framework moderno y rápido para construir APIs con Python 3.7+, ideal para aplicaciones web',
      icon: ServerIcon,
      color: 'from-green-500 to-emerald-500',
      features: ['Alto rendimiento', 'Documentación automática', 'Validación integrada']
    },
    {
      name: 'PostgreSQL',
      description: 'Sistema de gestión de base de datos relacional avanzado y de código abierto',
      icon: CircleStackIcon,
      color: 'from-blue-700 to-blue-800',
      features: ['Cumplimiento ACID', 'Escalabilidad avanzada', 'Soporte para JSON']
    },
    {
      name: 'Tailwind CSS',
      description: 'Framework CSS utility-first para diseñar interfaces rápidamente sin escribir CSS personalizado',
      icon: ArrowsPointingOutIcon,
      color: 'from-cyan-500 to-teal-500',
      features: ['Diseño responsive', 'Personalización completa', 'Performance optimizado']
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      path: '/estudiantes/',
      description: 'Obtener la lista completa de estudiantes registrados en el sistema',
      response: 'Array de objetos Estudiante'
    },
    {
      method: 'GET',
      path: '/estudiantes/{id}',
      description: 'Obtener información detallada de un estudiante específico mediante su ID',
      response: 'Objeto Estudiante completo'
    },
    {
      method: 'POST',
      path: '/estudiantes/',
      description: 'Crear un nuevo registro de estudiante en la base de datos',
      body: 'nombre (string), edad (int)',
      response: 'Estudiante creado exitosamente'
    },
    {
      method: 'PUT',
      path: '/estudiantes/{id}',
      description: 'Actualizar la información de un estudiante existente',
      body: 'nombre (string), edad (int)',
      response: 'Estudiante actualizado correctamente'
    },
    {
      method: 'DELETE',
      path: '/estudiantes/{id}',
      description: 'Eliminar permanentemente un estudiante del sistema por su ID',
      response: 'Mensaje de confirmación de eliminación'
    },
    {
      method: 'GET',
      path: '/health',
      description: 'Verificar el estado actual del servidor y la conexión con la base de datos',
      response: 'Estado del sistema y métricas'
    }
  ];

  const architectureFeatures = [
    {
      title: 'Arquitectura RESTful',
      description: 'API diseñada siguiendo los principios REST para máxima interoperabilidad entre sistemas',
      details: ['Separación cliente-servidor', 'Stateless', 'Cacheable', 'Interface uniforme']
    },
    {
      title: 'Base de Datos Relacional',
      description: 'PostgreSQL con SQLAlchemy ORM para gestión eficiente y organizada de los datos',
      details: ['Transacciones ACID', 'Relaciones entre tablas', 'Migraciones automáticas']
    },
    {
      title: 'Seguridad Integrada',
      description: 'Múltiples capas de seguridad y validación para proteger la aplicación',
      details: ['CORS configurado', 'Validación Pydantic', 'Logging de operaciones']
    },
    {
      title: 'Escalabilidad',
      description: 'Diseñado pensando en el crecimiento horizontal y vertical de la aplicación',
      details: ['Connection pooling', 'Async ready', 'Arquitectura stateless']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        
        {/* Header Section - Mejorado para accesibilidad */}
        <header className="text-center mb-8 sm:mb-14">
          <div 
            className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl mb-4"
            aria-hidden="true"
          >
            <CpuChipIcon className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-100 via-blue-200 to-purple-200 bg-clip-text text-transparent mb-3 sm:mb-4">
            Acerca del Proyecto
          </h1>
          <p className="text-sm sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed bg-black/40 backdrop-blur-sm rounded-xl py-3 px-4 border border-gray-800">
            Sistema moderno de gestión estudiantil desarrollado con tecnologías de vanguardia 
            y arquitectura escalable para garantizar un rendimiento óptimo
          </p>
        </header>

        {/* Technologies Grid - Mejorado para móvil */}
        <section aria-labelledby="technologies-heading" className="mb-10 sm:mb-16">
          <h2 id="technologies-heading" className="text-xl sm:text-3xl font-black text-white text-center mb-6 sm:mb-10 flex items-center justify-center">
            <CodeBracketIcon className="h-5 w-5 sm:h-7 sm:w-7 mr-2 sm:mr-3 text-blue-400" aria-hidden="true" />
            Tecnologías Utilizadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {technologies.map((tech, index) => (
              <article 
                key={tech.name}
                className="bg-gray-800/90 backdrop-blur-lg rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-5 border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500"
                tabIndex={0}
              >
                <div className={`p-2 sm:p-3 bg-gradient-to-br ${tech.color} rounded-xl w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <tech.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-xl font-black text-white mb-2">{tech.name}</h3>
                <p className="text-gray-300 text-xs sm:text-base mb-3 leading-relaxed">{tech.description}</p>
                <ul className="space-y-1.5">
                  {tech.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-400">
                      <CheckBadgeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* API Documentation - Mejorado para accesibilidad */}
        <section aria-labelledby="api-heading" className="mb-10 sm:mb-16">
          <h2 id="api-heading" className="text-xl sm:text-3xl font-black text-white text-center mb-6 sm:mb-10 flex items-center justify-center">
            <ServerIcon className="h-5 w-5 sm:h-7 sm:w-7 mr-2 sm:mr-3 text-green-400" aria-hidden="true" />
            Documentación de la API
          </h2>
          
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-gray-700 mb-5">
            <h3 className="text-lg sm:text-2xl font-black text-white mb-4">Cómo funciona la API</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-sm sm:text-lg font-semibold text-gray-200 mb-3">Características Principales</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                    <span className="text-gray-300 text-xs sm:text-sm">Desarrollada con <strong>FastAPI</strong> para alto rendimiento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                    <span className="text-gray-300 text-xs sm:text-sm">Base de datos <strong>PostgreSQL</strong> con SQLAlchemy ORM</span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                    <span className="text-gray-300 text-xs sm:text-sm">Validación automática con <strong>Pydantic</strong></span>
                  </li>
                  <li className="flex items-center">
                    <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                    <span className="text-gray-300 text-xs sm:text-sm">Documentación interactiva en <code className="bg-gray-700 px-1 rounded">/docs</code></span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm sm:text-lg font-semibold text-gray-200 mb-3">Estructura de Datos</h4>
                <div className="bg-gray-900/80 rounded-xl p-3 font-mono text-xs sm:text-sm" role="document">
                  <pre className="text-gray-300 overflow-x-auto">
{`Estudiante {
  id: number
  nombre: string
  edad: number
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3" role="list" aria-label="Endpoints de la API">
            {apiEndpoints.map((endpoint, index) => (
              <article 
                key={index} 
                className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-600 hover:border-blue-500/30 transition-all duration-300 focus-within:border-blue-500/50"
                role="listitem"
                tabIndex={0}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                      {endpoint.method}
                    </span>
                    <code className="text-xs sm:text-sm font-mono text-gray-200 bg-gray-700 px-2 py-1 rounded">
                      {endpoint.path}
                    </code>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                    {endpoint.response}
                  </span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-1">{endpoint.description}</p>
                {endpoint.body && (
                  <p className="text-xs text-gray-400">
                    <strong>Cuerpo de la petición:</strong> {endpoint.body}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Architecture Features - Mejorado */}
        <section aria-labelledby="architecture-heading" className="mb-8 sm:mb-12">
          <h2 id="architecture-heading" className="text-xl sm:text-3xl font-black text-white text-center mb-6 sm:mb-10 flex items-center justify-center">
            <GlobeAltIcon className="h-5 w-5 sm:h-7 sm:w-7 mr-2 sm:mr-3 text-purple-400" aria-hidden="true" />
            Arquitectura del Sistema
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {architectureFeatures.map((feature, index) => (
              <article 
                key={index} 
                className="bg-gray-800/90 backdrop-blur-lg rounded-xl p-4 sm:p-5 border border-gray-700 hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500"
                tabIndex={0}
              >
                <h3 className="text-base sm:text-xl font-black text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-xs sm:text-base mb-3 leading-relaxed">{feature.description}</p>
                <ul className="space-y-1.5">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-400">
                      <CheckBadgeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 mr-2" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Deployment Info - Mejorado */}
        <section aria-labelledby="deployment-heading" className="text-center bg-gradient-to-r from-gray-800/80 to-gray-900/60 backdrop-blur-lg rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-gray-700">
          <h3 id="deployment-heading" className="text-lg sm:text-2xl font-black bg-gradient-to-r from-gray-100 to-blue-200 bg-clip-text text-transparent mb-3 sm:mb-4">
            Despliegue y Producción
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 text-left max-w-4xl mx-auto">
            <div className="text-center">
              <div className="p-2 bg-green-900/30 rounded-xl inline-flex mb-2" aria-hidden="true">
                <ShieldCheckIcon className="h-5 w-5 text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-200 text-sm sm:text-base mb-1">Entorno Seguro</h4>
              <p className="text-xs sm:text-sm text-gray-400">Variables de entorno protegidas y conexiones SSL/TLS</p>
            </div>
            <div className="text-center">
              <div className="p-2 bg-blue-900/30 rounded-xl inline-flex mb-2" aria-hidden="true">
                <ServerIcon className="h-5 w-5 text-blue-400" />
              </div>
              <h4 className="font-semibold text-gray-200 text-sm sm:text-base mb-1">Alta Disponibilidad</h4>
              <p className="text-xs sm:text-sm text-gray-400">Servidor en la nube con monitoreo continuo 24/7</p>
            </div>
            <div className="text-center">
              <div className="p-2 bg-purple-900/30 rounded-xl inline-flex mb-2" aria-hidden="true">
                <RocketLaunchIcon className="h-5 w-5 text-purple-400" />
              </div>
              <h4 className="font-semibold text-gray-200 text-sm sm:text-base mb-1">Performance Optimizado</h4>
              <p className="text-xs sm:text-sm text-gray-400">Carga rápida y respuesta en tiempo real para usuarios</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-6 text-gray-500 text-xs sm:text-sm">
          <p>© 2025 Sistema de Gestión Estudiantil • Desarrollado con tecnologías modernas</p>
          <p className="mt-1 text-xs">v3.0 • Última actualización: {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase()} 2025</p>
        </footer>
      </div>
    </div>
  );
};

// Función helper para colores de métodos HTTP
const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET': return 'bg-green-900/50 text-green-300';
    case 'POST': return 'bg-blue-900/50 text-blue-300';
    case 'PUT': return 'bg-yellow-900/50 text-yellow-300';
    case 'DELETE': return 'bg-red-900/50 text-red-300';
    default: return 'bg-gray-900/50 text-gray-300';
  }
};