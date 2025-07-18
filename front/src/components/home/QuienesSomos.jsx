// src/components/QuienesSomos.jsx
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./QuienesSomos.css";



export default function QuienesSomos() {
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const animateCounter = (setState, target) => {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setState(count);
        if (count >= target) clearInterval(interval);
      }, 30);
    };

    animateCounter(setProjects, 150);
    animateCounter(setClients, 100);
    animateCounter(setYears, 5);
  }, []);

  return (
    <section className="quienes-somos py-5 bg-light" id="quienes-somos">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="text-uppercase border-bottom mb-4">Quiénes Somos</h2>

            <p>
              En <strong>Usina Creativa</strong> somos un equipo apasionado por crear soluciones digitales que generan impacto real con una comunicación asertiva. Combinamos diseño, tecnología y estrategia para ayudar a nuestros clientes a crecer.
            </p>
            <p>
              Más que una agencia, somos socios en el proceso. Nos mueve la calidad, la cercanía y la mejora continua.
            </p>

            <div className="">
             
              <Link to="/quienes-somos" className="btn boton-usina">
                <span class="boton-icono"></span><span class="boton-texto">Conocé más</span>
              </Link>
            </div>
          </Col>
          <Col md={6}>

            <div className="valores mt-4">
              <Row>
                <Col xs={4} className="text-center">
                  <div className="bg-white rounded p-3 shadow">
                    <i className="bi bi-lightbulb-fill text-primary fs-1 mb-2"></i>
                    <h6>Innovación</h6>
                  </div>

                </Col>
                <Col xs={4} className="text-center">
                  <div className="bg-white rounded p-3 shadow">
                    <i className="bi bi-people-fill text-success fs-1 mb-2"></i>
                    <h6>Comunicación</h6>
                  </div>

                </Col>
                <Col xs={4} className="text-center">
                  <div className="bg-white rounded p-3 shadow">
                    <i className="bi bi-star-fill text-warning fs-1 mb-2"></i>
                    <h6>Excelencia</h6>
                  </div>

                </Col>
              </Row>
            </div>

            <Row className="text-center my-4">
              <Col xs={4}>
                <div className="bg-white rounded p-3 shadow">
                  <h4 className="text-primary">{projects}+</h4>
                  <p className="mb-0">Proyectos Completados</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="bg-white rounded p-3 shadow">
                  <h4 className="text-success">{clients}+</h4>
                  <p className="mb-0">Clientes Satisfechos</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="bg-white rounded p-3 shadow">
                  <h4 className="text-warning">{years}+</h4>
                  <p className="mb-0">Años de Experiencia</p>
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
      </Container>
    </section>
  );
}
