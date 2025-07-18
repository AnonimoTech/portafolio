// src/components/ServiciosCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import './ServiciosCarousel.css';

// imagenes

import bgServicios from '../../assets/image/home/servicios/bg-servicios.webp'

import imgBranding from '../../assets/image/home/servicios/bg-cards/imgBranding.webp';
import imgCamPubli from '../../assets/image/home/servicios/bg-cards/imgCamPubli.webp';
import imgComuniInsti from '../../assets/image/home/servicios/bg-cards/imgComuniInsti.webp';
import imgDesarrolloWeb from '../../assets/image/home/servicios/bg-cards/imgDesarrolloWeb.webp';
import imgMarktengSocialMedia from '../../assets/image/home/servicios/bg-cards/imgMarktengSocialMedia.webp';
import imgOrgEventos from '../../assets/image/home/servicios/bg-cards/imgOrgEventos.webp';
import imgPaidMediaCampaDigitales from '../../assets/image/home/servicios/bg-cards/imgPaidMediaCampaDigitales.webp';
import imgProdAudioVisual from '../../assets/image/home/servicios/bg-cards/imgProdAudioVisual.webp';
import imgProdGrafica from '../../assets/image/home/servicios/bg-cards/imgProdGrafica.webp';


const servicios = [
    {
        titulo: 'BRANDING',
        icono: 'bi-palette',
        bajada: 'Creamos identidades visuales sólidas y memorables.',
        items: [
            'Diseño de estrategia.',
            'Diagnóstico institucional.',
            'Planificación de campañas.',
            'Análisis comunicacional.',
            'Evaluación y asesoramiento político y electoral.'
        ],
        color: 'bg-azul',
        imagen: imgBranding,
    },
    {
        titulo: 'MARKETING DIGITAL Y SOCIAL MEDIA',
        icono: 'bi-megaphone',
        bajada: 'Impulsamos tu presencia en redes con creatividad y estrategia.',
        items: [
            'Entrenamiento vocal.',
            'Entrenamiento corporal.',
            'Construcción del discurso.',
            'Media training.',
        ],
        color: 'bg-cien',
        imagen: imgMarktengSocialMedia,
    },
    {
        titulo: 'COMUNICACIÓN INSTITUCIONAL',
        icono: 'bi-building',
        bajada: 'Potenciamos la imagen y mensajes de tu organización.',
        items: [
            'Gestión de redes sociales.',
            'Diseño de campañas digitales.',
            'Informes de conversación digital.',
            'Planificación de pautado.',
        ],
        color: 'bg-verde',
        imagen: imgComuniInsti,

    },
    {
        titulo: 'PAID MEDIA Y CAMPAÑAS DIGITALES',
        icono: 'bi-bullseye',
        bajada: 'Estrategias pagas para llegar al público correcto.',
        items: [
            'Estudios cuantitativos.',
            'Estudios cualitativos.',
            'Estudios de mercado.',
            'Informes especiales.',
            'Reporte de medios.',
        ],
        color: 'bg-hex',
        imagen: imgPaidMediaCampaDigitales,

    },
    {
        titulo: 'ORGANIZACIÓN DE EVENTOS',
        icono: 'bi-calendar-event',
        bajada: 'Planificamos y producimos eventos que dejan huella.',
        items: [
            'Estudios cuantitativos.',
            'Estudios cualitativos.',
            'Estudios de mercado.',
            'Informes especiales.',
            'Reporte de medios.',
        ],
        color: 'bg-marron',
        imagen: imgOrgEventos,

    },
    {
        titulo: 'DESARROLLO WEB',
        icono: 'bi-laptop',
        bajada: 'Sitios funcionales, atractivos y adaptados a tus objetivos.',
        items: [
            'Estudios cuantitativos.',
            'Estudios cualitativos.',
            'Estudios de mercado.',
            'Informes especiales.',
            'Reporte de medios.',
        ],
        color: 'bg-naranja',
        imagen: imgDesarrolloWeb,

    },
    {
        titulo: 'CAMPAÑAS PUBLICITARIAS',
        icono: 'bi-badge-ad',
        bajada: 'Creatividad estratégica para llegar e impactar.',
        items: [
            'Estudios cuantitativos.',
            'Estudios cualitativos.',
            'Estudios de mercado.',
            'Informes especiales.',
            'Reporte de medios.',
        ],
        color: 'bg-rojo',
        imagen: imgCamPubli,

    },
    {
        titulo: 'PRODUCCIÓN AUDIOVISUAL',
        icono: 'bi-camera-reels',
        bajada: 'Contamos tu historia con imagen, sonido y emoción.',
        items: [
            'Estudios cuantitativos.',
            'Estudios cualitativos.',
            'Estudios de mercado.',
            'Informes especiales.',
            'Reporte de medios.',
        ],
        color: 'bg-rosa',
        imagen: imgProdAudioVisual,

    },
    {
        titulo: 'PRODUCCIÓN GRÁFICA',
        icono: 'bi-printer',
        bajada: 'Diseñamos piezas visuales que transmiten con impacto.',
        items: [
            'Estudios cuantitativos.',
            'Estudios cualitativos.',
            'Estudios de mercado.',
            'Informes especiales.',
            'Reporte de medios.',
        ],
        color: 'bg-violeta',
        imagen: imgProdGrafica,

    }
];


function ServiciosCarousel() {
    return (
        <section className='contenedorServicios py-5 h-100' style={{ backgroundImage: `url(${bgServicios})` }}>

            <div className="container ">
                <h2 className="text-center text-light border-bottom text-uppercase fw-bold ">Nuestros servicios</h2>
            </div>
            <div className="servicios-wrapper position-relative ">
                <div className="container py-4 h-100 bg-swippers">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        loop={true}
                        watchSlidesProgress={true}
                        slideToClickedSlide={true}
                        navigation={{
                            nextEl: '.custom-next-abs',
                            prevEl: '.custom-prev-abs'
                        }}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 200,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        pagination={{
                            el: '.bulletsServicios',
                            clickable: true
                        }}
                        modules={[EffectCoverflow, Navigation, Pagination]}
                        className="mySwiper"
                    >
                        {servicios.map((servicio, i) => (
                            <SwiperSlide key={i} className="servicio-slide py-2">
                                <div className={`card-servicios text-white`}>
                                    <div className="servicio-header">
                                        <div className="icono-bg" style={{ backgroundImage: `url(${servicio.imagen})` }}>

                                            {/* <i className={`bi ${servicio.icono} display-5`}></i> */}
                                        </div>
                                    </div>
                                    <div className={`servicio-body p-4 ${servicio.color}`}>
                                        <h5 className="card-title text-uppercase fw-bold">{servicio.titulo}</h5>
                                        <p className="small pt-2">{servicio.bajada}</p>
                                        <ul className="ps-3">
                                            {servicio.items.map((item, j) => (
                                                <li key={j} className="small">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                    <div className="bulletsServicios mt-4 d-flex justify-content-center"></div>

                </div>
                <button className="custom-prev-abs">
                    <i className="bi bi-chevron-left fs-4"></i>
                </button>
                <button className="custom-next-abs">
                    <i className="bi bi-chevron-right fs-4"></i>
                </button>
            </div>




        </section>
    );
}

export default ServiciosCarousel;
