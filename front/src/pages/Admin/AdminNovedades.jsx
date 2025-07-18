import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import './stylesPanelsAdmin.css'

const API_URL = import.meta.env.VITE_API_URL + "/novedades";

function AdminNovedades() {
  const [novedades, setNovedades] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    bajada: "",
    imagen: null,
    link: "",
    categoria: "Noticia"
  });

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNovedades();
  }, []);

  const fetchNovedades = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNovedades(res.data);
    } catch (error) {
      console.error("Error al obtener novedades", error);
      Swal.fire("Error", "No se pudieron cargar las novedades", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) formData.append(key, form[key]);

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Actualizado", "Novedad actualizada correctamente", "success");
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire("Creada", "Novedad creada correctamente", "success");
      }
      resetForm();
      fetchNovedades();
    } catch (error) {
      console.error("Error al guardar novedad", error);
      Swal.fire("Error", "No se pudo guardar la novedad", "error");
    }
  };

  const handleEdit = (novedad) => {
    setEditId(novedad._id);
    setForm({
      titulo: novedad.titulo,
      bajada: novedad.bajada,
      imagen: null,
      link: novedad.link || "",
      categoria: novedad.categoria || "Noticia"
    });

    setShow(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar novedad?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await fetchNovedades();
        Swal.fire("Eliminada", "Novedad eliminada correctamente", "success");
      } catch (error) {
        console.error("Error al eliminar novedad", error);
        Swal.fire("Error", "No se pudo eliminar la novedad", "error");
      }
    }
  };


  const resetForm = () => {
    setForm({ titulo: "", bajada: "", imagen: null, link: "", categoria: "Noticia" });

    setEditId(null);
    setShow(false);

  };

  const columnas = [
    {
      name: "Título",
      selector: row => row.titulo,
      sortable: true,
      wrap: true
    },
    {
      name: "Bajada",
      selector: row => row.bajada,
      sortable: true,
      wrap: true
    },
    {
      name: "Categoría", // ✅ NUEVA COLUMNA
      selector: row => row.categoria,
      sortable: true,
      center: true
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex justify-content-center gap-2 w-100">
          <Button variant="outline-primary" size="sm" onClick={() => handleEdit(row)}>
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(row._id)}>
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: true
    }
  ];


  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="light"
        onClick={() => navigate("/admin")}
        className="btn-back"
        title="Volver al panel"
      >
        <i className="bi bi-arrow-left"></i>
      </Button>

      <div className="container-fluid contenedorAdmin">
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold text-uppercase">Novedades</h2>
            <Button onClick={() => setShow(true)}>+ Crear novedad</Button>
          </div>

          <DataTable
            columns={columnas}
            data={novedades}
            pagination
            responsive
            highlightOnHover
            striped
            noDataComponent="No hay novedades para mostrar"
            className="card p-2 rounded shadow"
          />


          <Modal show={show} onHide={resetForm} centered >
            <Modal.Header closeButton>
              <Modal.Title>{editId ? "Editar" : "Crear"} novedad</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="container-fluid row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Título</Form.Label>
                      <Form.Control
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Imagen</Form.Label>
                      <Form.Control type="file" name="imagen" onChange={handleChange} accept="image/*" />
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Bajada</Form.Label>
                    <Form.Control
                      type="text"
                      name="bajada"
                      value={form.bajada}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        type="url"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="https://..."
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        required
                      >
                        <option value="Noticia">Noticia</option>
                        <option value="Comunicado">Comunicado</option>
                        <option value="Evento">Evento</option>
                        <option value="Otro">Otro</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="file" name="imagen" onChange={handleChange} accept="image/*" />
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer>

                <Button type="submit" variant="primary">
                  {editId ? "🗘 Actualizar" : "+ Crear"}
                </Button>
                <Button variant="secondary" onClick={() => {
                  resetForm(),
                    Swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "info",
                      title: "Formulario cancelado",
                      showConfirmButton: false,
                      timer: 1500
                    });
                }}>Cancelar</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default AdminNovedades;
