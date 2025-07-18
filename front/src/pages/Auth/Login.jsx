import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";

import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { token, user } = await authService.login(form);
      login(token, user); // ← usamos bien el context
      if (user.rol === "Admin") navigate("/admin");
      else navigate("/vista/" + user.id);
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container contenedorLogin py-5">
      <h2 className="mb-4 text-center border-bottom text-uppercase fw-bold">Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow ">
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input name="username" type="text" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input name="password" type="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
