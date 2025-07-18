// 📁 src/components/views/contacto/Contacto.jsx
import Portada from '../../components/shared/Portada/Portada';
import './Contacto.css';

// import de imagenes 

import imgPortada from '../../assets/image/contacto/portada.jpg'

function Contacto() {
  return (
    <>
      <Portada
        imagen={imgPortada}
        titulo="Contactanos"
        bajada="Somos tu mejor eleccion"
        botonTexto=""
        botonLink=""
      />

      <section className="contacto-section container py-5">
        <div className="row">
          <div className="col-md-6 mb-4 p-4 bg-light rounded shadow-sm">
            <h2 className="fw-bold mb-3 text-uppercase border-bottom">Informacion de contacto</h2>
            <p className="text-muted">
              Escribinos para proyectos, consultas o presupuestos. Te responderemos a la brevedad.
            </p>

            <ul className="list-unstyled mt-4">
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-telephone-fill fs-4 text-primary me-3"></i>
                <div>
                  <strong>Telefono</strong><br />
                  +54 351 123-4567
                </div>
              </li>
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-envelope-fill fs-4 text-primary me-3"></i>
                <div>
                  <strong>Email</strong><br />
                  contacto@usinacreativa.com.ar
                </div>
              </li>
              <li className="d-flex align-items-start mb-3">
                <i className="bi bi-geo-alt-fill fs-4 text-primary me-3"></i>
                <div>
                  <strong>Direccion</strong><br />
                   Av. Castro Barros 117. Córdoba, Argentina
                </div>
              </li>
            </ul>

            <a href="https://wa.me/543511234567" target="_blank" rel="noreferrer" className="btn btn-success mt-3">
              <i className="bi bi-whatsapp me-2"></i> Escribinos al WhatsApp
            </a>
          </div>


          <div className="col-md-6">
            <form className="contact-form">
              <div className="form-floating mb-2">
                <input type="text" className="form-control" id="nombre" placeholder="Nombre" required />
                <label htmlFor="nombre">Nombre</label>
              </div>

              <div className="form-floating mb-2">
                <input type="email" className="form-control" id="email" placeholder="Correo electrónico" required />
                <label htmlFor="email">Correo electrónico</label>
              </div>
              
               <div className="form-floating mb-2">
                <input type="tel" className="form-control" id="tel" placeholder="Telefono" required />
                <label htmlFor="tel">Telefono</label>
              </div>

              <div className="form-floating mb-2">
                <textarea className="form-control" id="mensaje" placeholder="Mensaje" style={{ height: '170px' }} required />
                <label htmlFor="mensaje">Mensaje</label>
              </div>

              <button type="submit" className="btn btn-dark w-100">Enviar mensaje</button>
            </form>

          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;
