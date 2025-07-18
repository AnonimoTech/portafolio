const Novedad = require("../models/Novedad");

const novedadesController = {
  // Obtener todas las novedades (público)
  getAll: async (req, res) => {
    try {
      const novedades = await Novedad.find().sort({ fecha: -1 });
      res.status(200).json(novedades);
    } catch (error) {
      console.error("Error al obtener novedades:", error);
      res.status(500).json({ error: "Error al obtener novedades" });
    }
  },

  // Crear una novedad (admin)
  create: async (req, res) => {
    try {
      const { titulo, bajada, link, categoria } = req.body;
      const imagen = req.file?.filename;

      const nueva = new Novedad({
        titulo,
        bajada,
        link,
        categoria,
        imagen
      });

      await nueva.save();

      res.status(201).json({
        message: "Novedad creada correctamente",
        data: nueva
      });
    } catch (error) {
      console.error("Error al crear novedad:", error);
      res.status(500).json({ error: "Error al crear novedad" });
    }
  },

  // Actualizar una novedad (admin)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, bajada, link, categoria } = req.body;
      const imagen = req.file?.filename;

      const updateData = { titulo, bajada, link, categoria };
      if (imagen) updateData.imagen = imagen;

      const actualizada = await Novedad.findByIdAndUpdate(id, updateData, { new: true });

      if (!actualizada) {
        return res.status(404).json({ error: "Novedad no encontrada" });
      }

      res.status(200).json({
        message: "Novedad actualizada correctamente",
        data: actualizada
      });
    } catch (error) {
      console.error("Error al actualizar novedad:", error);
      res.status(500).json({ error: "Error al actualizar novedad" });
    }
  },

  // Eliminar una novedad (admin)
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const novedad = await Novedad.findByIdAndDelete(id);
      if (!novedad) {
        return res.status(404).json({ error: "Novedad no encontrada" });
      }

      res.status(200).json({ message: "Novedad eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar novedad:", error);
      res.status(500).json({ error: "Error al eliminar novedad" });
    }
  },

  // Obtener una novedad por ID (público)
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const novedad = await Novedad.findById(id);

      if (!novedad) {
        return res.status(404).json({ error: "Novedad no encontrada" });
      }

      res.status(200).json(novedad);
    } catch (error) {
      console.error("Error al obtener novedad:", error);
      res.status(500).json({ error: "Error al obtener novedad" });
    }
  }


};

module.exports = novedadesController;
