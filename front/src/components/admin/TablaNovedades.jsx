import { useEffect, useState } from "react";
import { getNovedades, deleteNovedad } from "../../services/novedadesService";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

function TablaNovedades({ onEdit }) {
  const [novedades, setNovedades] = useState([]);

  const cargarNovedades = async () => {
    try {
      const data = await getNovedades();
      setNovedades(data);
    } catch (error) {
      console.error("Error al cargar novedades:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar novedad?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirmacion.isConfirmed) {
      try {
        await deleteNovedad(id);
        Swal.fire("Eliminado", "La novedad fue eliminada", "success");
        cargarNovedades();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  useEffect(() => {
    cargarNovedades();
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Título</th>
          <th>Bajada</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {novedades.map((novedad) => (
          <tr key={novedad._id}>
            <td>{novedad.titulo}</td>
            <td>{novedad.bajada}</td>
            <td>{novedad.categoria}</td>
            <td>{new Date(novedad.fecha).toLocaleDateString()}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(novedad)}>
                Editar
              </Button>{" "}
              <Button variant="danger" size="sm" onClick={() => handleDelete(novedad._id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TablaNovedades;
