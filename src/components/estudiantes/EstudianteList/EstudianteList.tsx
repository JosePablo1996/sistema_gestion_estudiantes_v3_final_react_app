import React, { useMemo } from 'react';
import { Estudiante } from '../../../types/estudiante';
import { 
  UserIcon, 
  IdentificationIcon, 
  CalendarIcon, 
  PencilIcon, 
  TrashIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  ChartBarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface EstudianteListProps {
  estudiantes: Estudiante[];
  onEdit: (estudiante: Estudiante) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

// Componente LoadingSpinner corregido
const LoadingSpinner: React.FC<{ text?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  text = "Cargando...", 
  size = "md" 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
      {text && <p className="mt-2 text-gray-600 text-sm">{text}</p>}
    </div>
  );
};

export const EstudianteList: React.FC<EstudianteListProps> = ({
  estudiantes,
  onEdit,
  onDelete,
  loading = false
}) => {
  // Memoizar cálculos de métricas
  const metrics = useMemo(() => {
    const totalEstudiantes = estudiantes.length;
    const estudiantesConEdad = estudiantes.filter(e => e.edad !== undefined && e.edad !== null);
    const promedioEdad = estudiantesConEdad.length > 0 
      ? Number((estudiantesConEdad.reduce((acc, e) => acc + e.edad!, 0) / estudiantesConEdad.length).toFixed(1))
      : 0;

    return { totalEstudiantes, estudiantesConEdad, promedioEdad };
  }, [estudiantes]);

  // Gradientes predefinidos para optimización
  const gradients = useMemo(() => [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-purple-500 to-pink-600',
    'from-teal-500 to-blue-600',
    'from-red-500 to-orange-600',
    'from-indigo-500 to-purple-600',
    'from-emerald-500 to-green-600'
  ], []);

  const getGradient = (id: number) => gradients[id % gradients.length];

  const getInitials = (nombre: string) => {
    return nombre.split(' ').map(word => word[0] || '').join('').toUpperCase().slice(0, 2);
  };

  const renderEstado = (estado: unknown) => {
    if (typeof estado === 'string') return estado;
    if (typeof estado === 'object' && estado !== null) return JSON.stringify(estado);
    return 'N/A';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 sm:py-16">
        <div className="text-center">
          <LoadingSpinner text="Cargando estudiantes..." size="md" />
          <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base animate-pulse">
            Obteniendo información...
          </p>
        </div>
      </div>
    );
  }

  if (!estudiantes || estudiantes.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 bg-gradient-to-br from-gray-50/80 to-blue-50/80 rounded-2xl sm:rounded-3xl border border-gray-200/50 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4">
          <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
            <AcademicCapIcon className="w-8 h-8 sm:w-16 sm:h-16 text-blue-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            No hay estudiantes
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Agrega el primer estudiante a la base de datos
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Sección de Métricas - Responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Total Estudiantes */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-blue-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-blue-500/5 rounded-full -translate-y-6 sm:-translate-y-8 lg:-translate-y-12 translate-x-6 sm:translate-x-8 lg:translate-x-12" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wide">Total</p>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-900">
                  {metrics.totalEstudiantes}
                </p>
              </div>
            </div>
            <p className="text-xs text-blue-600 bg-blue-100/50 px-2 py-1 rounded-full inline-block">
              Estudiantes
            </p>
          </div>
        </div>

        {/* Estudiantes Activos */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-green-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-green-500/5 rounded-full -translate-y-6 sm:-translate-y-8 lg:-translate-y-12 translate-x-6 sm:translate-x-8 lg:translate-x-12" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <IdentificationIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold text-green-700 uppercase tracking-wide">Activos</p>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-900">
                  {metrics.totalEstudiantes}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-600 bg-green-100/50 px-2 py-1 rounded-full">
                100% activos
              </span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-purple-500/5 rounded-full -translate-y-6 sm:-translate-y-8 lg:-translate-y-12 translate-x-6 sm:translate-x-8 lg:translate-x-12" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold text-purple-700 uppercase tracking-wide">Registros</p>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-900">
                  {metrics.totalEstudiantes}
                </p>
              </div>
            </div>
            <p className="text-xs text-purple-600 bg-purple-100/50 px-2 py-1 rounded-full inline-block">
              En base de datos
            </p>
          </div>
        </div>

        {/* Edad Promedio */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-orange-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-orange-500/5 rounded-full -translate-y-6 sm:-translate-y-8 lg:-translate-y-12 translate-x-6 sm:translate-x-8 lg:translate-x-12" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <ChartBarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-semibold text-orange-700 uppercase tracking-wide">Promedio</p>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-900">
                  {metrics.promedioEdad > 0 ? metrics.promedioEdad : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-orange-600 bg-orange-100/50 px-2 py-1 rounded-full">
                años
              </span>
              <div className="text-xs text-orange-500 font-medium">
                {metrics.estudiantesConEdad.length} con edad
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Estudiantes - Responsive */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {estudiantes.map(estudiante => (
          <div 
            key={estudiante.id} 
            className="group relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-md border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          >
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300 opacity-0 group-hover:opacity-100" />
            
            {/* Header con gradiente único */}
            <div className={`bg-gradient-to-r ${getGradient(estudiante.id)} rounded-t-2xl sm:rounded-t-3xl p-4 sm:p-5 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-full" />
                <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {getInitials(estudiante.nombre)}
                    </span>
                  </div>
                  <span className="bg-white/20 text-xs px-2 sm:px-3 py-1 rounded-full font-medium backdrop-blur-sm border border-white/30">
                    ID: {estudiante.id}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 truncate">{estudiante.nombre}</h3>
                <p className="text-white/80 text-xs sm:text-sm truncate">Información del estudiante</p>
              </div>
            </div>

            {/* Información del estudiante */}
            <div className="p-4 sm:p-5 lg:p-6 relative z-10">
              <div className="space-y-3 sm:space-y-4">
                {/* Edad */}
                <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <span className="text-xs text-gray-500">Edad</span>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      {estudiante.edad || 'N/A'} años
                    </p>
                  </div>
                </div>

                {/* Estado */}
                {'estado' in estudiante && estudiante.estado !== undefined && estudiante.estado !== null && (
                  <div className="flex items-center p-2 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <IdentificationIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <span className="text-xs text-gray-500">Estado</span>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-600 capitalize">
                        {renderEstado(estudiante.estado)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de acción - Optimizados para móvil */}
              <div className="flex space-x-2 sm:space-x-3 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200/50">
                <button
                  onClick={() => onEdit(estudiante)}
                  className="flex-1 flex items-center justify-center bg-blue-50 text-blue-600 py-2 sm:py-3 px-2 rounded-lg sm:rounded-xl hover:bg-blue-100 transition-all duration-200 hover:scale-105 font-medium text-xs sm:text-sm"
                  title="Editar estudiante"
                >
                  <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => onDelete(estudiante.id)}
                  className="flex items-center justify-center bg-red-50 text-red-600 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-red-100 transition-all duration-200 hover:scale-105 font-medium text-xs sm:text-sm min-w-[40px] sm:min-w-[48px]"
                  title="Eliminar estudiante"
                >
                  <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Efecto de borde al hover */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};