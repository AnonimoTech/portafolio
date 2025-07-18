// src/components/views/servicios/Servicios.jsx
import { useState } from 'react';

import SEO from '../../../seo/SEO';
import BannerPortadas from '../../reutilizables/bannerPortadas/BannerPortadas';
import ContactBanner from '../../reutilizables/ContactBanner/ContactBanner';
import CategoryFilters from '../home/subcomponents/CategoryFilters';
import PortfolioGrid from '../home/subcomponents/PortfolioGrid';

import ServiciosGrid from './subcomponents/ServiciosGrid';
import MetodoTrabajo from './subcomponents/MetodoTrabajo';

import imgPortada from '../../../assets/image/contacto/portada.jpg'


function Servicios() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  return (
    <>
      <SEO
        title="Servicios - Usina Creativa"
        description="Conocé todos los servicios de nuestra agencia creativa en Córdoba: branding, audiovisual, web, institucional y más."
        url="https://usinacreativa.com.ar/servicios"
        image="https://usinacreativa.com.ar/img/servicios-og.jpg"
      />

      <BannerPortadas
        imagen={imgPortada}
        titulo="Nuestros Servicios"
      />

      <ServiciosGrid />

      <MetodoTrabajo />

      <ContactBanner />

      <CategoryFilters selected={selectedCategory} setSelected={setSelectedCategory} />
      <PortfolioGrid selectedCategory={selectedCategory} />
    </>
  );
}

export default Servicios;
