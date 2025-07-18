import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./VistaCliente.css"

const url_img = import.meta.env.VITE_URL_IMG;

function VistaCliente() {
  const { user } = useAuth();
  const [vista, setVista] = useState(null);

  useEffect(() => {
    const fetchVista = async () => {
      try {
        const res = await axios.get(
          // `http://localhost:5000/vista-cliente/cliente/${user.id}`,
          `https://app.usinacreativa.ar/api/vista-cliente/cliente/${user.id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setVista(res.data);

      } catch (error) {
        console.error("Error al cargar vista del cliente", error);
      }
    };

    if (user?.rol === "Cliente") fetchVista();
  }, [user]);

  if (!vista) return <p className="text-center mt-5">Cargando vista personalizada...</p>;

  return (
    
    <div className="container mt-4 contenedorVistaCliente">
        
      {console.log("URL de logo agencia:", `${url_img}${vista.logoAgencia}`)}
      <div className="d-flex justify-content-between align-items-center">
        <img className="ocultar" src={`${url_img}${vista.logoAgencia}`} alt={vista.logoAgencia} height={50} />
        <h2>{vista.titulo}</h2>
        <img src={`${url_img}${vista.logoCliente}`} alt={vista.logoCliente} height={50} />
      </div>
      <p className="mt-3">{vista.descripcion}</p>
      <p className="d-none">{vista.textoAdicional}</p>
      <div className="ratio ratio-16x9 mt-4 mb-4 card" >
        {/* <iframe width="600" height="338" src={vista.linkIframe} frameborder="0" style="border:0" allowfullscreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe> */}
        <iframe className="shadow " src={vista.linkIframe} title="Dashboard Cliente" allowFullScreen></iframe>
      </div>
    </div>
  );
}

export default VistaCliente;