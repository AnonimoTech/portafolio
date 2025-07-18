// src/pages/Admin/AdminUsuarios.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { deleteUser, updateUser } from "../../services/authService";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

import './stylesPanelsAdmin.css'

const API_URL = import.meta.env.VITE_API_URL;

function AdminUsuarios() {
    const { token } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        fechaNacimiento: "",
        rol: "Cliente"
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);


    const fetchUsuarios = async () => {
        try {
            const res = await axios.get(`${API_URL}/auth/usuarios`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsuarios(res.data);
        } catch (err) {
            console.error("Error al obtener usuarios", err);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            if (editingUser) {
                // Armamos objeto solo con campos modificados (salvo password, que es opcional)
                const camposActualizados = {};
                for (const key in form) {
                    if (form[key] !== "") {
                        camposActualizados[key] = form[key];
                    }
                }

                await updateUser(editingUser, camposActualizados, token);
                setSuccess("Usuario actualizado correctamente");
                Swal.fire("Actualizado", "Usuario actualizado correctamente", "success");
            } else {
                await axios.post(`${API_URL}/auth/register`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSuccess("Usuario creado correctamente");
                Swal.fire("Creado", "Usuario registrado correctamente", "success");
            }

            setForm({ username: "", email: "", password: "", fechaNacimiento: "", rol: "Cliente" });
            setEditingUser(null);
            fetchUsuarios();
        } catch (err) {
            console.error("Error en el formulario:", err);
            setError("No se pudo completar la operación");
            Swal.fire("Error", "No se pudo completar la operación", "error");
        }
    };



    const handleEditar = (usuario) => {
        setForm({
            username: usuario.username,
            email: usuario.email,
            fechaNacimiento: usuario.fechaNacimiento?.slice(0, 10),
            rol: usuario.rol,
            password: ""
        });
        setEditingUser(usuario._id);
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(id, token);
                await fetchUsuarios();
                Swal.fire('Eliminado', 'Usuario eliminado con éxito', 'success');
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
            }
        }
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
                    <h2 className="mb-4 text-center text-uppercase fw-bold border-bottom">Gestión de Usuarios</h2>

                    <Row>
                        <Col md={4} className="card p-4 shadow">
                            <h4 className="text-center fw-bold border-bottom">{editingUser ? "Actualizar usuario" : "Registrar nuevo cliente"}</h4>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit} className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Contraseña {editingUser && "(dejar vacío si no se quiere cambiar)"}
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder={editingUser ? "Nueva contraseña (opcional)" : undefined}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Select name="rol" value={form.rol} onChange={handleChange}>
                                        <option value="Cliente">Cliente</option>
                                        <option value="Admin">Admin</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required={!editingUser}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="fechaNacimiento"
                                        value={form.fechaNacimiento}
                                        onChange={handleChange}
                                        required={!editingUser}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-center">
                                    <Button variant={editingUser ? "primary" : "primary"} type="submit">
                                        {editingUser ? "🗘 Actualizar" : "+ Crear Usuario"}
                                    </Button>
                                    {editingUser && (
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            className="ms-2"
                                            onClick={() => {
                                                setForm({
                                                    username: "",
                                                    email: "",
                                                    password: "",
                                                    fechaNacimiento: "",
                                                    rol: "Cliente"
                                                });
                                                setEditingUser(null);
                                                setError(null);
                                                setSuccess(null);
                                                Swal.fire({
                                                    toast: true,
                                                    position: 'top-end',
                                                    icon: 'info',
                                                    title: 'Edición cancelada',
                                                    showConfirmButton: false,
                                                    timer: 2000,
                                                });

                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Col>


                        <Col md={8}>
                            <h4 className="text-center fw-bold mb-3">Lista de usuarios</h4>
                            <DataTable
                                columns={[
                                    {
                                        name: "#",
                                        selector: (row, index) => index + 1,
                                        width: "60px"
                                    },
                                    {
                                        name: "ID",
                                        selector: (row) => row._id,
                                        cell: (row) => <span className="text-nowrap">{row._id}</span>,
                                        sortable: false
                                    },
                                    {
                                        name: "Usuario",
                                        selector: (row) => row.username,
                                        sortable: true
                                    },
                                    {
                                        name: "Rol",
                                        selector: (row) => row.rol,
                                        sortable: true,
                                        center: true
                                    },
                                    {
                                        name: "Acciones",
                                        cell: (row) => (
                                            <div className="d-flex justify-content-center gap-2 w-100">
                                                <Button variant="outline-primary" size="sm" onClick={() => handleEditar(row)} title="Editar">
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>
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
                                data={usuarios}
                                pagination
                                responsive
                                striped
                                highlightOnHover
                                noDataComponent="No hay usuarios registrados"
                                className="card p-2 rounded shadow"
                            />
                        </Col>

                    </Row>
                </Container>
            </div>
        </>

    );
}

export default AdminUsuarios;
