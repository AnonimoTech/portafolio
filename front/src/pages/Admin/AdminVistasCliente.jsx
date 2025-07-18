
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  createVistaCliente,
  updateVistaCliente,
  deleteVistaCliente,
  getTodasLasVistas
} from "../../services/vistaClienteService";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Container, Form, Row, Col, Button
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import './stylesPanelsAdmin.css'
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

function AdminVistasCliente() {
  const { token } = useAuth();
  const [clientes, setClientes] = useState([]);
  const [vistas, setVistas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [vistaSeleccionada, setVistaSeleccionada] = useState(null);

  const [form, setForm] = useState({
    cliente: "",
    titulo: "",
    descripcion: "",
    textoAdicional: "",
    linkIframe: "",
    logoAgencia: null,
    logoCliente: null,
  });

  useEffect(() => {
    fetchClientes();
    fetchVistas();
  }, []);

  const fetchClientes = async () => {
    const res = await axios.get(`${API_URL}/auth/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClientes(res.data.filter(u => u.rol === "Cliente"));
  };

  const fetchVistas = async () => {
    const res = await getTodasLasVistas(token);
    setVistas(res);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion && vistaSeleccionada) {
        await updateVistaCliente(vistaSeleccionada._id, form, token);
        Swal.fire("Actualizado", "Vista actualizada correctamente", "success");
      } else {
        await createVistaCliente(form, token);
        Swal.fire("Creada", "Vista creada correctamente", "success");
      }
      setFormVisible(false);
      setVistaSeleccionada(null);
      setForm({ cliente: "", titulo: "", descripcion: "", textoAdicional: "", linkIframe: "", logoAgencia: null, logoCliente: null });
      fetchVistas();
    } catch (err) {
      Swal.fire("Error", "No se pudo guardar la vista", "error");
    }
  };

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar vista?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    });

    if (confirm.isConfirmed) {
      await deleteVistaCliente(id, token);
      Swal.fire("Eliminada", "Vista eliminada correctamente", "success");
      fetchVistas();
    }
  };

  const iniciarEdicion = (vista) => {
    setFormVisible(true);
    setModoEdicion(true);
    setVistaSeleccionada(vista);
    setForm({
      cliente: vista.cliente._id,
      titulo: vista.titulo,
      descripcion: vista.descripcion,
      textoAdicional: vista.textoAdicional,
      linkIframe: vista.linkIframe,
      logoAgencia: null,
      logoCliente: null,
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
        <Container className="py-4">
          <h2 className="mb-4 text-center text-uppercase fw-bold border-bottom">Vistas por Cliente</h2>

          {!formVisible && (
            <div className="mb-4 text-end">
              <Button onClick={() => { setFormVisible(true); setModoEdicion(false); setForm({ cliente: "", titulo: "", descripcion: "", textoAdicional: "", linkIframe: "", logoAgencia: null, logoCliente: null }); }}>+ Crear Nueva Vista</Button>
            </div>
          )}

          {formVisible && (
            <Form onSubmit={handleSubmit} className="card p-4 shadow mb-4">
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Cliente</Form.Label>
                  <Form.Select name="cliente" value={form.cliente} onChange={handleChange} required>
                    <option value="">-- Seleccionar --</option>
                    {clientes.map(c => <option key={c._id} value={c._id}>{c.username} ({c.email})</option>)}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Título</Form.Label>
                  <Form.Control name="titulo" value={form.titulo} onChange={handleChange} required />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows={2} name="descripcion" value={form.descripcion} onChange={handleChange} />
                </Col>
                <Col md={6}>
                  <Form.Label>Texto adicional</Form.Label>
                  <Form.Control as="textarea" rows={2} name="textoAdicional" value={form.textoAdicional} onChange={handleChange} />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Link Iframe</Form.Label>
                  <Form.Control name="linkIframe" value={form.linkIframe} onChange={handleChange} />
                </Col>
                <Col md={3}>
                  <Form.Label>Logo Agencia</Form.Label>
                  <Form.Control type="file" name="logoAgencia" onChange={handleChange} />
                </Col>
                <Col md={3}>
                  <Form.Label>Logo Cliente</Form.Label>
                  <Form.Control type="file" name="logoCliente" onChange={handleChange} />
                </Col>
              </Row>

              <div className="d-flex justify-content-between">
                <Button type="submit" variant="primary">{modoEdicion ? "Actualizar" : "Crear Vista"}</Button>
                <Button variant="secondary" onClick={() => {
                  Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'info',
                    title: 'Edición cancelada',
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  setFormVisible(false)
                }}>Cancelar</Button>
              </div>
            </Form>
          )}

          {/* Tabla de vistas */}
          <DataTable
            columns={[
              {
                name: "Cliente",
                selector: row => row.cliente?.username,
                sortable: true
              },
              {
                name: "Título",
                selector: row => row.titulo,
                sortable: true,
                wrap: true
              },
              {
                name: "Acciones",
                cell: (row) => (
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="outline-info" size="sm" onClick={() => iniciarEdicion(row)} title="Editar">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Link
                      to={`/admin/vistas-cliente/preview/${row.cliente?._id}`}
                      className="btn btn-sm btn-outline-secondary"
                      title="Ver vista"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(row._id)} title="Eliminar">
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                center: true
              }
            ]}
            data={vistas}
            pagination
            responsive
            striped
            highlightOnHover
            noDataComponent="No hay vistas cargadas"
            className="card p-2 rounded shadow"
          />

        </Container>
      </div>
    </>

  );
}

export default AdminVistasCliente;
