import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function AdminResumen() {
  const cards = [
    {
      title: "Novedades",
      text: "Gestionar publicaciones, comunicados y eventos.",
      link: "/admin/novedades"
    },
    {
      title: "Portafolio",
      text: "Agregar, editar o eliminar trabajos del portafolio.",
      link: "/admin/portafolio"
    },
    {
      title: "Vistas por Cliente",
      text: "Crear vistas personalizadas para cada cliente.",
      link: "/admin/vistas-clientes"
    }
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Panel de Control</h3>
      <div className="row">
        {cards.map((card, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <Card className="h-100 shadow">
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Link to={card.link}>
                  <Button variant="primary">Ir</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminResumen;
