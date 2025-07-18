// src/components/home/BannerNovedades.jsx
import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getNovedades } from "../../services/novedadesService";
import "./BannerNovedades.css";

export default function BannerNovedades() {
  const [ultimaNovedad, setUltimaNovedad] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getNovedades();
      if (data && data.length > 0) {
        setUltimaNovedad(data[data.length - 1]);
      }
    };
    fetch();
  }, []);

  return (
    <section className="banner-novedades text-white py-5" id="novedades">
      <Container>
        <Row className="align-items-center">
          <Col md={8} className="text-md-start text-center mb-4 mb-md-0">
            <h2 className="display-5 fw-bold">Lo nuevo en Usina Creativa</h2>
            <p className="lead mb-4">
              Descubrí nuestras últimas novedades, lanzamientos, alianzas.
            </p>
           
            <Link to="/novedades" className="btn boton-usina">
              <span class="boton-icono"></span><span class="boton-texto">Ver todas las novedades</span>
            </Link>
          </Col>
          <Col md={4} className="text-center">
            {ultimaNovedad && (
              <Link to={`/novedades/${ultimaNovedad._id}`} className="novedad-card-link">
                <div className="bg-white text-dark rounded shadow p-3 novedad-card h-100">
                  <img
                    src={`${import.meta.env.VITE_URL_IMG}${ultimaNovedad.imagen}`}
                    alt={ultimaNovedad.titulo}
                    className="img-fluid rounded mb-3"
                  />
                  <h5 className="fw-bold">{ultimaNovedad.titulo}</h5>
                  <p className="mb-0 small">{ultimaNovedad.bajada}</p>
                </div>
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
