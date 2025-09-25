import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://sistemas-gestion-estudiantes-fastapi-api.onrender.com')
  },
  server: {
    host: true, // Necesario para Capacitor (permite conexiones externas)
    port: 3000,
    strictPort: false // Permite cambiar el puerto si está ocupado
  },
  build: {
    outDir: 'dist', // Carpeta de build para Capacitor
    sourcemap: true, // Útil para debugging en producción
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          capacitor: ['@capacitor/core']
        }
      }
    }
  },
  resolve: {
    alias: {
      // Aliases opcionales para paths más cortos
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils'
    }
  },
  optimizeDeps: {
    include: ['@capacitor/core'] // Optimiza Capacitor en desarrollo
  }
})