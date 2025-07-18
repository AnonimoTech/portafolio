import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

function NavbarCliente() {
  const { user, logout } = useAuth();

  function cerrarMenu() {
    const menu = document.getElementById("navbarCliente");
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

          {/* Logo */}
          <Link className="navbar-brand" to="/login" onClick={cerrarMenu}>
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

          {/* Hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCliente"
            aria-controls="navbarCliente"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido */}
          <div className="collapse navbar-collapse" id="navbarCliente">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <div className="collapse navbar-collapse" id="navbarContenido">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                  {/* Dropdown */}
                  {/* <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="dropdownMenu" role="button"
                      data-bs-toggle="dropdown" aria-expanded="false" onClick={cerrarMenu}>
                      Institucional
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                      <li><Link className="dropdown-item" to="/quienes-somos" onClick={cerrarMenu}>Quienes somos</Link></li>
                      <li><Link className="dropdown-item" to="/servicios" onClick={cerrarMenu}>Servicios</Link></li>
                    </ul>
                  </li> */}

                  {/* Enlaces normales */}
                  {/* <li className="nav-item">
                    <Link className="nav-link" to="/la-usina" onClick={cerrarMenu}>La usina</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/clientes" onClick={cerrarMenu}>Clientes</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/novedades" onClick={cerrarMenu}>Novedades</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contacto" onClick={cerrarMenu}>Contacto</Link>
                  </li> */}

                  {/* <li className="nav-item">
                <Link className="nav-link" to="/"><img src="/img/identidad/sciF.webp" alt="" /></Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/"><img src="/img/identidad/sciV.webp" alt="" /></Link>
              </li> */}

                </ul>
              </div>

              <li className="nav-item">
                <Link className="nav-link" to={`/vista/${user?.id}`} onClick={cerrarMenu}>
                  Informe
                </Link>
              </li>

              <li className="nav-item">
                <button className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0" onClick={logout}>
                  Cerrar sesión
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavbarCliente;
