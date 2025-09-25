import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header/Header';
import { Home } from './pages/Home/Home';
import { EstudiantesPage } from './pages/Estudiantes/EstudiantesPage';
import { About } from './pages/About/About';
import { Settings } from './pages/Settings/Settings';
import { NotFound } from './pages/NotFound/NotFound';
import { ThemeProvider } from './context/ThemeProvider';
import SplashAnimation from './pages/splash_animation/splash_animation';
import RouteTransition from './components/RouteTransition/RouteTransition'; // Corregida esta línea
import './styles/globals.css';

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <RouteTransition location={location}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/estudiantes" element={<EstudiantesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteTransition>
      </main>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <SplashAnimation 
        onAnimationComplete={() => setShowSplash(false)}
        duration={3000}
      />
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;