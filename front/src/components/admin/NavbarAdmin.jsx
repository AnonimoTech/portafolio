import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function NavbarAdmin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/admin">Panel Admin</Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/novedades">Novedades</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/portafolio">Portafolio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/vistas-clientes">Vistas Clientes</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-3">Cerrar sesión</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
