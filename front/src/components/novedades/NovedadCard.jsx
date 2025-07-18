import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function NovedadCard({_id, titulo, bajada, imagen, link, categoria }) {
    return (
        <Link to={`/novedades/${_id}`} className="text-decoration-none text-dark">
            <Card className="shadow-sm h-100">
                {imagen && (
                    <Card.Img
                        variant="top"
                        src={imagen}
                        alt={titulo}
                        loading="lazy" // ✅ Lazy loading
                    />
                )}
                <Card.Body>
                    <small className="text-muted">{categoria}</small>
                    <Card.Title className="fw-bold">{titulo}</Card.Title>
                    <Card.Text>{bajada}</Card.Text>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline-primary btn-sm"
                        >
                            Ver más
                        </a>
                    )}
                </Card.Body>
            </Card>
        </Link>
    );
}

export default NovedadCard;
