const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    const { username, email, password, fechaNacimiento } = req.body;

    try {
      if (!username || !email || !password || !fechaNacimiento) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

      // 🔥 Validación de edad (mínimo 18 años)
      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 18 || (age === 18 && today < new Date(birthDate.setFullYear(today.getFullYear())))) {
        return res.status(400).json({ error: "Debes tener al menos 18 años para registrarte." });
      }

      const user = new User({ username, email, password, fechaNacimiento });
      await user.save();

      res.status(201).json({ message: "Usuario registrado con éxito", user });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ error: "Usuario registrado o email registrado" });
    }
  },

  login: async (req, res) => {  // 👈 🔥 Aquí debe estar bien escrito
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(401).json({ error: "Credenciales incorrectas" });

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(401).json({ error: "Credenciales incorrectas" });

      const secretKey = process.env.SECRET_KEY || "defaultsecret";
      const token = jwt.sign(
        { userId: user._id, username: user.username, rol: user.rol },
        secretKey,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          rol: user.rol,
        },
      });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  },


  updateFechaNacimiento: async (req, res) => {
    try {
      const { id } = req.params;
      const { fechaNacimiento } = req.body;

      if (!fechaNacimiento) {
        return res.status(400).json({ error: "La fecha de nacimiento es obligatoria" });
      }

      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        return res.status(400).json({ error: "Debes tener al menos 18 años." });
      }

      const user = await User.findByIdAndUpdate(
        id,
        { fechaNacimiento: birthDate },
        { new: true }
      );

      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      res.status(200).json({ message: "Fecha actualizada con éxito", user });
    } catch (error) {
      console.error("❌ Error al actualizar fecha:", error);
      res.status(500).json({ error: "Error al actualizar la fecha de nacimiento" });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      res.status(200).json({ user });
    } catch (error) {
      console.error("❌ Error al obtener perfil:", error);
      res.status(500).json({ error: "Error al obtener los datos del usuario" });
    }
  },

  updatePassword: async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ error: "Contraseña actual incorrecta" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await user.save();

      res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      console.error("❌ Error al actualizar contraseña:", error);
      res.status(500).json({ error: "Error al actualizar la contraseña" });
    }
  },

  traerUsers: async (req, res) => {
    try {
      const usuarios = await User.find().select("username rol");
      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      res.status(200).json({ message: "Usuario eliminado con exito" });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).json({ error: "Error al eliminar usuario" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, rol, fechaNacimiento, password } = req.body;

      const updateData = { username, email, rol, fechaNacimiento };

      if (password && password.trim() !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      const user = await User.findByIdAndUpdate(id, updateData, { new: true });

      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

      res.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
      console.error("Error al actualizar el usuario", error);
      res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  }


};

module.exports = userController;