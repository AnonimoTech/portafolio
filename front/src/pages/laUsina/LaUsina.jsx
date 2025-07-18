// 📁 src/components/views/lausina/LaUsina.jsx
import Portada from '../../components/shared/Portada/Portada';
import './LaUsina.css';

import imgPortada from '../../assets/image/portadas/portada.jpg';
import imgPlazi from '../../assets/image/laUsina/plazi.png'
import BannerContacto from '../../components/home/BannerContacto';

function LaUsina() {
  return (
    <>
      {/* Portada */}
      <Portada
        imagen={imgPortada}
        titulo="La Usina"
        bajada="Conocenos y contactanos"
        botonTexto="Contacto"
        botonLink="/contacto"
      />

      {/* Contenido principal */}
      <div className="container py-5">
        {/* PRIMER ROW */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="mb-3">¿Qué es Usina Creativa?</h2>
            <p>
              Usina Creativa es un espacio de trabajo colectivo formado por profesionales del diseño, la comunicación, lo audiovisual y la producción gráfica. Apostamos a crear desde lo social, lo político y lo territorial, con el objetivo de producir mensajes con identidad y compromiso.
            </p>
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">¿Qué es Usina Creativa?</h2>
            <p>
              Usina Creativa es un espacio de trabajo colectivo formado por profesionales del diseño, la comunicación, lo audiovisual y la producción gráfica. Apostamos a crear desde lo social, lo político y lo territorial, con el objetivo de producir mensajes con identidad y compromiso.
            </p>
          </div>
        </div>

        {/* SEGUNDO ROW */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-3">Presentación institucional</h2>
            <p>
              Conocé nuestra historia, nuestros valores y proyectos destacados en esta presentación interactiva desarrollada en Prezi.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <a
              href="https://prezi.com/mvnhfv8qeurf/usina-creativa-argentina/?utm_campaign=share&utm_medium=copy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={imgPlazi}
                alt="Prezi Usina Creativa"
                className="img-fluid rounded "
                style={{ maxHeight: '300px', cursor: 'pointer' }}
              />
              <p className="mt-2 text-decoration-underline">Ver en Prezi</p>
            </a>
          </div>
        </div>
      </div>
      <BannerContacto />
    </>
  );
}

export default LaUsina;
