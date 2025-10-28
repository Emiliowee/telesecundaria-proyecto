/**
 * Componente principal de la aplicación
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';

// Páginas
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Alumnos from './pages/Alumnos';
import Maestros from './pages/Maestros';
import Aulas from './pages/Aulas';
import Materias from './pages/Materias';
import Materiales from './pages/Materiales';
import Prestamos from './pages/Prestamos';
import Calificaciones from './pages/Calificaciones';
import Reportes from './pages/Reportes';

// Páginas de ejemplo (se crearán después)
const PaginaEnConstruccion = ({ titulo }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <i className="fas fa-tools text-6xl text-primary-500 mb-4"></i>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {titulo}
      </h2>
      <p className="text-gray-600">
        Esta sección está en construcción
      </p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Notificaciones Toast */}
        <Toaster 
          position="top-right" 
          richColors 
          expand={false}
          duration={3000}
        />

        <Routes>
          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta de recuperación de contraseña */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Usuarios - Solo Director y Secretario */}
            <Route 
              path="usuarios" 
              element={
                <ProtectedRoute requiredPermission="usuarios">
                  <Usuarios />
                </ProtectedRoute>
              } 
            />

            {/* Alumnos - Solo Secretario */}
            <Route 
              path="alumnos" 
              element={
                <ProtectedRoute requiredPermission="alumnos">
                  <Alumnos />
                </ProtectedRoute>
              } 
            />

            {/* Maestros - Solo Secretario */}
            <Route 
              path="maestros" 
              element={
                <ProtectedRoute requiredPermission="maestros">
                  <Maestros />
                </ProtectedRoute>
              } 
            />

            {/* Aulas - Solo Secretario */}
            <Route 
              path="aulas" 
              element={
                <ProtectedRoute requiredPermission="aulas">
                  <Aulas />
                </ProtectedRoute>
              } 
            />

            {/* Materias - Solo Secretario */}
            <Route 
              path="materias" 
              element={
                <ProtectedRoute requiredPermission="materias">
                  <Materias />
                </ProtectedRoute>
              } 
            />

            {/* Materiales - Solo Administrativo */}
            <Route 
              path="materiales" 
              element={
                <ProtectedRoute requiredPermission="materiales">
                  <Materiales />
                </ProtectedRoute>
              } 
            />

            {/* Préstamos - Solo Administrativo */}
            <Route 
              path="prestamos" 
              element={
                <ProtectedRoute requiredPermission="prestamos">
                  <Prestamos />
                </ProtectedRoute>
              } 
            />

            {/* Calificaciones - Todos excepto Administrativo */}
            <Route 
              path="calificaciones" 
              element={
                <ProtectedRoute requiredPermission="calificaciones">
                  <Calificaciones />
                </ProtectedRoute>
              } 
            />

            {/* Reportes - Todos excepto Administrativo */}
            <Route 
              path="reportes" 
              element={
                <ProtectedRoute requiredPermission="calificaciones">
                  <Reportes />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Ruta 404 */}
          <Route 
            path="*" 
            element={
              <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                  <i className="fas fa-exclamation-triangle text-6xl text-warning mb-4"></i>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                  <p className="text-gray-600 mb-4">Página no encontrada</p>
                  <a href="/dashboard" className="btn btn-primary">
                    <i className="fas fa-home mr-2"></i>
                    Volver al inicio
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

