import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  ClockIcon,
  ArrowRightIcon,
  PlayIcon,
  PhoneIcon,
  CpuChipIcon,
  ServerIcon,
  SignalIcon,
  WifiIcon,
  CloudIcon,
  BoltIcon,
  ChartPieIcon,
  DeviceTabletIcon,
  GlobeAltIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

// Icono de reemplazo para DatabaseIcon
const DatabaseIcon = ServerIcon;

export const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    cpu: 45.2,
    memoria: 73.8,
    almacenamiento: 61.0,
    uptime: 99.9,
    instituciones: 42,
    latencia: 35,
    actividad: 86,
    solicitudes: 1247,
    usuarios: 342,
    procesos: 28,
    baseDatos: true,
    apiServicio: true,
    servidorWeb: true,
    // Nuevas métricas añadidas
    temperatura: 68.4,
    anchoBanda: 245,
    errores: 12,
    rendimiento: 94.2,
    cacheHitRate: 87.5,
    conexionesActivas: 156,
    tiempoRespuesta: 124,
    seguridad: 98.7
  });

  const [lastUpdate, setLastUpdate] = useState('Hace 3 seg');

  useEffect(() => {
    setIsVisible(true);
    
    // Simular métricas del sistema en tiempo real más realistas
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = now.getSeconds();
      
      setStats(prev => {
        // Patrones más realistas basados en el tiempo
        const cpuBase = 40 + Math.sin(seconds * 0.1) * 10 + Math.random() * 5;
        const memoriaBase = 70 + Math.cos(seconds * 0.05) * 8 + Math.random() * 4;
        const latenciaBase = 30 + Math.sin(seconds * 0.2) * 15 + Math.random() * 8;
        
        return {
          ...prev,
          cpu: Math.max(15, Math.min(95, cpuBase)),
          memoria: Math.max(60, Math.min(95, memoriaBase)),
          almacenamiento: Math.max(55, Math.min(85, 60 + Math.sin(seconds * 0.02) * 6 + Math.random() * 3)),
          latencia: Math.max(20, Math.min(80, latenciaBase)),
          actividad: 80 + Math.floor(Math.random() * 20),
          solicitudes: 1200 + Math.floor(Math.random() * 100),
          usuarios: 340 + Math.floor(Math.random() * 10),
          procesos: 25 + Math.floor(Math.random() * 8),
          temperatura: 65 + Math.sin(seconds * 0.15) * 8 + Math.random() * 3,
          anchoBanda: 240 + Math.cos(seconds * 0.1) * 20 + Math.random() * 15,
          errores: Math.max(0, Math.floor(10 + Math.sin(seconds * 0.3) * 8 + Math.random() * 4)),
          rendimiento: 90 + Math.sin(seconds * 0.08) * 8 + Math.random() * 3,
          cacheHitRate: 85 + Math.cos(seconds * 0.12) * 6 + Math.random() * 2,
          conexionesActivas: 150 + Math.floor(Math.sin(seconds * 0.2) * 20 + Math.random() * 10),
          tiempoRespuesta: 120 + Math.sin(seconds * 0.25) * 15 + Math.random() * 8,
          seguridad: 97 + Math.cos(seconds * 0.05) * 3 + Math.random() * 1,
          baseDatos: Math.random() > 0.02, // 98% de disponibilidad
          apiServicio: Math.random() > 0.01, // 99% de disponibilidad
          servidorWeb: Math.random() > 0.005 // 99.5% de disponibilidad
        };
      });

      // Actualizar timestamp
      setLastUpdate(`Hace ${Math.floor(Math.random() * 5) + 1} seg`);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, type: 'usage' | 'latency' | 'uptime' | 'temperature' | 'performance' = 'usage') => {
    switch (type) {
      case 'latency':
        return value < 30 ? 'text-green-400' : value < 60 ? 'text-yellow-400' : 'text-red-400';
      case 'uptime':
        return value > 99.5 ? 'text-green-400' : value > 98 ? 'text-yellow-400' : 'text-red-400';
      case 'temperature':
        return value < 60 ? 'text-green-400' : value < 75 ? 'text-yellow-400' : 'text-red-400';
      case 'performance':
        return value > 90 ? 'text-green-400' : value > 80 ? 'text-yellow-400' : 'text-red-400';
      default:
        return value < 60 ? 'text-green-400' : value < 80 ? 'text-yellow-400' : 'text-red-400';
    }
  };

  const getProgressColor = (value: number, type: 'usage' | 'latency' | 'temperature' | 'performance' = 'usage') => {
    switch (type) {
      case 'latency':
        return value < 30 ? 'bg-green-500' : value < 60 ? 'bg-yellow-500' : 'bg-red-500';
      case 'temperature':
        return value < 60 ? 'bg-green-500' : value < 75 ? 'bg-yellow-500' : 'bg-red-500';
      case 'performance':
        return value > 90 ? 'bg-green-500' : value > 80 ? 'bg-yellow-500' : 'bg-red-500';
      default:
        return value < 60 ? 'bg-green-500' : value < 80 ? 'bg-yellow-500' : 'bg-red-500';
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive 
      ? 'px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full font-semibold border border-green-700/50'
      : 'px-3 py-1 bg-red-900/30 text-red-400 text-sm rounded-full font-semibold border border-red-700/50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements Mejorados */}
      <div className="absolute inset-0 bg-grid-slate-400/[0.02] bg-[size:40px_40px]"></div>
      <div className="absolute top-10% right-10% w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10% left-10% w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slower"></div>
      <div className="absolute top-50% left-50% transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/5 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Header Section Mejorado */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl mb-4 sm:mb-6 relative overflow-hidden">
            <CpuChipIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-white z-10 relative" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12"></div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-gray-100 via-blue-200 to-purple-300 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
            Dashboard del Sistema
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Monitoreo en <span className="text-blue-400 font-semibold">tiempo real</span> del rendimiento del sistema con métricas avanzadas y análisis predictivo
          </p>
        </div>

        {/* Main Dashboard Grid Mejorado */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 lg:mb-16">
          {/* Left Column - System Metrics */}
          <div className="space-y-6 sm:space-y-8">
            {/* System Metrics Grid Mejorado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* CPU Usage Mejorado */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wide">Uso de CPU</p>
                    <p className={`text-2xl sm:text-3xl font-black ${getStatusColor(stats.cpu, 'usage')}`}>
                      {stats.cpu.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                    <CpuChipIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2 sm:h-2.5 shadow-inner">
                  <div 
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-1000 ${getProgressColor(stats.cpu, 'usage')}`}
                    style={{ width: `${stats.cpu}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Tiempo real • {stats.procesos} procesos</p>
              </div>

              {/* Memory Usage Mejorado */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wide">Memoria</p>
                    <p className={`text-2xl sm:text-3xl font-black ${getStatusColor(stats.memoria, 'usage')}`}>
                      {stats.memoria.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                    <ServerIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2 sm:h-2.5 shadow-inner">
                  <div 
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-1000 ${getProgressColor(stats.memoria, 'usage')}`}
                    style={{ width: `${stats.memoria}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Utilizada • {Math.round(stats.memoria * 16 / 100)}GB/16GB</p>
              </div>

              {/* Storage Usage Mejorado */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wide">Almacenamiento</p>
                    <p className={`text-2xl sm:text-3xl font-black ${getStatusColor(stats.almacenamiento, 'usage')}`}>
                      {stats.almacenamiento.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                    <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2 sm:h-2.5 shadow-inner">
                  <div 
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-1000 ${getProgressColor(stats.almacenamiento, 'usage')}`}
                    style={{ width: `${stats.almacenamiento}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Capacidad • {Math.round(stats.almacenamiento * 500 / 100)}GB/500GB</p>
              </div>

              {/* Network Latency Mejorado */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wide">Latencia</p>
                    <p className={`text-2xl sm:text-3xl font-black ${getStatusColor(stats.latencia, 'latency')}`}>
                      {stats.latencia.toFixed(0)}ms
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform">
                    <SignalIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2 sm:h-2.5 shadow-inner">
                  <div 
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-1000 ${getProgressColor(stats.latencia, 'latency')}`}
                    style={{ width: `${Math.min(100, stats.latencia)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Red • {stats.latencia < 50 ? 'Óptima' : stats.latencia < 70 ? 'Estable' : 'Lenta'}</p>
              </div>
            </div>

            {/* Performance Card Mejorado */}
            <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-black">Rendimiento del Sistema</h3>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold">Operacional</span>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-200 font-medium text-sm sm:text-base">Uptime</span>
                      <span className={`font-black text-lg sm:text-xl ${getStatusColor(stats.uptime, 'uptime')}`}>
                        {stats.uptime}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-600/40 rounded-full h-2 sm:h-2.5 shadow-inner">
                      <div className="bg-white h-2 sm:h-2.5 rounded-full shadow-lg transition-all duration-1000" style={{ width: `${stats.uptime}%` }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                      <WifiIcon className="h-3 w-3 sm:h-4 sm:w-4 text-green-300" />
                      <span className="text-blue-200">Instituciones: <span className="font-semibold text-white">{stats.instituciones}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BoltIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300" />
                      <span className="text-blue-200">Actividad: <span className="font-semibold text-white">{stats.actividad}%</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions Mejorado */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Actions Mejorado */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30">
              <h3 className="text-lg sm:text-xl font-black text-gray-100 mb-4 sm:mb-6 flex items-center space-x-2 sm:space-x-3">
                <BoltIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
                <span>Acciones Rápidas</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <Link 
                  to="/estudiantes"
                  className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-xl sm:rounded-2xl hover:from-blue-800/40 hover:to-blue-700/30 transition-all duration-300 group hover:scale-[1.02] border border-blue-700/30"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform">
                      <UserGroupIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-100 block text-sm sm:text-base">Gestionar Estudiantes</span>
                      <span className="text-xs text-gray-400">Administrar base de datos</span>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 group-hover:text-blue-400 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-300" />
                </Link>

                <Link 
                  to="/settings"
                  className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-xl sm:rounded-2xl hover:from-purple-800/40 hover:to-purple-700/30 transition-all duration-300 group hover:scale-[1.02] border border-purple-700/30"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform">
                      <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-100 block text-sm sm:text-base">Configuración</span>
                      <span className="text-xs text-gray-400">Ajustes del sistema</span>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 group-hover:text-purple-400 transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-all duration-300" />
                </Link>
              </div>
            </div>

            {/* System Status Mejorado */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30">
              <h3 className="text-lg sm:text-xl font-black text-gray-100 mb-4 sm:mb-6 flex items-center space-x-2 sm:space-x-3">
                <CloudIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
                <span>Estado del Sistema</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-700/30 to-gray-600/20 rounded-lg sm:rounded-xl">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">Base de datos</span>
                  <span className={getStatusBadge(stats.baseDatos)}>
                    {stats.baseDatos ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-700/30 to-gray-600/20 rounded-lg sm:rounded-xl">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">API Servicio</span>
                  <span className={getStatusBadge(stats.apiServicio)}>
                    {stats.apiServicio ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-gray-700/30 to-gray-600/20 rounded-lg sm:rounded-xl">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">Servidor Web</span>
                  <span className={getStatusBadge(stats.servidorWeb)}>
                    {stats.servidorWeb ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-lg sm:rounded-xl border border-blue-700/30">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">Última actualización</span>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full">
                    {lastUpdate}
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Activity Mejorado */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30">
              <h3 className="text-lg sm:text-xl font-black text-gray-100 mb-4 sm:mb-6 flex items-center space-x-2 sm:space-x-3">
                <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
                <span>Actividad en Tiempo Real</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-green-900/30 to-green-800/20 rounded-lg sm:rounded-xl border border-green-700/30">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">Solicitudes/min</span>
                  <span className="text-xl sm:text-2xl font-black text-green-400">{stats.solicitudes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-blue-900/30 to-blue-800/20 rounded-lg sm:rounded-xl border border-blue-700/30">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">Usuarios activos</span>
                  <span className="text-xl sm:text-2xl font-black text-blue-400">{stats.usuarios}</span>
                </div>
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-lg sm:rounded-xl border border-purple-700/30">
                  <span className="text-gray-300 font-medium text-sm sm:text-base">Procesos activos</span>
                  <span className="text-xl sm:text-2xl font-black text-purple-400">{stats.procesos}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid Mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 lg:mb-16">
          {[
            {
              icon: CpuChipIcon,
              title: 'Métricas en Tiempo Real',
              desc: 'Monitoreo continuo con actualizaciones cada 2 segundos y análisis predictivo avanzado',
              color: 'from-blue-500 to-cyan-600',
              bgColor: 'blue'
            },
            {
              icon: ServerIcon,
              title: 'Alta Disponibilidad',
              desc: 'Sistema diseñado para 99.9% uptime con redundancia y recuperación automática',
              color: 'from-green-500 to-emerald-600',
              bgColor: 'green'
            },
            {
              icon: ChartPieIcon,
              title: 'Análisis Predictivo',
              desc: 'Inteligencia artificial para predecir tendencias y prevenir problemas',
              color: 'from-purple-500 to-purple-600',
              bgColor: 'purple'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`p-3 sm:p-4 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-gray-100 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Nueva Sección: Resumen de Rendimiento */}
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-700/30 mb-12 lg:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-100 to-blue-300 bg-clip-text text-transparent mb-2 sm:mb-3">
              Resumen de Rendimiento del Sistema
            </h3>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Estado general del sistema basado en todas las métricas recopiladas en tiempo real
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl sm:rounded-2xl border border-green-700/30">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                <BoltIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">Rendimiento General</p>
              <p className={`text-xl sm:text-2xl font-black ${getStatusColor(stats.rendimiento, 'performance')}`}>
                {stats.rendimiento.toFixed(1)}%
              </p>
            </div>

            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl sm:rounded-2xl border border-blue-700/30">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                <SignalIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">Estabilidad de Red</p>
              <p className="text-xl sm:text-2xl font-black text-blue-400">{stats.uptime}%</p>
            </div>

            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl sm:rounded-2xl border border-purple-700/30">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-500/10 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                <ShieldCheckIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">Nivel de Seguridad</p>
              <p className="text-xl sm:text-2xl font-black text-purple-400">{stats.seguridad.toFixed(1)}%</p>
            </div>

            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-orange-900/20 to-orange-800/10 rounded-xl sm:rounded-2xl border border-orange-700/30">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-orange-500/10 rounded-xl sm:rounded-2xl mb-2 sm:mb-3">
                <ChartBarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-400 mb-1">Eficiencia Total</p>
              <p className="text-xl sm:text-2xl font-black text-orange-400">{((stats.rendimiento + stats.uptime + stats.seguridad) / 3).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Footer Mejorado */}
        <div className="text-center py-6 sm:py-8 border-t border-gray-700/30">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400 mb-3 sm:mb-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Operacional</span>
            </div>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="text-sm">Última actualización: {lastUpdate}</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            Dashboard del Sistema v.3.0 • Monitoreo en tiempo real • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;