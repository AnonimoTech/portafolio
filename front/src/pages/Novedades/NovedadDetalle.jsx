import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNovedadById } from "../../services/novedadesService";
import { Container, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";


function NovedadDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [novedad, setNovedad] = useState(null);

    useEffect(() => {
        getNovedadById(id).then(setNovedad).catch(console.error);
    }, [id]);

    if (!novedad) return <div className="container-fluid d-flex justify-content-center aling-content-center min-vh-100"><p className="text-center my-5">Cargando novedad...</p></div>;

    const { titulo, bajada, imagen, categoria, fecha, link } = novedad;
    const urlImg = import.meta.env.VITE_URL_IMG + imagen;

    return (
        <>
            <Helmet>
                <title>{titulo} | Novedades</title>
                <meta name="description" content={bajada} />
            </Helmet>
            <div className="container-fluid min-vh-100">
                <Container className="py-5">
                    <Button variant="light" onClick={() => navigate(-1)} className="mb-4">
                        <i className="bi bi-arrow-left"></i> Volver
                    </Button>

                    <h2 className="fw-bold">{titulo}</h2>
                    <p className="text-muted">{new Date(fecha).toLocaleDateString()} | {categoria}</p>

                    {imagen && (
                        <img
                            src={urlImg}
                            alt={titulo}
                            className="img-fluid my-3 rounded shadow"
                            loading="lazy"
                        />
                    )}

                    <p className="lead">{bajada}</p>

                    {link && (
                        <Button variant="primary" href={link} target="_blank" rel="noopener noreferrer">
                            Ver más
                        </Button>
                    )}
                </Container>
            </div>

        </>
    );
}

export default NovedadDetalle;
