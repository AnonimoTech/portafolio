import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function AdminDashboard() {
  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4 fw-bold text-center border-bottom text-uppercase">Panel de Administración</h2>
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestioná los usuarios cliente.</Card.Text>
              <Link to="/admin/usuarios" className="btn btn-primary">Ir a Usuarios</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Portafolio</Card.Title>
              <Card.Text>Agregá o editá trabajos del portafolio.</Card.Text>
              <Link to="/admin/portafolio" className="btn btn-primary">Ir a Portafolio</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Novedades</Card.Title>
              <Card.Text>Publicá novedades y comunicados.</Card.Text>
              <Link to="/admin/novedades" className="btn btn-primary">Ir a Novedades</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Vistas Cliente</Card.Title>
              <Card.Text>Creá vistas personalizadas para cada cliente.</Card.Text>
              <Link to="/admin/vistas-cliente" className="btn btn-primary">Ir a Vistas Cliente</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
