import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPortafolio } from "../../services/portafolioService";

import './ProjectDetail.css'

const url_img = import.meta.env.VITE_URL_IMG;

function ProjectDetail() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getPortafolio();
      const selected = data.find((p) => p._id === id);
      setProyecto(selected);
    };
    fetch();
  }, [id]);

  if (!proyecto) return <p className="text-center">Cargando proyecto...</p>;

  return (
    <div className="project-detail">

      <div className="row flex-column-reverse flex-md-row">
        <div className="col-12 col-md-6">
          <h2>{proyecto.titulo}</h2>
          <p>{proyecto.descripcion}</p>
          <a href={proyecto.link} className="btn btn-success">ver web</a>

        </div>
        <div className="col-12 col-md-6"><img
          src={`${url_img}${proyecto.imagenPrincipal}`}
          alt={proyecto.titulo}
          className="main-image"
        /></div>
      </div>


      {proyecto.galeria?.length > 0 && (
        <>
          <h4>Galería</h4>
          <div className="gallery">
            {proyecto.galeria.map((img, i) => (
              <img
                key={i}
                src={`${url_img}${img}`}
                alt={`Galería ${i}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectDetail;