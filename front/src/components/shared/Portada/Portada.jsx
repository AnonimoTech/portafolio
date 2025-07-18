import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Portada.css";

function Portada({ imagen, titulo, bajada, botonTexto, botonLink }) {
  return (
    <div
      className="portada d-flex align-items-center justify-content-center text-white"
      style={{
        backgroundImage: `url(${imagen})`,
      }}
    >
      <div className="portada-overlay w-100 h-100 position-absolute top-0 start-0"></div>
      <Container className="position-relative text-center z-1">
        <h1 className="display-4 fw-bold">{titulo}</h1>
        <p className="lead">{bajada}</p>
        {botonTexto && botonLink && (
          <Link className="boton-usina" href={botonLink}>
            <span class="boton-icono"></span><span class="boton-texto ">{botonTexto}</span>
          </Link>
        )}
      </Container>
    </div>
  );
}

export default Portada;
