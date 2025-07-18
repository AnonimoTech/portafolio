import { Link } from 'react-router-dom';
import './Footer.css'; // Estilos propios

function Footer() {
  return (
    <footer className="text-white pt-5 pb-4">
      <div className="container">
        <div className="row gy-4">

          {/* Columna 1: Logo + Descripción */}
          <div className="col-md-5">
            <div className="d-flex align-items-center mb-3">
              <img
                src="/img/identidad/logoUsina.webp"
                alt="Logo agencia de comunicacion Usina Creativa"
                height="40"
                className="me-2 mobileS"
                loading="lazy"
              />
            </div>
            <p className="text-light small bajadaInfoFooter">
              <strong>#ComunicaciónQueSeEntiende</strong> <br />
              Brindamos estrategias de comunicación con creatividad, innovación y gestión integral.
              <br />
              <Link to="https://wa.me/+5493515479413" className="text-info text-decoration-none">Contáctenos!</Link>
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div className="col-md-4">
            <h5 className="fw-bold">Contacto</h5>
            <ul className="list-unstyled text-light small">
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i>  Av. Castro Barros 117. Córdoba, Argentina
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope-fill me-2"></i> info.usinacreativa@gmail.com
              </li>
              <li >
                <i className="bi bi-phone-fill me-2"></i> +54 9 351 547-9413
              </li>
            </ul>


          </div>

          {/* Columna 3: Obra Social */}
          <div className="col-md-3">
            <h5 className="fw-bold">Seguinos</h5>
            {/* Redes Sociales */}
            <div className="mt-3">
              {/* <a href="#" className="text-light me-3 redesSo"><i className="bi bi-twitter"></i></a> */}
              <a href="https://www.facebook.com/usinacreativa" className="text-light me-3 redesSo"><i className="bi bi-facebook"></i></a>
              <a href="https://www.youtube.com/@usinacreativa7642" className="text-light me-3 redesSo"><i className="bi bi-youtube"></i></a>
              <a href="https://www.instagram.com/usina.creativa.ar/" className="text-light redesSo"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

        </div>

        {/* Línea divisoria */}
        <hr className="border-light my-4" />

        {/* Copyright */}
        <div className="text-center small text-light d-flex justify-content-center align-items-center">
          © 2025 todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
