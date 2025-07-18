import PortfolioDestacados from '../../components/portfolio/PortfolioDestacados';
import Portada from '../../components/shared/Portada/Portada';
import QuienesSomos from '../../components/home/QuienesSomos';
import Testimonios from '../../components/home/Testimonios';
import Clientes from '../../components/home/Clientes';
import BannerNovedades from '../../components/home/BannerNovedades';
import BannerContacto from '../../components/home/BannerContacto';
import AliadoEstrategico from '../../components/home/AliadoEstrategico';
import ServiciosCatousel from '../../components/home/ServiciosCarousel';

// imagenes 
import imgPortada from '../../assets/image/portadas/portadaHome.webp'

const Home = () => (
  <>
      <Portada
        imagen={imgPortada}
        titulo="Bienvenidos/as a Usina Creativa"
        bajada="Comunicación no es lo que usted dice, sino lo que el otro entiende"
        botonTexto="Conocenos"
        botonLink="/contacto"
      />
      <PortfolioDestacados />
      <QuienesSomos />
      <ServiciosCatousel />
      <Testimonios />
      <Clientes />
      <AliadoEstrategico />
      <BannerNovedades />
      <BannerContacto />


  </>
);

export default Home;