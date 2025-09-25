import { useState, useEffect } from 'react';
import { Estudiante, EstudianteCreate } from '../types/estudiante';
import { estudianteService } from '../services/estudianteService';

export const useEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  // Verificar conexión con la API al cargar el hook
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await estudianteService.healthCheck();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      } catch {
        setConnectionStatus('disconnected');
      }
    };

    checkConnection();
  }, []);

  const fetchEstudiantes = async () => {
    if (connectionStatus === 'disconnected') {
      setError('No hay conexión con el servidor');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await estudianteService.getEstudiantes();
      setEstudiantes(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar estudiantes';
      setError(errorMessage);
      console.error('Error fetching estudiantes:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEstudiante = async (estudiante: EstudianteCreate) => {
    try {
      const nuevoEstudiante = await estudianteService.createEstudiante(estudiante);
      setEstudiantes(prev => [...prev, nuevoEstudiante]);
      return nuevoEstudiante;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear estudiante';
      setError(errorMessage);
      throw err;
    }
  };

  const updateEstudiante = async (id: number, estudiante: EstudianteCreate) => {
    try {
      const estudianteActualizado = await estudianteService.updateEstudiante(id, estudiante);
      setEstudiantes(prev => 
        prev.map(est => est.id === id ? estudianteActualizado : est)
      );
      return estudianteActualizado;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar estudiante';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteEstudiante = async (id: number) => {
    try {
      await estudianteService.deleteEstudiante(id);
      setEstudiantes(prev => prev.filter(est => est.id !== id));
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar estudiante';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    if (connectionStatus === 'connected') {
      fetchEstudiantes();
    }
  }, [connectionStatus]);

  return {
    estudiantes,
    loading,
    error,
    connectionStatus,
    refetch: fetchEstudiantes,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante
  };
};