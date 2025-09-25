import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  ArrowPathIcon, 
  FaceFrownIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

export const NotFound: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount] = useState(20);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 5,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center px-4 py-12 overflow-hidden relative">
      
      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Efectos de luz */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 animate-pulse" />
      
      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Icono principal con efecto glitch */}
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-full animate-pulse shadow-2xl shadow-red-500/30"></div>
            <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
              <FaceFrownIcon className="h-20 w-20 text-red-400 animate-bounce" />
            </div>
            
            {/* Anillo animado */}
            <div className="absolute -inset-2 border-4 border-red-400/30 rounded-full animate-ping"></div>
          </div>
          
          {/* Efecto glitch en el texto */}
          <div className="relative inline-block">
            <h1 className="text-9xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 relative">
              404
              <span className="absolute top-0 left-0 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-glitch-1">404</span>
              <span className="absolute top-0 left-0 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent animate-glitch-2">404</span>
            </h1>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="mb-12 space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            ¡UPS! <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">PÁGINA PERDIDA</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Parece que te has aventurado más allá de los mapas conocidos. 
            Esta página se ha esfumado en el <span className="text-cyan-400">ciberespacio</span>.
          </p>

          {/* Tarjeta de sugerencias */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-yellow-500/20 rounded-2xl mr-4">
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">¿Qué hacer ahora?</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center group">
                <div className="p-4 bg-blue-500/20 rounded-2xl inline-flex mb-3 group-hover:scale-110 transition-transform">
                  <MagnifyingGlassIcon className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Verificar URL</h4>
                <p className="text-gray-300 text-sm">Revisa la dirección en la barra de navegación</p>
              </div>
              
              <div className="text-center group">
                <div className="p-4 bg-green-500/20 rounded-2xl inline-flex mb-3 group-hover:scale-110 transition-transform">
                  <MapPinIcon className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Navegar</h4>
                <p className="text-gray-300 text-sm">Usa el menú principal para encontrar tu destino</p>
              </div>
              
              <div className="text-center group">
                <div className="p-4 bg-purple-500/20 rounded-2xl inline-flex mb-3 group-hover:scale-110 transition-transform">
                  <SignalIcon className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Reportar</h4>
                <p className="text-gray-300 text-sm">Notifica el error si es necesario</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción mejorados */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link 
            to="/" 
            className="
              group relative inline-flex items-center justify-center
              px-10 py-5 text-xl font-bold text-white
              bg-gradient-to-r from-blue-600 to-purple-600
              rounded-2xl shadow-2xl hover:shadow-3xl
              transform hover:-translate-y-2 transition-all duration-300
              hover:from-blue-500 hover:to-purple-500
              min-w-[220px] border border-blue-400/30
              overflow-hidden
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0 group-hover:from-white/20 transition-all"></span>
            <HomeIcon className="h-6 w-6 mr-3 transition-transform group-hover:scale-125" />
            Volver al Inicio
            <span className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-all"></span>
          </Link>

          <button 
            onClick={() => window.location.reload()}
            className="
              group relative inline-flex items-center justify-center
              px-10 py-5 text-xl font-bold text-gray-900
              bg-gradient-to-r from-gray-100 to-gray-300
              rounded-2xl shadow-2xl hover:shadow-3xl
              transform hover:-translate-y-2 transition-all duration-300
              hover:from-white hover:to-gray-200
              min-w-[220px] border border-gray-400/30
              overflow-hidden
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/0 group-hover:from-black/10 transition-all"></span>
            <ArrowPathIcon className="h-6 w-6 mr-3 transition-transform group-hover:rotate-180" />
            Recargar Página
          </button>
        </div>

        {/* Información del sistema */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-left">
              <p className="text-gray-400 text-sm mb-1">Código de error</p>
              <p className="text-red-400 font-mono font-bold">404_NOT_FOUND</p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Estado del sistema</p>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 font-semibold">Operacional</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-gray-400 text-sm mb-1">Sistema</p>
              <p className="text-cyan-400 font-semibold">Gestión Estudiantil v.3.0</p>
            </div>
          </div>
        </div>

        {/* Efectos de conexión */}
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
};

export default NotFound;