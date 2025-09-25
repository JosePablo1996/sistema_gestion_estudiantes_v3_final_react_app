import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  ServerIcon,
  CloudIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeProvider';

// Icono de reemplazo para DatabaseIcon
const DatabaseIcon = ServerIcon;

// Tipo para las configuraciones
interface AppSettings {
  theme: string;
  language: string;
  autoRefresh: boolean;
  refreshInterval: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  systemAlerts: boolean;
  performanceWarnings: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  loginAlerts: boolean;
  passwordExpiration: number;
  backupAuto: boolean;
  backupInterval: number;
  backupRetention: number;
  exportFormat: string;
  maintenanceMode: boolean;
  logLevel: string;
  apiRateLimit: number;
  cacheEnabled: boolean;
}

// Hook personalizado para manejar configuraciones persistentes
const useSettings = () => {
  const { theme: currentTheme, setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>({
    theme: currentTheme,
    language: 'es',
    autoRefresh: true,
    refreshInterval: 5,
    emailNotifications: true,
    pushNotifications: false,
    systemAlerts: true,
    performanceWarnings: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
    passwordExpiration: 90,
    backupAuto: true,
    backupInterval: 24,
    backupRetention: 30,
    exportFormat: 'json',
    maintenanceMode: false,
    logLevel: 'info',
    apiRateLimit: 1000,
    cacheEnabled: true
  });

  // Cargar configuraciones al inicializar - CORREGIDO
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('app-settings');
        
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          
          setSettings(prev => ({ 
            ...prev, 
            ...parsedSettings 
          }));
          
          // Aplicar tema usando el contexto
          if (parsedSettings.theme && parsedSettings.theme !== currentTheme) {
            setTheme(parsedSettings.theme);
            console.log('Tema aplicado desde localStorage:', parsedSettings.theme);
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();

    // Escuchar cambios en las preferencias del sistema para el modo "auto"
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = () => {
      if (settings.theme === 'auto') {
        setTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [currentTheme, setTheme]); // CORREGIDO: agregada dependencia currentTheme

  // Función para guardar configuraciones
  const saveSettings = async (newSettings: AppSettings) => {
    try {
      localStorage.setItem('app-settings', JSON.stringify(newSettings));
      
      // Solo cambiar el tema si es diferente al actual
      if (newSettings.theme !== settings.theme) {
        setTheme(newSettings.theme);
      }
      
      setSettings(newSettings);
      
      window.dispatchEvent(new CustomEvent('settingsChanged', { 
        detail: newSettings 
      }));

      window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: newSettings.theme } 
      }));
      
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  };

  return { settings, setSettings, saveSettings };
};

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { settings, setSettings, saveSettings } = useSettings();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    const success = await saveSettings(settings);
    
    if (success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleReset = async () => {
    const defaultSettings = {
      theme: 'light',
      language: 'es',
      autoRefresh: true,
      refreshInterval: 5,
      emailNotifications: true,
      pushNotifications: false,
      systemAlerts: true,
      performanceWarnings: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginAlerts: true,
      passwordExpiration: 90,
      backupAuto: true,
      backupInterval: 24,
      backupRetention: 30,
      exportFormat: 'json',
      maintenanceMode: false,
      logLevel: 'info',
      apiRateLimit: 1000,
      cacheEnabled: true
    };
    
    setSettings(defaultSettings);
    await saveSettings(defaultSettings);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Cog6ToothIcon },
    { id: 'notifications', label: 'Notificaciones', icon: BellIcon },
    { id: 'security', label: 'Seguridad', icon: ShieldCheckIcon },
    { id: 'database', label: 'Base de Datos', icon: DatabaseIcon },
    { id: 'system', label: 'Sistema', icon: ServerIcon }
  ];

  const ToggleSwitch: React.FC<{
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    description: string;
  }> = ({ id, checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1 mr-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          id={id}
          type="checkbox" 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
      </label>
    </div>
  );

  const SliderInput: React.FC<{
    id: string;
    value: number;
    onChange: (value: number) => void;
    label: string;
    min: number;
    max: number;
    unit: string;
  }> = ({ id, value, onChange, label, min, max, unit }) => (
    <div className="py-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {label}: <span className="font-bold text-blue-600 dark:text-blue-400">{value} {unit}</span>
      </label>
      <input 
        id={id}
        type="range" 
        min={min} 
        max={max} 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
        aria-label={`${label} - actualmente ${value} ${unit}`}
      />
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/40 dark:border-gray-700/40">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Cog6ToothIcon className="h-5 w-5 mr-2 text-blue-500" />
          Apariencia
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tema
            </label>
            <select 
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value})}
              className="w-full bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200"
              aria-label="Seleccionar tema"
              title="Seleccionar tema"
            >
              <option value="light">🌞 Claro</option>
              <option value="dark">🌙 Oscuro</option>
              <option value="auto">⚡ Automático</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Idioma
            </label>
            <select 
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full bg-white/70 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all duration-200"
              aria-label="Seleccionar idioma"
              title="Seleccionar idioma"
            >
              <option value="es">🇪🇸 Español</option>
              <option value="en">🇺🇸 English</option>
              <option value="pt">🇧🇷 Português</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/40 dark:border-gray-700/40">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <CloudIcon className="h-5 w-5 mr-2 text-green-500" />
          Actualización Automática
        </h3>
        <div className="space-y-2">
          <ToggleSwitch
            id="auto-refresh-toggle"
            checked={settings.autoRefresh}
            onChange={(checked) => setSettings({...settings, autoRefresh: checked})}
            label="Actualización automática"
            description="Actualizar datos automáticamente en segundo plano"
          />
          
          {settings.autoRefresh && (
            <SliderInput
              id="refresh-interval-slider"
              value={settings.refreshInterval}
              onChange={(value) => setSettings({...settings, refreshInterval: value})}
              label="Intervalo de actualización"
              min={1}
              max={60}
              unit="segundos"
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      default: return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/40 dark:border-gray-700/40">
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl shadow-lg mb-6">
              <Cog6ToothIcon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Configuración en Desarrollo</h3>
            <p className="text-gray-500 dark:text-gray-400">Esta sección estará disponible próximamente</p>
          </div>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 pb-8">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-white/40 dark:border-gray-700/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
            >
              <div className="p-2 bg-white/70 dark:bg-gray-700/70 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                <ArrowLeftIcon className="h-5 w-5" />
              </div>
              <span className="font-medium">Volver al Dashboard</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/70 rounded-xl hover:bg-white dark:hover:bg-gray-600 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                Restablecer
              </button>
              
              <button
                type="button"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Guardando...</span>
                  </>
                ) : saveStatus === 'success' ? (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    <span>¡Guardado!</span>
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    <span>Guardar Cambios</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-3xl shadow-2xl mb-6">
            <Cog6ToothIcon className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent mb-4">
            Configuración del Sistema
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Personaliza y gestiona todas las configuraciones de tu dashboard de manera intuitiva
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          {/* Mobile Menu Button */}
          <div className="md:hidden mb-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between p-4 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg border border-white/40 dark:border-gray-700/40"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-tabs-menu"
            >
              <div className="flex items-center space-x-3">
                {(() => {
                  const activeTabData = tabs.find(tab => tab.id === activeTab);
                  const Icon = activeTabData?.icon || Cog6ToothIcon;
                  return (
                    <>
                      <Icon className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {activeTabData?.label || 'Configuración'}
                      </span>
                    </>
                  );
                })()}
              </div>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <Bars3Icon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay - CORREGIDO: Sin atributos personalizados problemáticos */}
          {mobileMenuOpen && (
            <div 
              className="md:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <div 
                className="absolute top-4 left-4 right-4 bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl border border-white/40 dark:border-gray-700/40 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">Categorías</h3>
                  <button 
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Tabs */}
          <div className="hidden md:block bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg p-2 border border-white/40 dark:border-gray-700/40">
            <div className="flex space-x-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/40 dark:border-gray-700/40">
          {renderContent()}
        </div>
      </div>

      {/* Estilos CSS para el slider - CORREGIDO: Sin JSX problemático */}
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Settings;