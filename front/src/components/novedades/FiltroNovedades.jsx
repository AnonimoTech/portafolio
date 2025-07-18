import { Form, Row, Col } from "react-bootstrap";

function FiltroNovedades({ categoria, onCategoriaChange, search, onSearchChange }) {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <Form.Select value={categoria} onChange={(e) => onCategoriaChange(e.target.value)}>
          <option value="">Todas las categorías</option>
          <option value="Noticia">Noticia</option>
          <option value="Comunicado">Comunicado</option>
          <option value="Evento">Evento</option>
          <option value="Otro">Otro</option>
        </Form.Select>
      </Col>
      <Col md={8}>
        <Form.Control
          type="text"
          placeholder="Buscar por título o bajada..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Col>
    </Row>
  );
}

export default FiltroNovedades;
