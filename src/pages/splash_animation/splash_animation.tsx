import React, { useEffect, useState } from 'react';
import './splash_animation.css';

interface SplashAnimationProps {
  onAnimationComplete?: () => void;
  duration?: number; // Duración en milisegundos
}

const SplashAnimation: React.FC<SplashAnimationProps> = ({ 
  onAnimationComplete, 
  duration = 4000 // Duración optimizada
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'ready'>('loading');
  const [progress, setProgress] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    // Animación inicial del logo (más rápida)
    const logoTimeout = setTimeout(() => {
      setLogoAnimationComplete(true);
    }, 1000);

    // Simular carga progresiva con mejor distribución
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setAnimationPhase('ready');
          setShowEnterButton(true);
          return 100;
        }
        
        // Aceleración no lineal para mejor experiencia
        let increment = 1;
        if (prev < 30) increment = 2; // Más rápido al inicio
        if (prev > 70) increment = 0.5; // Más lento al final
        
        return Math.min(prev + increment, 100);
      });
    }, duration / 70); // Menos pasos para mejor rendimiento

    return () => {
      clearTimeout(logoTimeout);
      clearInterval(progressInterval);
    };
  }, [duration]);

  const handleEnterClick = () => {
    // Animación de salida antes de desaparecer
    setIsVisible(false);
    setTimeout(() => {
      onAnimationComplete?.();
    }, 500);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`splash-container ${animationPhase}`}>
      <div className="splash-content">
        {/* Logo principal con nueva animación */}
        <div className="logo-container">
          <div className={`logo-main ${logoAnimationComplete ? 'expanded' : ''}`}>
            <span className="logo-text">SG</span>
            <div className="logo-orbits">
              <div className="orbit orbit-1"></div>
              <div className="orbit orbit-2"></div>
              <div className="orbit orbit-3"></div>
            </div>
          </div>
          <div className="logo-shine"></div>
        </div>

        {/* Texto de la aplicación con animación escalonada */}
        <div className={`app-title ${logoAnimationComplete ? 'visible' : ''}`}>
          <h1 className="title-main">Sistema de Gestión</h1>
          <h2 className="title-sub">Estudiantes</h2>
          <div className="title-underline"></div>
        </div>

        {/* Progress indicator mejorado */}
        <div className={`progress-container ${logoAnimationComplete ? 'visible' : ''}`}>
          <div className="progress-info">
            <span className="progress-text">
              {progress < 30 ? 'Inicializando módulos...' : 
               progress < 60 ? 'Cargando base de datos...' : 
               progress < 90 ? 'Optimizando interfaz...' : 
               'Sistema listo'}
            </span>
            <span className="progress-percentage">{Math.round(progress)}%</span>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
          
          <div className="progress-steps">
            <span className={`step ${progress >= 25 ? 'completed' : ''}`}>
              <span className="step-marker">✓</span>
              Sistema
            </span>
            <span className={`step ${progress >= 50 ? 'completed' : ''}`}>
              <span className="step-marker">✓</span>
              Datos
            </span>
            <span className={`step ${progress >= 75 ? 'completed' : ''}`}>
              <span className="step-marker">✓</span>
              Interfaz
            </span>
            <span className={`step ${progress >= 100 ? 'completed' : ''}`}>
              <span className="step-marker">✓</span>
              Listo
            </span>
          </div>
        </div>

        {/* Botón de entrar con mejor animación */}
        {showEnterButton && (
          <div className="enter-button-container">
            <button 
              className="enter-button"
              onClick={handleEnterClick}
            >
              <span className="button-text">Entrar al Sistema</span>
              <span className="button-icon">
                <div className="button-arrow">→</div>
              </span>
              <div className="button-shine"></div>
            </button>
          </div>
        )}

        {/* Nuevos elementos decorativos */}
        <div className="animated-background">
          <div className="grid-lines"></div>
          <div className="floating-shapes">
            <div className="shape shape-triangle"></div>
            <div className="shape shape-circle"></div>
            <div className="shape shape-square"></div>
          </div>
        </div>

        {/* Partículas mejoradas */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              animationDelay: `${i * 0.3}s`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>

        {/* Efectos de conexión */}
        <div className="connection-lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashAnimation;