import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import {
  getPortafolio,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} from "../../services/portafolioService";
import Swal from 'sweetalert2';
import DataTable from "react-data-table-component";

import './stylesPanelsAdmin.css'

function AdminPortafolio() {
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    destacado: false,
    quitarDestacado: false,
    imagenPrincipal: null,
    galeria: [],
    link: "",
  });
  const [previewImagen, setPreviewImagen] = useState(null);
  const [previewGaleria, setPreviewGaleria] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  const imagenInputRef = useRef(null);
  const galeriaInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getPortafolio();
      setProyectos(data);
    } catch (error) {
      console.error("Error al obtener portafolio", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagenPrincipal") {
      const file = files[0];
      setForm({ ...form, imagenPrincipal: file });
      setPreviewImagen(file ? URL.createObjectURL(file) : null);
    } else if (name === "galeria") {
      setForm({ ...form, galeria: files });
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewGaleria(previews);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formToSend = { ...form };
      if (editingId && form.quitarDestacado) {
        formToSend.destacado = false;
      }
      if (editingId) {
        await updateProyecto(editingId, formToSend, token);
        Swal.fire("Actualizado", "El proyecto fue actualizado con éxito", "success");
      } else {
        await createProyecto(form, token);
        Swal.fire("Creado", "El proyecto fue creado con éxito", "success");
      }

      // Reset completo
      setForm({
        titulo: "",
        descripcion: "",
        categoria: "",
        destacado: false,
        quitarDestacado: false,
        imagenPrincipal: null,
        galeria: [],
        link: "",
      });
      setEditingId(null);
      if (imagenInputRef.current) imagenInputRef.current.value = "";
      if (galeriaInputRef.current) galeriaInputRef.current.value = "";
      setPreviewImagen(null);
      setPreviewGaleria([]);
      fetchData();
    } catch (error) {
      console.error("Error al guardar proyecto", error);
      Swal.fire("Error", "Hubo un error al guardar el proyecto", "error");
    }
  };

  const handleEdit = (proyecto) => {
    setEditingId(proyecto._id);
    setForm({
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      categoria: proyecto.categoria,
      destacado: proyecto.destacado,
      quitarDestacado: false,
      imagenPrincipal: null,
      galeria: [],
      link: proyecto.link
    });

    if (imagenInputRef.current) imagenInputRef.current.value = "";
    if (galeriaInputRef.current) galeriaInputRef.current.value = "";
    setPreviewImagen(null);
    setPreviewGaleria([]);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Eliminando...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      });

      try {
        await deleteProyecto(id, token);
        fetchData();
        Swal.fire("Eliminado", "El proyecto fue eliminado", "success");
      } catch (error) {
        console.error("Error al eliminar proyecto", error);
        Swal.fire("Error", "No se pudo eliminar el proyecto", "error");
      }
    }
  };


  const handleCancelEdit = () => {
    setForm({
      titulo: "",
      descripcion: "",
      categoria: "",
      destacado: false,
      quitarDestacado: false,
      imagenPrincipal: null,
      galeria: [],
      link: "",
    });
    setEditingId(null);
    setPreviewImagen(null);
    setPreviewGaleria([]);
    if (imagenInputRef.current) imagenInputRef.current.value = "";
    if (galeriaInputRef.current) galeriaInputRef.current.value = "";
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Edición cancelada',
      showConfirmButton: false,
      timer: 2000,
    });
  };
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
          <h2 className="mb-3 fw-bold text-uppercase">Portafolio</h2>
          <div className="card p-4 shadow">
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  name="titulo"
                  className="form-control"
                  value={form.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  className="form-control"
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Imagen principal</label>
                <input
                  type="file"
                  name="imagenPrincipal"
                  className="form-control"
                  onChange={handleChange}
                  accept="image/*"
                  ref={imagenInputRef}
                />
                {previewImagen && (
                  <img
                    src={previewImagen}
                    alt="Preview"
                    className="img-fluid mt-2 rounded"
                    style={{ maxHeight: "200px" }}
                  />
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Galería de imágenes</label>
                <input
                  type="file"
                  name="galeria"
                  className="form-control"
                  onChange={handleChange}
                  accept="image/*"
                  multiple
                  ref={galeriaInputRef}
                />
                {previewGaleria.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {previewGaleria.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`galería-${i}`}
                        className="rounded"
                        style={{ height: "100px", objectFit: "cover" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label">Categoría</label>
                <select
                  className="form-control"
                  name="categoria"
                  value={form.categoria || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Seleccionar --</option>
                  <option value="Web">Web</option>
                  <option value="Diseño">Diseño</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              <div className="col-md-6 d-flex align-items-center justify-content-end form-check">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="checkboxDestacado"
                  name="destacado"
                  checked={form.destacado}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, destacado: e.target.checked }))
                  }
                />
                <label className="form-check-label" htmlFor="checkboxDestacado">
                  Marcar como destacado
                </label>
                {form.destacado && (
                  <span className="badge bg-success ms-2">Destacado</span>
                )}
              </div>





              <div className="col-md-6">
                <label className="form-label">Link al proyecto</label>
                <input
                  type="url"
                  name="link"
                  className="form-control"
                  value={form.link}
                  onChange={handleChange}
                />
              </div>


              <div className="col-md-6 d-flex justify-content-end">
                <div className="gap-3">
                  <button className="btn btn-success" type="submit">
                    {editingId ? "🗘 Actualizar" : "+ Crear nuevo"}
                  </button>
                  {editingId && (
                    <button className="btn btn-secondary botonCancelar" type="button" onClick={handleCancelEdit}>
                      Cancelar edición
                    </button>
                  )}
                </div>

              </div>
            </form>
          </div>

          <hr />
          <h4 className="fw-bold mb-3">Proyectos cargados</h4>
          <DataTable
            columns={[
              {
                name: "Título",
                selector: (row) => row.titulo,
                sortable: true,
                wrap: true
              },
              {
                name: "Categoría",
                selector: (row) => row.categoria,
                sortable: true
              },
              {
                name: "Destacado",
                cell: (row) => row.destacado ? "✅ Sí" : "—",
                sortable: true,
                center: true
              },
              {
                name: "Acciones",
                cell: (row) => (
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(row)}
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(row._id)}
                      title="Eliminar"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                center: true
              }
            ]}
            data={proyectos}
            pagination
            responsive
            highlightOnHover
            striped
            noDataComponent="No hay proyectos cargados"
            className="card p-2 rounded shadow"
          />

        </div>
      </div>
    </>

  );
}

export default AdminPortafolio;
