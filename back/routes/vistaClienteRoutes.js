const express = require("express");
const router = express.Router();
const vistaClienteController = require("../controllers/vistaClienteController");
const authenticateToken = require("../middlewares/authenticateToken");
const roleMiddleware = require("../middlewares/roleMiddleware");
const multer = require("multer");
const upload = require("../libs/storage");

// Crear vista (solo Admin)
router.post(
  "/",
  authenticateToken,
  roleMiddleware("Admin"),
  upload.fields([
    { name: "logoAgencia", maxCount: 1 },
    { name: "logoCliente", maxCount: 1 }
  ]),
  vistaClienteController.create
);

// Obtener vista por cliente (cliente o admin)
router.get(
  "/cliente/:clienteId",
  authenticateToken,
  vistaClienteController.getByCliente
);

//traer todas las vistas
router.get(
  "/",
  authenticateToken,
  roleMiddleware("Admin"),
  vistaClienteController.getAll
);

// Actualizar (solo Admin)
router.put(
  "/:id",
  authenticateToken,
  roleMiddleware("Admin"),
  upload.fields([
    { name: "logoAgencia", maxCount: 1 },
    { name: "logoCliente", maxCount: 1 }
  ]),
  vistaClienteController.update
);

// Eliminar (solo Admin)
router.delete(
  "/:id",
  authenticateToken,
  roleMiddleware("Admin"),
  vistaClienteController.delete
);

module.exports = router;
