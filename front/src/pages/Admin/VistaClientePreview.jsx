// src/pages/Admin/VistaClientePreview.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const url_img = import.meta.env.VITE_URL_IMG;

function VistaClientePreview() {
  const { id } = useParams(); // ID de la vista
  const navigate = useNavigate();
  const [vista, setVista] = useState(null);

  useEffect(() => {
    const fetchVista = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/vista-cliente/cliente/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setVista(res.data);
      } catch (err) {
        console.error("Error al cargar la vista", err);
      }
    };
    fetchVista();
  }, [id]);

  if (!vista) return <p className="text-center mt-5">Cargando vista...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <img className="d-none" src={`${url_img}${vista.logoAgencia}`} alt="Agencia" height={50} />
        <h2>{vista.titulo}</h2>
        <img src={`${url_img}${vista.logoCliente}`} alt="Cliente" height={50} />
      </div>
      <p className="mt-3">{vista.descripcion}</p>
      <p className="d-none">{vista.textoAdicional}</p>
      <div className="ratio ratio-16x9 mt-4">
        <iframe className="mb-4 card shadow" src={vista.linkIframe} title="Vista" allowFullScreen />
      </div>
      <div className="text-center mt-4 mb-4">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  );
}

export default VistaClientePreview;
