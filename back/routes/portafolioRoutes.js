const express = require("express");
const router = express.Router();
const portafolioController = require("../controllers/portafolioController");
const authenticateToken = require("../middlewares/authenticateToken");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../libs/storage");

// GET público
router.get("/", portafolioController.getAll);

// POST, PUT, DELETE (admin)
router.post(
  "/",
  authenticateToken,
  roleMiddleware("Admin"),
  upload.fields([
    { name: "imagenPrincipal", maxCount: 1 },
    { name: "galeria", maxCount: 10 }
  ]),
  portafolioController.create
);

router.put(
  "/:id",
  authenticateToken,
  roleMiddleware("Admin"),
  upload.fields([
    { name: "imagenPrincipal", maxCount: 1 },
    { name: "galeria", maxCount: 10 }
  ]),
  portafolioController.update
);

router.delete(
  "/:id",
  authenticateToken,
  roleMiddleware("Admin"),
  portafolioController.delete
);

module.exports = router;
