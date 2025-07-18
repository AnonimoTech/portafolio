import { Container, Row, Col } from 'react-bootstrap';
import './ServiciosGrid.css';

const servicios = [
  {
    titulo: 'Diseño Gráfico',
    descripcion: 'Branding, identidad visual, piezas gráficas para redes y más.',
    icono: 'bi-palette-fill'
  },
  {
    titulo: 'Producción Audiovisual',
    descripcion: 'Videos institucionales, publicitarios, reels y edición profesional.',
    icono: 'bi-camera-video-fill'
  },
  {
    titulo: 'Diseño Web',
    descripcion: 'Sitios institucionales, tiendas online, landing pages y mantenimiento.',
    icono: 'bi-globe2'
  },
  {
    titulo: 'Marketing Digital',
    descripcion: 'Estrategias, pauta publicitaria, redes sociales, email marketing.',
    icono: 'bi-megaphone-fill'
  },
  {
    titulo: 'Fotografía Profesional',
    descripcion: 'Cobertura de eventos, retratos, productos y postproducción.',
    icono: 'bi-camera-fill'
  },
  {
    titulo: 'Consultoría Creativa',
    descripcion: 'Asesoramiento estratégico en imagen, comunicación y tecnología.',
    icono: 'bi-lightbulb-fill'
  }
];

function ServiciosGrid() {
  return (
    <section className="servicios-grid py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5">Nuestros Servicios</h2>
        <Row>
          {servicios.map((serv, i) => (
            <Col key={i} xs={12} md={6} lg={4} className="mb-4">
              <div className="servicio-card h-100 p-4 text-center border rounded shadow-sm">
                <i className={`bi ${serv.icono} fs-1 text-primary mb-3`}></i>
                <h5 className="fw-bold mb-2">{serv.titulo}</h5>
                <p className="text-muted small">{serv.descripcion}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default ServiciosGrid;