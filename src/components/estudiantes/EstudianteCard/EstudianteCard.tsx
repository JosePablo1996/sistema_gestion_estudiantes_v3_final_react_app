import React, { useState, useCallback, memo } from 'react';
import { Estudiante } from '../../../types/estudiante';
import { 
  PencilIcon, 
  TrashIcon, 
  UserCircleIcon, 
  AcademicCapIcon, 
  CalendarIcon,
  SparklesIcon,
  EyeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface EstudianteCardProps {
  estudiante: Estudiante;
  onEdit: (estudiante: Estudiante) => void;
  onDelete: (id: number) => void;
  formRef?: React.RefObject<HTMLDivElement>; // Nueva prop para la referencia del formulario
}

// Memoizar el componente para evitar re-renders innecesarios
export const EstudianteCard: React.FC<EstudianteCardProps> = memo(({ 
  estudiante, 
  onEdit, 
  onDelete,
  formRef 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Generar color de avatar basado en el nombre (optimizado con useCallback)
  const getAvatarColor = useCallback((name: string) => {
    const colors = [
      'from-blue-500 to-cyan-600',
      'from-purple-500 to-pink-600',
      'from-green-500 to-emerald-600',
      'from-orange-500 to-red-600',
      'from-violet-500 to-purple-600',
      'from-rose-500 to-pink-600',
      'from-indigo-500 to-blue-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }, []);

  const avatarColor = getAvatarColor(estudiante.nombre);

  // Calcular progreso basado en ID (más consistente)
  const progressPercentage = useCallback((id: number) => {
    return ((id % 25) + 75); // Siempre entre 75-100% para mejor visual
  }, []);

  // Función para desplazar al formulario
  const scrollToForm = useCallback(() => {
    if (formRef?.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      // Pequeño delay para asegurar que la animación de scroll se complete
      setTimeout(() => {
        formRef.current?.focus();
      }, 500);
    }
  }, [formRef]);

  // Efecto de partículas flotantes optimizado
  const FloatingParticles = memo(() => (
    <>
      <div 
        className={`absolute top-3 right-3 w-1.5 h-1.5 bg-blue-400/30 rounded-full ${
          isHovered ? 'animate-float' : ''
        }`}
        aria-hidden="true"
      />
      <div 
        className={`absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full ${
          isHovered ? 'animate-float-delayed' : ''
        }`}
        aria-hidden="true"
      />
      <div 
        className={`absolute top-6 left-3 w-2 h-2 bg-cyan-400/20 rounded-full ${
          isHovered ? 'animate-float-slow' : ''
        }`}
        aria-hidden="true"
      />
    </>
  ));

  // Manejo de eventos optimizado
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(estudiante);
    scrollToForm(); // Desplazar al formulario después de editar
  }, [estudiante, onEdit, scrollToForm]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(estudiante.id);
    scrollToForm(); // Desplazar al formulario después de eliminar
  }, [estudiante.id, onDelete, scrollToForm]);

  // Efectos de animación CSS-in-JS optimizados
  const cardTransform = isPressed ? 'scale(0.97)' : isHovered ? 'scale(1.02)' : 'scale(1)';
  const actionsTransform = isHovered ? 'translateY(0)' : 'translateY(8px)';
  const progressWidth = isHovered ? '100%' : `${progressPercentage(estudiante.id)}%`;

  return (
    <article 
      className="relative bg-gradient-to-br from-white/95 via-white/80 to-gray-50/60 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/60 hover:border-blue-200/80 backdrop-blur-sm group cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{
        transform: cardTransform,
        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
      }}
      role="article"
      aria-label={`Tarjeta del estudiante ${estudiante.nombre}`}
    >
      {/* Fondo animado sutil */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isHovered ? 'animate-pulse-slow' : ''
        }`}
        aria-hidden="true"
      />
      
      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Efecto de brillo al hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Contenido principal */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex flex-col xs:flex-row items-start gap-4">
          
          {/* Avatar con mejoras visuales */}
          <div className="flex-shrink-0 self-center relative">
            <div 
              className={`h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-xl`}
              style={{
                filter: isHovered ? 'brightness(1.15) saturate(1.1)' : 'brightness(1) saturate(1)'
              }}
              aria-hidden="true"
            >
              <UserCircleIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white/95" />
            </div>
            
            {/* Indicador de estado interactivo */}
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <div 
                  className={`w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm ${
                    isHovered ? 'animate-ping' : ''
                  }`}
                  aria-hidden="true"
                />
                <div 
                  className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Efecto de sparkle en hover */}
            {isHovered && (
              <div className="absolute -inset-2 flex items-center justify-center" aria-hidden="true">
                <SparklesIcon className="h-5 w-5 text-yellow-400 animate-spin-slow" />
              </div>
            )}
          </div>
          
          {/* Información del estudiante */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Header con nombre y acciones rápidas */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 
                  className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight line-clamp-2 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
                  title={estudiante.nombre}
                >
                  {estudiante.nombre}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Estudiante activo
                  </span>
                </div>
              </div>
              
              {/* Acciones rápidas para móvil */}
              <div className="flex sm:hidden items-center gap-1 self-end">
                <button
                  onClick={handleEdit}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  aria-label={`Editar información de ${estudiante.nombre}`}
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  aria-label={`Eliminar a ${estudiante.nombre}`}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Grid de información optimizada para móvil */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* ID del estudiante */}
              <div 
                className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg bg-blue-50/70 group-hover:bg-blue-100/50 transition-all duration-300 border border-blue-100/30 group-hover:border-blue-200/50"
                style={{
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div className="p-1.5 bg-blue-500/10 rounded-lg transition-transform">
                  <AcademicCapIcon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-blue-600/70 font-medium truncate">ID</div>
                  <div className="text-sm font-bold text-blue-800 truncate">
                    #{estudiante.id.toString().padStart(3, '0')}
                  </div>
                </div>
              </div>

              {/* Edad del estudiante */}
              <div 
                className="flex items-center space-x-2 p-2 sm:p-3 rounded-lg bg-green-50/70 group-hover:bg-green-100/50 transition-all duration-300 border border-green-100/30 group-hover:border-green-200/50"
                style={{
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div className="p-1.5 bg-green-500/10 rounded-lg transition-transform">
                  <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-green-600/70 font-medium truncate">Edad</div>
                  <div className="text-sm font-bold text-green-800 truncate">
                    {estudiante.edad} años
                  </div>
                </div>
              </div>
            </div>

            {/* Barra de progreso mejorada */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 font-medium">Progreso académico</span>
                <span className="text-xs font-bold text-gray-700">
                  {progressPercentage(estudiante.id)}%
                </span>
              </div>
              <div className="w-full bg-gray-200/40 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: progressWidth,
                    backgroundSize: '200% 100%',
                    backgroundPosition: isHovered ? '100% 0' : '0 0'
                  }}
                />
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <EyeIcon className="h-3 w-3" />
                <span>Activo</span>
              </div>
              <div className="flex items-center gap-1">
                <ChartBarIcon className="h-3 w-3" />
                <span>Promedio: {(estudiante.id % 3) + 8}.{(estudiante.id % 10)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de acciones (solo visible en desktop) */}
      <div 
        className="relative z-10 bg-gradient-to-r from-transparent via-white/50 to-transparent px-4 sm:px-6 py-3 hidden sm:flex justify-end gap-2 border-t border-gray-100/50 transition-all duration-300"
        style={{
          transform: actionsTransform,
          opacity: isHovered ? 1 : 0.8
        }}
      >
        <button
          onClick={handleEdit}
          className="inline-flex items-center justify-center px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-200 border border-blue-200/60 hover:border-blue-500 hover:shadow-lg active:scale-95 shadow-sm group/btn min-w-[100px]"
          aria-label={`Editar información de ${estudiante.nombre}`}
        >
          <PencilIcon className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex items-center justify-center px-4 py-2 bg-white/90 backdrop-blur-sm text-red-600 text-sm font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 border border-red-200/60 hover:border-red-500 hover:shadow-lg active:scale-95 shadow-sm group/btn min-w-[100px]"
          aria-label={`Eliminar a ${estudiante.nombre}`}
        >
          <TrashIcon className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          Eliminar
        </button>
      </div>

      {/* Efecto de borde sutil */}
      <div 
        className={`absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-all duration-300 ${
          isHovered ? 'animate-pulse-slow' : ''
        }`}
        aria-hidden="true"
      />

      {/* Estilos de animación optimizados - Corregido el error de TypeScript */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-4px) rotate(180deg); opacity: 0.6; }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-2px) scale(1.2); opacity: 0.8; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-1px) rotate(90deg); opacity: 0.5; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 0.7s; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite 1.2s; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </article>
  );
});

EstudianteCard.displayName = 'EstudianteCard';