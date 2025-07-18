// src/components/home/AliadoEstrategico.jsx
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import bgAliado from '../../assets/image/home/aliadoEstrategico/bgAliado.webp';
import imgAliado from '../../assets/image/home/aliadoEstrategico/logo.png';
import "./AliadoEstrategico.css";

export default function AliadoEstrategico() {
    return (
        <section
            className="aliado-estrategico d-flex align-items-center text-white p-4 text-center"
            style={{ backgroundImage: `url(${bgAliado})` }}
        >
            <Container>
                <h2 className="fw-bold text-uppercase mb-4">Una alianza estratégica</h2>
                <a
                    href="https://explanans.com.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    
                >
                    <img
                        src={imgAliado}
                        alt="Explanans"
                        className="img-fluid aliado-logo mb-4 mt-4"
                        style={{ maxWidth: "350px" }}
                    />
                </a>
                <p className="mb-2 mt-4">
                    Explanans es un equipo de profesionales con compromiso, visión estratégica y enfoque interdisciplinario.
                </p>
                <p className="mb-2">
                    Provenimos del ámbito académico, la comunicación, la gestión pública y la consultoría privada. Nos une la pasión por comprender y transformar la realidad.
                </p>
                <p className="mb-2">
                    Acompañamos a nuestros clientes en la búsqueda de soluciones que faciliten decisiones clave y generen impacto real.
                </p>
                <p className="fw-bold mt-3">
                    Somos EXPLANANS: entendemos, explicamos y transformamos.
                </p>
            </Container>
        </section>
    );
}
