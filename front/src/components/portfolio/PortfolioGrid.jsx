import { useEffect, useState } from "react";
import useIsotope from "../../hooks/useIsotope";
import PortfolioCard from "./PortfolioCard";
import imagesLoaded from "imagesloaded";
import { AnimatePresence, motion } from "framer-motion";

import "./PortfolioGrid.css";
import '../../styles/portfolio-categorias.css';



//  Normaliza acentos y lowercase
function normalizar(texto) {
  return texto?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";
}

function PortfolioGrid({ proyectos }) {

  console.log("CATEGORÍAS:", proyectos.map(p => ({
    raw: p.categoria,
    normalizada: normalizar(p.categoria)
  })));


  const [filtro, setFiltro] = useState("todos");
  const [categorias, setCategorias] = useState([]);
  const [gridRef] = useIsotope(proyectos);

  const proyectosFiltrados = filtro === "todos"
    ? proyectos
    : proyectos.filter(p => normalizar(p.categoria) === filtro);


  //  Extrae categorías únicas desde los proyectos
  useEffect(() => {
    const cats = new Map();
    proyectos.forEach((p) => {
      const normal = normalizar(p.categoria);
      cats.set(normal, p.categoria); // guarda la forma original para mostrar
    });
    setCategorias([["todos", "Todos"], ...Array.from(cats.entries())]);

  }, [proyectos]);

  // SOLO este efecto para animar el reordenamiento
  useEffect(() => {
    if (gridRef.current) {
      const images = imagesLoaded(gridRef.current);
      images.on("always", () => {
        window.dispatchEvent(new Event("resize")); // fuerza relayout
      });
    }
  }, [proyectosFiltrados]);


  useEffect(() => {
    if (gridRef.current) {
      const images = imagesLoaded(gridRef.current);
      images.on("always", () => {
        window.dispatchEvent(new Event("resize")); // fuerza relayout
      });
    }
  }, [proyectosFiltrados]);





  if (!proyectos.length) {
    return <div className="container-fluid d-flex justify-content-center aling-content-center min-vh-100"><p className="text-center">No hay proyectos para mostrar.</p></div>;
  }

  return (
    <>
      {/* Botones de categorías dinámicos */}
      <div className="d-flex justify-content-center mb-4 category-scroll-container">
        {categorias.map(([key, label]) => (
          <button
            key={key}
            className={`btn mx-2 ${filtro === key ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => {
              console.log("Filtro aplicado:", key)
              setFiltro(key)
            }}
          >
            {label}
          </button>
        ))}

      </div>

      {/* Grid de proyectos */}
      <div className="portfolio-grid-wrapper isotope-container" ref={gridRef}>
        <AnimatePresence mode="wait">
          {proyectosFiltrados.map((item) => (
            <motion.div
              key={item._id}
              className="p-2 portfolio-grid-item grid-item"
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

    </>
  );
}

export default PortfolioGrid;
