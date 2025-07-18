import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './PortfolioCard.css';

const url_img = import.meta.env.VITE_URL_IMG;

function PortfolioCard({ item }) {
  return (
    <Link to={`/proyecto/${item._id}`} className="text-decoration-none text-dark ">
      <motion.div whileHover={{ scale: 1.05 }} className="card portfolio-card h-100">
        <img
          src={`${url_img}${item.imagenPrincipal}`}
          alt={item.titulo}
          className="card-img-top"
        />
        <div className="overlay">
          <div className="overlay-content">
            <h5>{item.titulo}</h5>
            <p>{item.descripcion}</p>
          </div>
        </div>
      </motion.div>
    </Link>

  );
}

export default PortfolioCard;
