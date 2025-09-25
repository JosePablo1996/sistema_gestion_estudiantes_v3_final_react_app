import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

// Define las props para el componente Layout
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* Encabezado */}
      <Header />

      {/* Contenido principal de la página */}
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Pie de página (Footer) */}
      <Footer />
    </div>
  );
};
