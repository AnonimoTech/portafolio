import { useAuth } from "../../../context/AuthContext";
import NavbarAdmin from "./NavbarAdmin";
import NavbarCliente from "./NavbarCliente";
import NavbarPublic from "./NavbarPublic";




function Header() {
  const { user } = useAuth();

  if (!user) return <NavbarPublic />;
  if (user.rol === "Admin") return <NavbarAdmin />;
  if (user.rol === "Cliente") return <NavbarCliente />;

  return null;
}

export default Header;
