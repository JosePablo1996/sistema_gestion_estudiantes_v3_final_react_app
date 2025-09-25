import React, { useState, useEffect } from 'react';
import { Estudiante } from '../../../types/estudiante';
import { PlusIcon, ArrowPathIcon, XMarkIcon, UserCircleIcon, AcademicCapIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface EstudianteFormProps {
  estudianteInicial?: Estudiante | null;
  onSave: (estudiante: Estudiante) => void;
  onCancel: () => void;
}

export const EstudianteForm: React.FC<EstudianteFormProps> = ({
  estudianteInicial,
  onSave,
  onCancel,
}) => {
  const [formState, setFormState] = useState({
    id: estudianteInicial?.id || 0,
    nombre: estudianteInicial?.nombre || '',
    edad: estudianteInicial?.edad || 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [fieldFocus, setFieldFocus] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const isEditMode = !!estudianteInicial;

  useEffect(() => {
    if (estudianteInicial) {
      setFormState({
        id: estudianteInicial.id,
        nombre: estudianteInicial.nombre,
        edad: estudianteInicial.edad,
      });
    }
  }, [estudianteInicial]);

  useEffect(() => {
    setIsValid(formState.nombre.trim().length > 0 && formState.edad > 0 && formState.edad <= 100);
  }, [formState.nombre, formState.edad]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'edad' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const estudianteGuardar: Estudiante = {
      id: isEditMode ? formState.id : Math.floor(Math.random() * 100000),
      nombre: formState.nombre.trim(),
      edad: formState.edad,
    };
    
    onSave(estudianteGuardar);
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setIsExiting(true);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  const handleFocus = (fieldName: string) => {
    setFieldFocus(fieldName);
  };

  const handleBlur = () => {
    setFieldFocus(null);
  };

  const FloatingEffects = () => (
    <>
      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400/30 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-4 right-4 w-1 h-1 bg-purple-400/30 rounded-full animate-float-delayed"></div>
    </>
  );

  return (
    <div className={`relative w-full max-w-4xl mx-auto p-1 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-indigo-500/15 rounded-2xl backdrop-blur-lg transition-all duration-500 ${
      isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
    }`}>
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-indigo-500/20 rounded-2xl blur-lg animate-pulse-glow"></div>
      <div className="absolute inset-0.5 bg-gradient-to-br from-white/95 to-white/90 rounded-2xl shadow-xl"></div>
      
      <FloatingEffects />

      <form onSubmit={handleSubmit} className="relative z-10 p-6 rounded-2xl">
        
        {/* Header compacto */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center animate-float">
              {isEditMode ? (
                <ArrowPathIcon className="h-8 w-8 text-white" />
              ) : (
                <PlusIcon className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                {isEditMode ? 'Editar Estudiante' : 'Nuevo Estudiante'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isEditMode ? 'Actualiza la información' : 'Agrega un nuevo estudiante'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Columna izquierda - Campos del formulario */}
          <div className="space-y-4">
            {isEditMode && (
              <div className="animate-slide-in-left">
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">ID del Estudiante</label>
                <div className="flex items-center space-x-3 p-3 bg-blue-50/50 rounded-xl border border-blue-200/60">
                  <AcademicCapIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-bold text-gray-800 font-mono">
                    #{estudianteInicial?.id.toString().padStart(3, '0')}
                  </span>
                </div>
              </div>
            )}

            {/* Campo Nombre */}
            <div className="animate-slide-in-right">
              <label htmlFor="nombre" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide flex items-center space-x-2">
                <UserCircleIcon className="h-4 w-4 text-blue-600" />
                <span>Nombre Completo</span>
              </label>
              <div className={`relative transition-all duration-300 ${fieldFocus === 'nombre' ? 'transform scale-101' : ''}`}>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={formState.nombre}
                  onChange={handleChange}
                  onFocus={() => handleFocus('nombre')}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 text-base border border-gray-300/70 rounded-xl focus:ring-0 focus:border-blue-500 transition-all duration-300 bg-white/80 font-medium shadow-sm hover:shadow-md placeholder-gray-400"
                  placeholder="Ej: María González López"
                  required
                />
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${fieldFocus === 'nombre' ? 'w-full' : ''}`}></div>
                {formState.nombre && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className={`w-2 h-2 rounded-full ${formState.nombre.trim().length > 0 ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                  </div>
                )}
              </div>
            </div>

            {/* Campo Edad */}
            <div className="animate-slide-in-left">
              <label htmlFor="edad" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-green-600" />
                <span>Edad del Estudiante</span>
              </label>
              <div className={`relative transition-all duration-300 ${fieldFocus === 'edad' ? 'transform scale-101' : ''}`}>
                <input
                  type="number"
                  name="edad"
                  id="edad"
                  value={formState.edad}
                  onChange={handleChange}
                  onFocus={() => handleFocus('edad')}
                  onBlur={handleBlur}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 text-base border border-gray-300/70 rounded-xl focus:ring-0 focus:border-green-500 transition-all duration-300 bg-white/80 font-medium shadow-sm hover:shadow-md placeholder-gray-400"
                  placeholder="Ej: 25"
                  required
                />
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300 ${fieldFocus === 'edad' ? 'w-full' : ''}`}></div>
                {formState.edad > 0 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className={`w-2 h-2 rounded-full ${formState.edad > 0 && formState.edad <= 100 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>Mín: 1 año</span>
                <span>Máx: 100 años</span>
              </div>
            </div>
          </div>

          {/* Columna derecha - Información y acciones */}
          <div className="space-y-4">
            {/* Indicador de validación */}
            <div className="animate-fade-in">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200/60">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isValid ? 'bg-green-400' : 'bg-gray-300'
                }`}>
                  <SparklesIcon className="h-3 w-3 text-white" />
                </div>
                <span className={`text-sm font-semibold ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
                  {isValid ? '✓ Listo para enviar' : 'Completa los campos'}
                </span>
              </div>
            </div>

            {/* Información del sistema */}
            <div className="animate-slide-in-up">
              <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/20 rounded-xl border border-slate-200/60">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                  <AcademicCapIcon className="h-4 w-4 text-blue-600" />
                  <span>INFORMACIÓN</span>
                </h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Registros:</span>
                    <span className="font-semibold">{formState.nombre ? 'Nuevo' : '0'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estado:</span>
                    <span className="font-semibold text-green-600">Activo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Última actualización:</span>
                    <span className="font-semibold">Ahora</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="animate-slide-in-up">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-300/50 hover:shadow-md hover:scale-102 active:scale-98 disabled:opacity-30"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 border border-blue-500/30 hover:shadow-lg hover:scale-102 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : isEditMode ? (
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                  ) : (
                    <PlusIcon className="h-4 w-4 mr-2" />
                  )}
                  {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </div>

            {/* Barra de progreso */}
            {isSubmitting && (
              <div className="animate-fade-in">
                <div className="w-full bg-gray-300/50 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-progress-expand"></div>
                </div>
                <p className="text-xs text-gray-600 text-center mt-2">Procesando...</p>
              </div>
            )}
          </div>
        </div>
      </form>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes progress-expand {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite 0.5s; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite 1s; }
        .animate-slide-in-left { animation: slide-in-left 0.4s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.4s ease-out; }
        .animate-slide-in-up { animation: slide-in-up 0.4s ease-out; }
        .animate-progress-expand { animation: progress-expand 0.8s ease-out; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .scale-101 { transform: scale(1.01); }
        .scale-102 { transform: scale(1.02); }
        .scale-98 { transform: scale(0.98); }
      `}</style>
    </div>
  );
};