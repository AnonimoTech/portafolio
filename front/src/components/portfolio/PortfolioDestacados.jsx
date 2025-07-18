import { useEffect, useState } from "react";
import { getPortafolio } from "../../services/portafolioService";
import PortfolioCard from "./PortfolioCard";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import imagesLoaded from "imagesloaded";
import useIsotope from "../../hooks/useIsotope";

import './PortfolioDestacados.css';
import '../../styles/portfolio-categorias.css';

// 🔠 Normaliza texto (acentos y mayúsculas)
function normalizar(texto) {
  return texto?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";
}

function PortfolioDestacados() {
  const [destacados, setDestacados] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [categorias, setCategorias] = useState([]);

  const filtrados = filtro === "todos"
    ? destacados
    : destacados.filter(p => normalizar(p.categoria) === filtro);

  const [gridRef] = useIsotope(filtrados);

  useEffect(() => {
    const images = imagesLoaded(gridRef.current);
    images.on("always", () => {
      window.dispatchEvent(new Event("resize"));
    });
  }, [filtrados]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getPortafolio();
      const filtrados = data.filter(p => p.destacado);
      setDestacados(filtrados);

      const cats = new Map();
      filtrados.forEach((p) => {
        const key = normalizar(p.categoria);
        cats.set(key, p.categoria);
      });
      setCategorias([["todos", "Todos"], ...Array.from(cats.entries())]);
    };
    fetch();
  }, []);

  if (!destacados.length) return <p className="text-center my-5">No hay proyectos destacados.</p>;

  return (
    <section className="contenedorDestacadosPort bg-light">
      <div className="container py-5">
        <h2 className="text-center text-uppercase fw-bold border-bottom mb-4">Nuestros trabajos</h2>

        <div className="d-flex justify-content-center mb-4 flex-wrap">
          {categorias.map(([key, label]) => (
            <button
              key={key}
              className={`btn m-2 ${filtro === key ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setFiltro(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* NUEVO LAYOUT flotante + isotope compatible */}
        <div className="portfolio-grid-wrapper isotope-container" ref={gridRef}>
          <AnimatePresence mode="wait">
            {filtrados.map((item) => (
              <motion.div
                key={item._id}
                className="p-2 portfolio-grid-item grid-item "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <PortfolioCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Link to="/portafolio" className="btn boton-usina">
            <span class="boton-icono"></span><span class="boton-texto">Conocé todos nuestros trabajos</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PortfolioDestacados;
