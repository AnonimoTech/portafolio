const express = require("express");
const authController = require("../controllers/authController");
const authenticateToken = require("../middlewares/authenticateToken");
const roleMiddleware = require("../middlewares/roleMiddleware");


const router = express.Router();

// Rutas públicas
router.post("/register", authController.register);
router.post("/login", authController.login);

// Rutas protegidas
router.get("/admin", authenticateToken, roleMiddleware("Admin"), (req, res) => {
  res.status(200).json({ message: `Bienvenido, Admin ${req.user.username}` });
});

router.get("/user-panel", authenticateToken, roleMiddleware("Cliente"), (req, res) => {
  res.status(200).json({ message: `Bienvenido, Usuario ${req.user.username}` });
});
router.get("/user-profile", authenticateToken, authController.getUserProfile);

router.get("/usuarios", authenticateToken, roleMiddleware("Admin"), authController.traerUsers);


router.patch("/change-password", authenticateToken, authController.updatePassword);


router.patch("/:id/fecha-nacimiento", authenticateToken, authController.updateFechaNacimiento);

router.delete("/usuarios/:id", authenticateToken, roleMiddleware("Admin"), authController.deleteUser);
router.put("/usuarios/:id", authenticateToken, roleMiddleware("Admin"), authController.updateUser);

router.patch("/reset-password/:username", async (req, res) => {
  const { username } = req.params;
  const { newPassword } = req.body;
  const bcrypt = require("bcrypt");
  const User = require("../models/User");

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar contraseña" });
  }
});


module.exports = router;
