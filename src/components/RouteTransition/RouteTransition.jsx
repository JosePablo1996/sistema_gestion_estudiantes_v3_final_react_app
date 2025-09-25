// RouteTransition.jsx - Versión simplificada y enfocada
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './RouteTransition.css';

const RouteTransition = ({ 
  children,
  loadingText = "Cargando EduDashboard..."
}) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    // Detectar si es una nueva ruta
    const isNewRoute = prevLocationRef.current !== location.pathname;
    prevLocationRef.current = location.pathname;

    if (isNewRoute) {
      setIsLoading(true);
      setProgress(0);

      // Animación de progreso simulada
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 300);

      // Finalizar carga después de 2.5 segundos
      const loadingTimer = setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        setTimeout(() => setIsLoading(false), 500);
      }, 2500);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(loadingTimer);
      };
    }
  }, [location]);

  return (
    <>
      {isLoading && (
        <div className="edu-transition-overlay">
          {/* Fondo minimalista */}
          <div className="edu-background">
            <div className="edu-glow edu-glow-1"></div>
            <div className="edu-glow edu-glow-2"></div>
          </div>

          {/* Contenido principal */}
          <div className="edu-loading-container">
            {/* Logo y nombre de la aplicación */}
            <div className="edu-brand">
              <div className="edu-logo">
                <svg className="edu-logo-svg" viewBox="0 0 100 100">
                  <path 
                    d="M50 15L20 50H35V75H65V50H80Z" 
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="edu-title">
                <h1 className="edu-app-name">EduDashboard</h1>
                <p className="edu-app-subtitle">Sistema de Gestión Estudiantil</p>
              </div>
            </div>

            {/* Barra de progreso dinámica */}
            <div className="edu-progress-section">
              <p className="edu-loading-text">{loadingText}</p>
              
              <div className="edu-progress-container">
                <div className="edu-progress-bar">
                  <div 
                    className="edu-progress-fill"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="edu-progress-glow"></div>
                  </div>
                </div>
                
                <div className="edu-progress-info">
                  <span className="edu-progress-percent">
                    {Math.min(Math.round(progress), 100)}%
                  </span>
                  <span className="edu-progress-status">
                    {progress < 100 ? 'Cargando...' : 'Completado'}
                  </span>
                </div>
              </div>

              {/* Indicadores de actividad */}
              <div className="edu-activity-indicators">
                <div className="edu-dots">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="edu-dot"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className={`edu-content-wrapper ${isLoading ? 'edu-loading' : 'edu-loaded'}`}>
        {children}
      </div>
    </>
  );
};

export default RouteTransition;