import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <AcademicCapIcon className="h-6 w-6 text-indigo-400" />
            <p className="text-sm">
              © {new Date().getFullYear()} Gestión de Estudiantes. Todos los derechos reservados.
            </p>
          </div>
          <nav className="flex space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
            >
              Términos de Servicio
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
