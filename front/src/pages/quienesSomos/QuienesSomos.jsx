import { useState } from 'react';

import SEO from '../../../seo/SEO';
import BannerPortadas from '../../reutilizables/bannerPortadas/BannerPortadas';
import ContactBanner from '../../reutilizables/ContactBanner/ContactBanner';
import CategoryFilters from '../home/subcomponents/CategoryFilters';
import PortfolioGrid from '../home/subcomponents/PortfolioGrid';

import { Container, Row, Col } from 'react-bootstrap';
import './QuienesSomos.css';

import imgPortada from '../../../assets/image/contacto/portada.jpg'
import imgEquipo from '../../../assets/image/home/equipo/equipo.jpg'


function QuienesSomos() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
  return (
    <>
      <SEO
        title="Quiénes Somos - Usina Creativa"
        description="Conocé a Usina Creativa: nuestra misión, valores y el equipo que hace posible cada proyecto."
        url="https://usinacreativa.com.ar/quienes-somos"
        image="https://usinacreativa.com.ar/img/quienes-somos-og.jpg"
      />

      <BannerPortadas
        imagen={imgPortada}
        titulo="Quiénes Somos"
      />

      <section className="quienes-somos py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <h2>Sobre Nosotros</h2>
              <p>Somos una agencia creativa con base en Córdoba. Nuestro equipo está compuesto por profesionales de distintas disciplinas que comparten la pasión por crear soluciones visuales, tecnológicas y estratégicas que marcan la diferencia.</p>

              <h4 className="mt-4">Misión</h4>
              <p>Brindar soluciones integrales en diseño, comunicación y desarrollo digital que generen valor real para nuestros clientes.</p>

              <h4 className="mt-4">Visión</h4>
              <p>Convertirnos en referentes en innovación creativa y técnica a nivel regional, potenciando el crecimiento de nuestros clientes y de nuestro equipo.</p>
            </Col>

            <Col md={6}>
              <h4>Valores</h4>
              <p>Compromiso, innovación, colaboración, responsabilidad y mejora continua.</p>
              <img src={imgEquipo} alt="Equipo Usina Creativa" className="img-fluid rounded mt-3 shadow" />
            </Col>
          </Row>
        </Container>
      </section>
      <ContactBanner />

      <CategoryFilters selected={selectedCategory} setSelected={setSelectedCategory} />
      <PortfolioGrid selectedCategory={selectedCategory} />
    </>
  );
}

export default QuienesSomos;
