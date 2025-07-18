import { Link } from "react-router-dom";
import './Header.css';

function NavbarPublic() {
  function cerrarMenu() {
    const menu = document.getElementById('navbarContenido');
    if (menu.classList.contains('show')) {
      const collapse = new window.bootstrap.Collapse(menu, {
        toggle: false
      });
      collapse.hide();
    }
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark container sticky-top">
        <div className="container-fluid">

          {/* LOGO */}
          <Link className="navbar-brand" to="/" onClick={cerrarMenu}>
            <img src="/img/identidad/logoUsina.webp" alt="Logo sindicato de luz y fuerza" height="40" className='PC' loading="lazy" />
            <img src="/img/identidad/logoHorizontalUsina.webp" alt="Logo sindicato de luz y fuerza" height="70" className='Mobile' loading="lazy" />
          </Link>

          {/* Botón hamburguesa mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContenido"
            aria-controls="navbarContenido" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido del navbar */}
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
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={cerrarMenu}>Soy cliente</Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default NavbarPublic;
