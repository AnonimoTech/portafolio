import { useEffect, useState } from "react";
import { getPortafolio } from "../../services/portafolioService";
import PortfolioGrid from "../../components/portfolio/PortfolioGrid";
import BannerContacto from "../../components/home/BannerContacto";


function Portafolio() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPortafolio();
      setProyectos(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container py-5">
        <h1 className="text-center mb-4">Mi Portafolio</h1>
        <PortfolioGrid proyectos={proyectos} />
      </div>
      <BannerContacto />
    </>
  );
}

export default Portafolio;
