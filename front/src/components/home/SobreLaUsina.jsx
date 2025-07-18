import { Container, Row, Col } from "react-bootstrap";
import "./SobreLaUsina.css";

export default function SobreLaUsina() {
  return (
    <section className="sobre-usina py-5 bg-white" id="sobre-usina">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src="/img/sobre-usina.jpg" alt="Sobre Usina Creativa" className="img-fluid rounded shadow" />
          </Col>
          <Col md={6}>
            <h2>Sobre Usina Creativa</h2>
            <p>Somos un equipo multidisciplinario con pasión por la innovación, el diseño y el desarrollo. Creemos en soluciones a medida y en relaciones humanas genuinas.</p>
            <ul className="list-unstyled">
              <li>✅ Trabajo a medida</li>
              <li>✅ Enfoque humano</li>
              <li>✅ Multidisciplinarios</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}