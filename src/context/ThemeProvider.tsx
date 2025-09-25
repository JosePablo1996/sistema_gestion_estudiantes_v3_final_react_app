// src/context/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<string>('light');

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else if (theme === 'auto') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('app-theme', theme);
  };

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    // Cargar tema guardado al inicializar
    const savedTheme = localStorage.getItem('app-theme') || 
                      (localStorage.getItem('app-settings') ? 
                      JSON.parse(localStorage.getItem('app-settings')!).theme : 'light');
    
    setThemeState(savedTheme);
    applyTheme(savedTheme);

    // Escuchar cambios en las preferencias del sistema para modo auto
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};