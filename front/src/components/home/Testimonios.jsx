// src/components/home/Testimonios.jsx
import { Container } from "react-bootstrap";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import imgEquipo from "../../assets/image/Testimoniales/imgProviTesti.webp";
import "./Testimonios.css";

const testimonios = [
  {
    nombre: "María Gómez",
    rol: "CEO, TechNova",
    comentario:
      "Trabajar con Usina Creativa fue increíble. Captaron nuestra visión y la superaron.",
    foto: imgEquipo,
  },
  {
    nombre: "Carlos Rivas",
    rol: "Fundador, EcoSmart",
    comentario:
      "Su atención al detalle y la calidad del desarrollo fue excelente. Muy recomendados!",
    foto: imgEquipo,
  },
  {
    nombre: "Lucía Fernández",
    rol: "Directora Creativa, MediaPro",
    comentario:
      "Nos acompañaron desde la idea hasta la ejecución. Superaron nuestras expectativas.",
    foto: imgEquipo,
  },
  {
    nombre: "Lucía Fernández",
    rol: "Directora Creativa, MediaPro",
    comentario:
      "Nos acompañaron desde la idea hasta la ejecución. Superaron nuestras expectativas.",
    foto: imgEquipo,
  },
];

export default function Testimonios() {
  return (
    <section className="testimonios py-5 " id="testimonios">
      <Container>
        <h2 className="text-center text-light border-bottom text-uppercase fw-bold mb-5">Testimonios</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 6000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
          modules={[Autoplay, Pagination]}
        >
          
          {testimonios.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card  rounded  p-4 h-100 text-center">
                <img
                  src={t.foto}
                  alt={t.nombre}
                  className="rounded-circle mb-3 mx-auto"
                  width="80"
                  height="80"
                />
                <p className="fst-italic mb-3 px-2">"{t.comentario}"</p>
                <p className="fw-bold text-primary mb-0">{t.nombre}</p>
                <small className="text-muted">{t.rol}</small>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        
      </Container>
    </section>
  );
}
