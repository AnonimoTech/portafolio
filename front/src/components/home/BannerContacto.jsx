// src/components/home/BannerContacto.jsx
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BannerContacto.css";

export default function BannerContacto() {
  return (
    <section className="banner-contacto text-white d-flex align-items-center" id="cta-contacto">
      <div className="overlay"></div>
      <Container className="text-center content">
        <h2 className="display-5 fw-bold mb-3">
          ¿Querés <span className="text-acento">trabajar con nosotros</span>?
        </h2>
        <p className="lead mb-4">Contanos tu idea y hagámosla realidad juntos.</p>
        <Link to="/contacto" className="btn boton-usina">
          <span class="boton-icono"></span><span class="boton-texto">Ir a contacto</span>
        </Link>
      </Container>
    </section>
  );
}
