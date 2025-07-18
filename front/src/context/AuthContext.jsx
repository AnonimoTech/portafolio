import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          Swal.fire({
            icon: "warning",
            title: "Sesión expirada",
            text: "Por seguridad, debes volver a iniciar sesión.",
            confirmButtonText: "Aceptar"
          }).then(() => {
            logout();
            window.location.href = "/login";
          });
        } else {
          setLoading(false); // ✅ token válido
        }
      } catch (err) {
        console.error("Token inválido:", err);
        logout();
        window.location.href = "/login";
      }
    } else {
      setLoading(false); // ✅ no hay token
    }
  }, []);


  useEffect(() => {
    // Verificación periódica (cada 3 seg)
    const interval = setInterval(() => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;

          if (decoded.exp < now) {
            Swal.fire({
              icon: "warning",
              title: "Sesión expirada",
              text: "Por seguridad, debes volver a iniciar sesión.",
              confirmButtonText: "Aceptar"
            }).then(() => {
              logout();
              window.location.href = "/login";
            });
          }
        } catch (err) {
          console.error("Token inválido:", err);
          logout();
          window.location.href = "/login";
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [token]);


  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token); // ✅ esto faltaba
    localStorage.setItem("user", JSON.stringify(user));
  };


  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
