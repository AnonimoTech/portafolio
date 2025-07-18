const express = require("express");
const router = express.Router();
const novedadesController = require("../controllers/novedadesController");
const authenticateToken = require("../middlewares/authenticateToken");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../libs/storage"); 

// Obtener todas las novedades (público)
router.get("/", novedadesController.getAll);

// Obtener una novedad por ID (público)
router.get("/:id", novedadesController.getById);

// Crear una novedad (solo Admin)
router.post(
  "/",
  authenticateToken,
  roleMiddleware("Admin"),
  upload.single("imagen"),
  novedadesController.create
);

// Actualizar una novedad (solo Admin)
router.put(
  "/:id",
  authenticateToken,
  roleMiddleware("Admin"),
  upload.single("imagen"),
  novedadesController.update
);

// Eliminar una novedad (solo Admin)
router.delete(
  "/:id",
  authenticateToken,
  roleMiddleware("Admin"),
  novedadesController.delete
);

module.exports = router;
