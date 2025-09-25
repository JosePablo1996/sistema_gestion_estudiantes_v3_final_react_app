import React, { useEffect, useState } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'delete' | 'warning' | 'danger';
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ 
  isOpen, 
  onConfirm, 
  onCancel,
  title = "Confirmar Eliminación",
  message = "¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede deshacer.",
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  type = "delete"
}) => {
  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
      setTimeout(() => setShowModal(false), 300);
    }
  }, [isOpen]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleConfirm = () => {
    setAnimateIn(false);
    setTimeout(() => {
      onConfirm();
    }, 200);
  };

  const handleCancel = () => {
    setAnimateIn(false);
    setTimeout(() => {
      onCancel();
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  if (!showModal) {
    return null;
  }

  const typeConfig = {
    delete: {
      iconBg: 'bg-red-100/80',
      iconColor: 'text-red-600',
      buttonBg: 'bg-gradient-to-r from-red-500 to-red-600',
      buttonHover: 'hover:from-red-600 hover:to-red-700',
      glow: 'from-red-500/20 to-red-600/20'
    },
    warning: {
      iconBg: 'bg-amber-100/80',
      iconColor: 'text-amber-600',
      buttonBg: 'bg-gradient-to-r from-amber-500 to-amber-600',
      buttonHover: 'hover:from-amber-600 hover:to-amber-700',
      glow: 'from-amber-500/20 to-amber-600/20'
    },
    danger: {
      iconBg: 'bg-rose-100/80',
      iconColor: 'text-rose-600',
      buttonBg: 'bg-gradient-to-r from-rose-500 to-rose-600',
      buttonHover: 'hover:from-rose-600 hover:to-rose-700',
      glow: 'from-rose-500/20 to-rose-600/20'
    }
  };

  const config = typeConfig[type];

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 ${
        animateIn 
          ? 'bg-gray-900/70 backdrop-blur-sm' 
          : 'bg-gray-900/0 backdrop-blur-0'
      }`}
      onClick={handleCancel}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div 
          className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 ${
            animateIn 
              ? 'scale-100 opacity-100 translate-y-0' 
              : 'scale-95 opacity-0 -translate-y-4'
          }`}
          onClick={handleModalClick}
        >
          {/* Header con icono y botón cerrar */}
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${config.iconBg} relative`}>
              <ExclamationTriangleIcon className={`h-8 w-8 ${config.iconColor}`} />
              
              {/* Efecto de glow animado */}
              <div className={`absolute inset-0 bg-gradient-to-r ${config.glow} rounded-2xl opacity-0 animate-pulse-slow -z-10`}></div>
            </div>
            
            <button
              onClick={handleCancel}
              className="group w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100/80 hover:bg-gray-200/90 transition-all duration-300 hover:scale-110"
              aria-label="Cerrar"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          {/* Contenido */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </h3>
            
            <div className="py-2">
              <p className="text-lg text-gray-600 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Indicador visual de advertencia */}
            <div className="flex justify-center space-x-1 py-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleCancel}
              className="group relative px-8 py-3 text-base font-semibold rounded-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Fondo del botón cancelar */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300"></div>
              
              {/* Efecto de borde en hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-300 to-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              <span className="relative bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
                {cancelText}
              </span>
            </button>

            <button
              onClick={handleConfirm}
              className={`group relative px-8 py-3 text-base font-semibold text-white rounded-2xl transition-all duration-300 overflow-hidden shadow-lg ${config.buttonBg} ${config.buttonHover} transform hover:scale-105 active:scale-95`}
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              {/* Efecto de partículas */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -inset-1 bg-white/30 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></div>
              </div>
              
              <span className="relative flex items-center justify-center space-x-2">
                <span>{confirmText}</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Footer informativo */}
          <div className="mt-6 pt-4 border-t border-gray-200/60">
            <div className="text-center">
              <p className="text-xs text-gray-400 font-medium">
                Presiona ESC para cancelar • Enter para confirmar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de animación globales - Corregido */}
      <div style={{ display: 'none' }}>
        <style>
          {`
            @keyframes pulse-slow {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.05); }
            }
            .animate-pulse-slow {
              animation: pulse-slow 2s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
};

// Componente adicional para confirmaciones rápidas
export const QuickConfirm: React.FC<Omit<DeleteConfirmationProps, 'isOpen' | 'onConfirm' | 'onCancel'> & {
  trigger: React.ReactElement;
  onConfirm: () => void;
}> = ({ trigger, onConfirm, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: () => setIsOpen(true)
      })}
      
      <DeleteConfirmation
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        {...props}
      />
    </>
  );
};

export default DeleteConfirmation;