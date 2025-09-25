import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/estudiantes', label: 'Estudiantes', icon: '👥' },
    { path: '/about', label: 'Acerca de', icon: 'ℹ️' },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/98 backdrop-blur-md shadow-lg border-b border-gray-800/60 py-3' 
          : 'bg-gradient-to-br from-black via-gray-900 to-black border-b border-gray-700/30 py-4'
      }`}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            
            {/* Logo y título - Color negro */}
            <Link 
              to="/" 
              className="group flex items-center space-x-3 transition-all duration-300 active:scale-95"
              aria-label="Ir al inicio"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500 border border-gray-700/50">
                  <span className="text-white text-xl font-bold">🎓</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 -z-10"></div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
                  EduDashboard
                </span>
                <span className="text-xs text-gray-400 font-medium hidden sm:block">
                  Sistema de Gestión Estudiantil
                </span>
              </div>
            </Link>

            {/* Navegación desktop - Color negro */}
            <nav className="hidden md:flex items-center space-x-2" aria-label="Navegación principal">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 ${
                    isActiveRoute(item.path)
                      ? 'bg-gray-800 text-gray-200 border border-gray-700/50 shadow-inner'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/80 active:bg-gray-700 border border-transparent'
                  }`}
                  aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                >
                  <span className={`text-lg transition-transform duration-200 ${
                    isActiveRoute(item.path) ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm tracking-wide">
                    {item.label}
                  </span>
                  
                  {/* Indicador de ruta activa */}
                  {isActiveRoute(item.path) && (
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Botón menú móvil - Color negro */}
            <button
              onClick={handleMobileMenuToggle}
              className={`md:hidden flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 active:scale-95 active:bg-gray-800 ${
                isMobileMenuOpen 
                  ? 'bg-gray-800' 
                  : 'bg-gray-900/50 hover:bg-gray-800/80'
              }`}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col items-center justify-center w-6 h-6 space-y-1.5">
                <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform rotate-45 translate-y-1.5 bg-white' : ''
                }`}></span>
                <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5 bg-white' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Menú móvil - Mejor espaciado */}
        <div 
          id="mobile-menu"
          className={`md:hidden fixed inset-0 z-40 transition-all duration-400 ease-out ${
            isMobileMenuOpen 
              ? 'opacity-100 visible translate-x-0' 
              : 'opacity-0 invisible translate-x-full'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Fondo con overlay */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          />
          
          {/* Panel del menú */}
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-gradient-to-b from-black to-gray-900 shadow-2xl border-l border-gray-800/50">
            
            {/* Header del menú móvil con mejor espaciado */}
            <div className="p-8 border-b border-gray-800/50 bg-black/95">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">🎓</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-xl mb-1">EduDashboard</span>
                    <span className="text-gray-400 text-sm">Menú de navegación</span>
                  </div>
                </div>
                <button
                  onClick={handleMobileMenuToggle}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 text-gray-400 hover:text-white active:scale-95 transition-all"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Navegación móvil con ESPACIADO MEJORADO */}
            <div className="p-6 space-y-4"> {/* Aumentado de space-y-2 a space-y-4 */}
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 px-5 py-5 rounded-xl transition-all duration-300 transform ${
                    isActiveRoute(item.path)
                      ? 'bg-gray-800 text-gray-200 border border-gray-700/50 scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60 active:scale-95'
                  } ${
                    isMobileMenuOpen 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isMobileMenuOpen 
                      ? `${index * 100 + 150}ms` 
                      : '0ms' 
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-lg flex-1">{item.label}</span>
                  {isActiveRoute(item.path) && (
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Footer del menú móvil con mejor espaciado */}
            <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-gray-800/50 bg-black/95"> {/* Aumentado de p-6 a p-8 */}
              <div className="text-center space-y-2"> {/* Añadido space-y-2 */}
                <div className="text-sm text-gray-400 font-medium">
                  EduDashboard Pro
                </div>
                <div className="text-xs text-gray-500">
                  v3.0 • Sistema optimizado
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer para el header */}
      <div className={`transition-all duration-300 ${
        isScrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-24'
      }`}></div>

      {/* Estilos optimizados para animaciones */}
      <style>
        {`
          @media (max-width: 768px) {
            #mobile-menu {
              transition: opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1), 
                         visibility 0.4s cubic-bezier(0.4, 0.0, 0.2, 1),
                         transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            
            /* Mejor feedback táctil */
            button:active, a:active {
              transform: scale(0.95);
              transition: transform 0.1s ease-out;
            }
          }
        `}
      </style>
    </>
  );
};