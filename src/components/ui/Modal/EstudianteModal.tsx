import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface EstudianteModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const EstudianteModal: React.FC<EstudianteModalProps> = ({ 
  isOpen, 
  onClose, 
  children, 
  title = 'Gestión de Estudiante',
  size = 'md'
}) => {
  if (!isOpen) {
    return null;
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Fondo con efecto de desenfoque */}
      <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity duration-300" />
      
      {/* Contenedor principal del modal */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div 
          className={`
            relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]}
            transform transition-all duration-300 scale-100 opacity-100
            border border-white/20
            animate-in fade-in-90 zoom-in-90 slide-in-from-bottom-10
          `}
          onClick={handleModalClick}
        >
          {/* Header del Modal con gradiente */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-blue-100 text-sm mt-1 opacity-90">
                  Complete la información requerida
                </p>
              </div>
              <button
                onClick={onClose}
                className="
                  text-white/90 hover:text-white 
                  transition-all duration-200
                  hover:bg-white/10 rounded-full p-2
                  transform hover:scale-110
                "
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Contenido del Modal */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente adicional para secciones del modal
interface ModalSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const ModalSection: React.FC<ModalSectionProps> = ({ 
  title, 
  children, 
  className = '' 
}) => (
  <div className={`mb-6 ${className}`}>
    {title && (
      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
        {title}
      </h4>
    )}
    <div className="bg-gray-50/50 rounded-xl p-4">
      {children}
    </div>
  </div>
);

// Componente para grupos de campos
interface ModalFieldGroupProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
}

export const ModalFieldGroup: React.FC<ModalFieldGroupProps> = ({ 
  children, 
  columns = 2 
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3'
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-4`}>
      {children}
    </div>
  );
};