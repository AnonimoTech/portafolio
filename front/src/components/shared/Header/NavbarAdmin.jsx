import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

function NavbarAdmin() {
  const { user, logout } = useAuth();

  function cerrarMenu() {
    const menu = document.getElementById("navbarAdmin");
    if (menu?.classList.contains("show")) {
      const collapse = new window.bootstrap.Collapse(menu, {
        toggle: false,
      });
      collapse.hide();
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container-fluid px-4">

          {/* LOGO */}
          <Link className="navbar-brand" to="/" onClick={cerrarMenu}>
            <img
              src="/img/identidad/logoUsina.webp"
              alt="Logo Usina"
              height="40"
              className="PC"
              loading="lazy"
            />
            <img
              src="/img/identidad/logoHorizontalUsina.webp"
              alt="Logo Usina"
              height="70"
              className="Mobile"
              loading="lazy"
            />
          </Link>

          {/* Botón hamburguesa mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarAdmin"
            aria-controls="navbarAdmin"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido del navbar */}
          <div className="collapse navbar-collapse" id="navbarAdmin">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={cerrarMenu}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/portafolio" onClick={cerrarMenu}>Portafolio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/novedades" onClick={cerrarMenu}>Novedades</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/la-usina" onClick={cerrarMenu}>La usina</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto" onClick={cerrarMenu}>Contacto</Link>
              </li>

              {/* Dropdown del admin */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="dropdownAdmin"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={cerrarMenu}
                >
                  {user?.username}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownAdmin">
                  <li>
                    <Link className="dropdown-item" to="/admin" onClick={cerrarMenu}>
                      Panel de administración
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/usuarios" onClick={cerrarMenu}>
                      Gestión de usuarios
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/portafolio" onClick={cerrarMenu}>
                      Gestión de portafolio
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/novedades" onClick={cerrarMenu}>
                      Gestión de novedades
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/vistas-cliente" onClick={cerrarMenu}>
                      Gestión de vistas clientes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-light" to="/" onClick={logout}>
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavbarAdmin;
