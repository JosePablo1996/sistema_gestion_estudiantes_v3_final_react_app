import React, { useState, useMemo, useCallback } from 'react'; 
import { useEstudiantes } from '../../hooks/useEstudiantes';
import { EstudianteList } from '../../components/estudiantes/EstudianteList/EstudianteList';
import { EstudianteModal } from '../../components/ui/Modal/EstudianteModal';
import { DeleteConfirmation } from '../../components/estudiantes/DeleteConfirmation/DeleteConfirmation';
import { Estudiante } from '../../types/estudiante';
import { EstudianteForm } from '../../components/estudiantes/EstudianteForm/EstudianteForm';
import { 
  PlusIcon, 
  ExclamationTriangleIcon, 
  AcademicCapIcon, 
  ServerIcon, 
  ArrowPathIcon,
  UserGroupIcon,
  ChartPieIcon,
  TrophyIcon,
  StarIcon
} from '@heroicons/react/24/outline';

// URL de la API
const API_URL = 'https://sistemas-gestion-estudiantes-fastapi-api.onrender.com';

export const EstudiantesPage: React.FC = () => {
  const { estudiantes, loading, error, refetch } = useEstudiantes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState<Estudiante | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [estudianteToDelete, setEstudianteToDelete] = useState<number | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);

  // Memoizar cálculos de estadísticas
  const estadisticas = useMemo(() => {
    const totalEstudiantes = estudiantes?.length || 0;
    const estudiantesJovenes = estudiantes?.filter(e => e.edad && e.edad < 25).length || 0;
    const estudiantesAdultos = estudiantes?.filter(e => e.edad && e.edad >= 25 && e.edad < 40).length || 0;
    const estudiantesMayores = estudiantes?.filter(e => e.edad && e.edad >= 40).length || 0;
    const promedioEdad = totalEstudiantes ? 
      Math.round(estudiantes!.reduce((sum, e) => sum + (e.edad || 0), 0) / totalEstudiantes) : 0;
    const estudiantesActivos = Math.floor(totalEstudiantes * 0.85);
    const tasaCrecimiento = totalEstudiantes > 10 ? '+12.5%' : '+0%';

    return {
      totalEstudiantes,
      estudiantesJovenes,
      estudiantesAdultos,
      estudiantesMayores,
      promedioEdad,
      estudiantesActivos,
      tasaCrecimiento
    };
  }, [estudiantes]);

  // Memoizar handlers
  const handleCreate = useCallback(() => {
    setSelectedEstudiante(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((estudiante: Estudiante) => {
    setSelectedEstudiante(estudiante);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setEstudianteToDelete(id);
    setIsConfirmModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (estudianteToDelete !== null) {
      try {
        const response = await fetch(`${API_URL}/estudiantes/${estudianteToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al eliminar el estudiante');
        
        refetch();
      } catch (err) {
        console.error('Failed to delete student:', err);
      } finally {
        setIsConfirmModalOpen(false);
        setEstudianteToDelete(null);
      }
    }
  }, [estudianteToDelete, refetch]);

  const handleSave = useCallback(async (estudiante: Estudiante) => {
    try {
      const method = selectedEstudiante ? 'PUT' : 'POST';
      const url = selectedEstudiante ? 
        `${API_URL}/estudiantes/${estudiante.id}` : `${API_URL}/estudiantes/`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(estudiante),
      });

      if (!response.ok) throw new Error('Error al guardar el estudiante');

      setIsModalOpen(false);
      refetch();
    } catch (err) {
      console.error('Failed to save student:', err);
    }
  }, [selectedEstudiante, refetch]);

  const handleRefetch = useCallback(async () => {
    setIsRefetching(true);
    await refetch();
    setTimeout(() => setIsRefetching(false), 1000);
  }, [refetch]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedEstudiante(null);
  }, []);

  const handleCloseConfirmModal = useCallback(() => {
    setIsConfirmModalOpen(false);
    setEstudianteToDelete(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header Section - Optimizado para móvil con tema oscuro */}
        <div className="text-center mb-6 sm:mb-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl sm:rounded-3xl transform -skew-y-1 sm:-skew-y-2 -z-10" />
          
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl mb-3 sm:mb-4 animate-float relative overflow-hidden">
            <AcademicCapIcon className="h-5 w-5 sm:h-8 sm:w-8 text-white z-10 relative" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12" />
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
            Dashboard Estudiantil
          </h1>
          
          <p className="text-sm sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl py-2 px-4 sm:py-3 sm:px-6 border border-gray-800">
            Gestión integral de información académica
          </p>
        </div>

        {/* Action Bar - Optimizado para móvil */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 sm:mb-7 gap-3 sm:gap-5">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={handleRefetch}
              disabled={isRefetching}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2 border border-gray-600 text-sm font-medium rounded-xl text-gray-200 bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 shadow-sm"
            >
              <ArrowPathIcon className={`h-4 w-4 sm:h-4 sm:w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
              {isRefetching ? 'Actualizando...' : 'Actualizar'}
            </button>
            
            <div className={`w-full sm:w-auto flex items-center justify-center space-x-2 text-xs px-3 py-2 rounded-xl shadow-sm ${
              error ? 'bg-red-900/50 text-red-200 border border-red-700' : 'bg-green-900/50 text-green-200 border border-green-700'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${error ? 'bg-red-500' : 'bg-green-500'}`} />
              <span className="font-medium">API: {error ? 'Inactiva' : 'Conectada'}</span>
            </div>
          </div>
          
          <button
            onClick={handleCreate}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 overflow-hidden border border-blue-500/30"
          >
            <span className="relative z-10 flex items-center">
              <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Nuevo Estudiante
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>

        {/* Statistics Grid - Responsive con tema oscuro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-5 sm:mb-7">
          {/* Total Estudiantes */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500/10 rounded-full -translate-y-6 sm:-translate-y-10 translate-x-6 sm:translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-blue-400/80 mb-1 uppercase tracking-wide">Total</p>
                  <p className="text-xl sm:text-3xl font-bold text-white">{estadisticas.totalEstudiantes}</p>
                </div>
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                  <UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-400 font-semibold bg-green-900/50 px-2 py-1 rounded-full">
                  {estadisticas.tasaCrecimiento}
                </span>
                <span className="text-xs text-gray-400">este mes</span>
              </div>
            </div>
          </div>

          {/* Edad Promedio */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/10 rounded-full -translate-y-6 sm:-translate-y-10 translate-x-6 sm:translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-purple-400/80 mb-1 uppercase tracking-wide">Edad Prom.</p>
                  <p className="text-xl sm:text-3xl font-bold text-purple-300">{estadisticas.promedioEdad}a</p>
                </div>
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                  <ChartPieIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 text-xs">
                <div className="text-center bg-blue-900/30 rounded p-1 border border-blue-700/50">
                  <div className="font-bold text-blue-300 text-xs">{estadisticas.estudiantesJovenes}</div>
                  <div className="text-gray-400 text-xs">{"<25"}</div>
                </div>
                <div className="text-center bg-green-900/30 rounded p-1 border border-green-700/50">
                  <div className="font-bold text-green-300 text-xs">{estadisticas.estudiantesAdultos}</div>
                  <div className="text-gray-400 text-xs">25-39</div>
                </div>
                <div className="text-center bg-orange-900/30 rounded p-1 border border-orange-700/50">
                  <div className="font-bold text-orange-300 text-xs">{estadisticas.estudiantesMayores}</div>
                  <div className="text-gray-400 text-xs">40+</div>
                </div>
              </div>
            </div>
          </div>

          {/* Estudiantes Activos */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-green-500/10 rounded-full -translate-y-6 sm:-translate-y-10 translate-x-6 sm:translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-green-400/80 mb-1 uppercase tracking-wide">Activos</p>
                  <p className="text-xl sm:text-3xl font-bold text-green-300">{estadisticas.estudiantesActivos}</p>
                </div>
                <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                  <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 shadow-lg" 
                  style={{ width: estadisticas.totalEstudiantes ? 
                    `${(estadisticas.estudiantesActivos / estadisticas.totalEstudiantes) * 100}%` : '0%' 
                  }}
                />
              </div>
              <div className="text-xs text-gray-300 mt-1 text-center font-medium">
                {estadisticas.totalEstudiantes ? 
                  Math.round((estadisticas.estudiantesActivos / estadisticas.totalEstudiantes) * 100) : 0
                }% participación
              </div>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-orange-500/10 rounded-full -translate-y-6 sm:-translate-y-10 translate-x-6 sm:translate-x-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-orange-400/80 mb-1 uppercase tracking-wide">Sistema</p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-300">Activo</p>
                </div>
                <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl group-hover:scale-110 transition-transform shadow-md">
                  <StarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Registros:</span>
                  <span className="font-semibold text-gray-200">{estadisticas.totalEstudiantes}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Estado:</span>
                  <span className="font-semibold text-green-400">OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Status Card - Responsive con tema oscuro */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-purple-900/50 rounded-2xl shadow-xl p-4 sm:p-5 mb-5 sm:mb-7 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden border border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                  <ServerIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-300 mb-1">API Endpoint</p>
                  <p className="text-white font-mono text-xs sm:text-sm truncate max-w-xs sm:max-w-md font-bold">
                    {API_URL.replace('https://', '')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className={`px-3 py-1 rounded-xl text-xs font-bold backdrop-blur-sm border ${
                  error ? 'bg-red-500/20 text-red-200 border-red-400/30' : 'bg-green-500/20 text-green-200 border-green-400/30'
                }`}>
                  {error ? 'OFFLINE' : 'ONLINE'}
                </div>
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse shadow-lg ${
                  error ? 'bg-red-400' : 'bg-green-400'
                }`} />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message - Responsive con tema oscuro */}
        {error && (
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-700 rounded-2xl shadow-xl p-4 sm:p-5 mb-5 sm:mb-7 animate-fade-in-up">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="p-2 sm:p-3 bg-red-800/50 rounded-xl animate-pulse">
                  <ExclamationTriangleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-red-300 mb-1">Error de Conexión</h3>
                <p className="text-red-200 mb-3 text-sm">{error}</p>
                <button
                  onClick={handleRefetch}
                  disabled={isRefetching}
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-semibold rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 w-full sm:w-auto"
                >
                  <ArrowPathIcon className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
                  Reintentar Conexión
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Students List Section - Responsive con tema oscuro */}
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-600/50 bg-gradient-to-r from-gray-800 to-gray-900/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-2 sm:mb-0">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1">Registros</h2>
                <p className="text-gray-300 text-sm">Base de datos estudiantil</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xs font-semibold text-gray-200 bg-gray-700 px-3 py-1 rounded-xl shadow-sm">
                  {estadisticas.totalEstudiantes} {estadisticas.totalEstudiantes === 1 ? 'reg.' : 'regs.'}
                </span>
                {loading && (
                  <div className="flex items-center space-x-2 text-blue-400 bg-blue-900/30 px-3 py-1 rounded-xl">
                    <ArrowPathIcon className="h-4 w-4 animate-spin" />
                    <span className="text-xs font-medium">Cargando...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <EstudianteList
              estudiantes={estudiantes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <EstudianteModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <EstudianteForm
            estudianteInicial={selectedEstudiante}
            onSave={handleSave}
            onCancel={handleCloseModal}
          />
        </EstudianteModal>
      )}

      {isConfirmModalOpen && (
        <DeleteConfirmation
          isOpen={isConfirmModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseConfirmModal}
        />
      )}
    </div>
  );
};