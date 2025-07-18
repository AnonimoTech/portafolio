import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages (importar luego)
import LoginPage from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import VistaCliente from './pages/vistaCliente/VistaCliente';
import HomePage from './pages/Home/Home';
import LaUsina from './pages/laUsina/LaUsina'
import NotFound from './pages/NotFound/NotFound'
import AdminUsuarios from './pages/Admin/AdminUsuarios';
import AdminPortafolio from './pages/Admin/AdminPortafolio';
import AdminNovedades from './pages/Admin/AdminNovedades';
import AdminVistasCliente from './pages/Admin/AdminVistasCliente';
import VistaClientePreview from './pages/Admin/VistaClientePreview';
import Portafolio from './pages/portfolio/Portafolio';
import ProjectDetail from './pages/portfolio/ProjectDetail';
import Novedades from './pages/Novedades/Novedades';
import NovedadDetalle from './pages/Novedades/NovedadDetalle';
import Contacto from './pages/contacto/Contacto';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.rol !== role) return <Navigate to="/" />;
  return children;
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vista/:clienteId" element={<VistaCliente />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/usuarios"
        element={
          <ProtectedRoute role="Admin">
            <AdminUsuarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/portafolio"
        element={
          <ProtectedRoute role="Admin">
            <AdminPortafolio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/novedades"
        element={
          <ProtectedRoute role="Admin">
            <AdminNovedades />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/vistas-cliente"
        element={
          <ProtectedRoute role="Admin">
            <AdminVistasCliente />
          </ProtectedRoute>
        }
      />

      <Route path="/admin/vistas-cliente/preview/:id" element={
        <VistaClientePreview />
      } />



      <Route path="/contacto" element={<Contacto />} />
      <Route path="/la-usina" element={<LaUsina />} />
      <Route path="/novedades" element={<Novedades />} />
      <Route path="/novedades/:id" element={<NovedadDetalle />} />
      <Route path="/portafolio" element={<Portafolio />} />
      <Route path="/proyecto/:id" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
