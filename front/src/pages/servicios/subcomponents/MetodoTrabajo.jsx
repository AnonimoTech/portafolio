import { Container, Row, Col } from 'react-bootstrap';
import './MetodoTrabajo.css';

const pasos = [
  {
    titulo: '1. Diagnóstico',
    texto: 'Escuchamos tus necesidades y analizamos el contexto de tu proyecto.'
  },
  {
    titulo: '2. Propuesta',
    texto: 'Creamos una solución estratégica y creativa a medida.'
  },
  {
    titulo: '3. Desarrollo',
    texto: 'Ejecutamos el proyecto con procesos claros y tiempos definidos.'
  },
  {
    titulo: '4. Lanzamiento',
    texto: 'Publicamos, medimos y mejoramos continuamente los resultados.'
  }
];

function MetodoTrabajo() {
  return (
    <section className="metodo-trabajo py-5">
      <Container>
        <h2 className="text-center mb-5">Cómo Trabajamos</h2>
        <Row>
          {pasos.map((paso, i) => (
            <Col key={i} md={6} lg={3} className="mb-4 text-center">
              <div className="paso h-100 p-4 border rounded shadow-sm">
                <h5 className="fw-bold mb-2">{paso.titulo}</h5>
                <p className="text-muted small">{paso.texto}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default MetodoTrabajo;
