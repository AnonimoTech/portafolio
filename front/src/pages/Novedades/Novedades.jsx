import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getNovedades } from "../../services/novedadesService";
import NovedadCard from "../../components/novedades/NovedadCard";
import FiltroNovedades from "../../components/novedades/FiltroNovedades";
import Portada from '../../components/shared/Portada/Portada';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import BannerContacto from "../../components/home/BannerContacto";

import portadaImg from '../../assets/image/portadas/portada.jpg'

import './Novedades.css';

function Novedades() {
    const [novedades, setNovedades] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getNovedades().then(setNovedades).catch(console.error);
    }, []);

    // ✅ FILTRADO OPTIMIZADO
    const novedadesFiltradas = useMemo(() => {
        return novedades.filter((n) => {
            const coincideCategoria = categoria ? n.categoria === categoria : true;
            const coincideBusqueda =
                n.titulo.toLowerCase().includes(search.toLowerCase()) ||
                n.bajada.toLowerCase().includes(search.toLowerCase());
            return coincideCategoria && coincideBusqueda;
        });
    }, [novedades, categoria, search]);

    return (
        <>
            {/*  SEO */}
            <Helmet>
                <title>Novedades | La Usina Creativa</title>
                <meta name="description" content="Explorá las últimas novedades, eventos, comunicados y noticias de La Usina Creativa. Enterate de todo lo que pasa." />
            </Helmet>
            <Portada
                imagen={portadaImg}
                titulo="Últimas novedades"
                bajada="Enterate de noticias, comunicados, eventos y más."
                botonTexto="Contacto"
                botonLink="/contacto"
            />
            <div className="container-fluid">
                <Container className="py-5">
                    <h2 className="fw-bold text-uppercase text-center border-bottom mb-3">Novedades</h2>
               

                    {/* Filtros */}
                    <FiltroNovedades
                        categoria={categoria}
                        onCategoriaChange={setCategoria}
                        search={search}
                        onSearchChange={setSearch}
                    />

                    {/* Responsive grid */}
                    <Row xs={1} sm={2} md={3} className="g-4">
                        {novedadesFiltradas.map((n) => (
                            <Col key={n._id}>
                                <NovedadCard
                                    {...n}
                                    imagen={import.meta.env.VITE_URL_IMG + n.imagen}
                                />
                            </Col>
                        ))}
                    </Row>                  
                </Container>
            </div>
            <BannerContacto />
        </>

    );
}

export default Novedades;
