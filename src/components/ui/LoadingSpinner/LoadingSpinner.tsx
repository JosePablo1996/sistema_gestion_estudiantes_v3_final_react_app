import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'gradient' | 'pulse' | 'dots';
  color?: 'blue' | 'purple' | 'green' | 'red' | 'indigo';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Cargando...',
  variant = 'default',
  color = 'blue',
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  // Spinner por variante
  const renderSpinner = () => {
    switch (variant) {
      case 'gradient':
        return (
          <div className="relative">
            <div className={`animate-spin rounded-full border-4 border-gray-200/50 ${sizeClasses[size]}`}></div>
            <div className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent bg-gradient-to-r ${colorClasses[color]} ${sizeClasses[size]} border-gradient`}></div>
            <div className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent bg-gradient-to-r ${colorClasses[color]} ${sizeClasses[size]} opacity-30`} style={{ animationDelay: '-0.5s' }}></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${colorClasses[color]} rounded-full animate-pulse`}
                style={{
                  width: size === 'sm' ? '6px' : size === 'md' ? '8px' : size === 'lg' ? '12px' : '16px',
                  height: size === 'sm' ? '6px' : size === 'md' ? '8px' : size === 'lg' ? '12px' : '16px',
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`bg-gradient-to-r ${colorClasses[color]} rounded-full animate-bounce`}
                style={{
                  width: size === 'sm' ? '4px' : size === 'md' ? '6px' : size === 'lg' ? '8px' : '10px',
                  height: size === 'sm' ? '4px' : size === 'md' ? '6px' : size === 'lg' ? '8px' : '10px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div className="relative">
            <div className={`animate-spin rounded-full border-4 border-gray-200/30 ${sizeClasses[size]}`}></div>
            <div className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent border-t-current ${sizeClasses[size]} text-${color}-500`} style={{ animationDuration: '1.5s' }}></div>
            <div className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent border-b-current ${sizeClasses[size]} text-${color}-400`} style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
          </div>
        );
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center p-4 ${fullScreen ? 'min-h-screen' : ''}`}>
      {/* Spinner Container */}
      <div className="relative mb-3">
        {renderSpinner()}
        
        {/* Efecto de glow para spinners gradient y default */}
        {(variant === 'gradient' || variant === 'default') && (
          <div className={`absolute -inset-2 bg-gradient-to-r ${colorClasses[color]} rounded-full opacity-20 blur-lg animate-pulse -z-10`}></div>
        )}
      </div>
      
      {/* Texto */}
      {text && (
        <div className="text-center">
          <p className={`font-medium ${textSizes[size]} bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent`}>
            {text}
          </p>
          
          {/* Loading dots animados en el texto */}
          <div className="flex justify-center space-x-1 mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Efecto de partículas de fondo (solo en fullScreen) */}
      {fullScreen && (
        <>
          <div className="absolute inset-0 overflow-hidden -z-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-20 animate-float"
                style={{
                  width: `${Math.random() * 60 + 20}px`,
                  height: `${Math.random() * 60 + 20}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  return content;
};

// Componente adicional para loading con skeleton
export const LoadingSkeleton: React.FC<{ type?: 'card' | 'text' | 'list'; count?: number }> = ({ 
  type = 'card', 
  count = 1 
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="animate-pulse bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-4 shadow-lg">
            <div className="flex space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-4/6"></div>
          </div>
        );
      
      case 'list':
        return (
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

// Estilos CSS para animaciones personalizadas
export const LoadingStyles: React.FC = () => (
  <style>
    {`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .border-gradient {
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(45deg, #3b82f6, #8b5cf6) border-box;
        border: 4px solid transparent;
      }
      
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }
      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `}
  </style>
);

export default LoadingSpinner;