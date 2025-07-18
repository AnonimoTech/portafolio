// src/components/home/Clientes.jsx actualizado con Swiper Carousel + Bullets
import { Container } from "react-bootstrap";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "./Clientes.css";

// imágenes
import img1 from '../../assets/image/home/clientesLogo/atlantida.jpg';
import img2 from '../../assets/image/home/clientesLogo/consensos.jpg';
import img3 from '../../assets/image/home/clientesLogo/iecam.png';

const clientes = [
  { nombre: "Cliente A", logo: img1, url: "https://cursoposgradoradiologia.com.ar/" },
  { nombre: "Cliente B", logo: img2, url: "https://iecam.ar/" },
  { nombre: "Cliente C", logo: img3, url: "https://consensos.ar/" },
  { nombre: "Cliente D", logo: img1, url: "#" },
  { nombre: "Cliente E", logo: img2, url: "#" },
  { nombre: "Cliente F", logo: img3, url: "#" },
  { nombre: "Cliente G", logo: img1, url: "#" },
  { nombre: "Cliente H", logo: img2, url: "#" },
];

export default function Clientes() {
  return (
    <section className="clientes py-3 bg-light" id="clientes">
      <Container>
        <h2 className="text-center text-uppercase border-bottom fw-bold mb-4">nos eligieron</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
          }}
          modules={[Autoplay]}
        >
          {clientes.map((c, i) => (
            <SwiperSlide key={i} className="text-center">
              <a href={c.url || "#"} target="_blank" rel="noopener noreferrer">
                <img
                  src={c.logo}
                  alt={c.nombre}
                  className="img-fluid cliente-logo mb-4"
                  style={{ maxHeight: '60px', objectFit: 'contain' }}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="d-flex justify-content-center">
          <Link to="/qportafolio" className="btn boton-usina">
            <span class="boton-icono"></span><span class="boton-texto">Ir a portafolio</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
