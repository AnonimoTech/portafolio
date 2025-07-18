const Portafolio = require("../models/Portafolio");

const portafolioController = {
  // Obtener todos (público)
  getAll: async (req, res) => {
    try {
      const items = await Portafolio.find().sort({ fecha: -1 });
      res.status(200).json(items);
    } catch (error) {
      console.error("Error al obtener portafolio:", error);
      res.status(500).json({ error: "Error al obtener el portafolio" });
    }
  },

  // Crear (admin)
  create: async (req, res) => {
    try {
      const { titulo, descripcion, link, categoria, destacado } = req.body;
      const imagenPrincipal = req.files?.imagenPrincipal?.[0]?.filename;
      const galeria = req.files?.galeria?.map(file => file.filename) || [];

      const nuevo = new Portafolio({
        titulo,
        descripcion,
        categoria,
        destacado: destacado === "true",
        imagenPrincipal,
        galeria,
        link
      });

      await nuevo.save();
      res.status(201).json({ message: "Proyecto creado correctamente", data: nuevo });
    } catch (error) {
      console.error("Error al crear proyecto:", error);
      res.status(500).json({ error: "Error al crear proyecto" });
    }
  },

  // Editar (admin)
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion, link, categoria, destacado } = req.body;

      const updateData = {
        titulo,
        descripcion,
        link,
        categoria,
        destacado: String(destacado) === "true"
      };

      if (req.files?.imagenPrincipal?.[0]) {
        updateData.imagenPrincipal = req.files.imagenPrincipal[0].filename;
      }

      if (req.files?.galeria) {
        updateData.galeria = req.files.galeria.map(file => file.filename);
      }

      const actualizado = await Portafolio.findByIdAndUpdate(id, updateData, { new: true });

      if (!actualizado) return res.status(404).json({ error: "Proyecto no encontrado" });

      res.status(200).json({ message: "Proyecto actualizado", data: actualizado });
    } catch (error) {
      console.error("Error al actualizar proyecto:", error);
      res.status(500).json({ error: "Error al actualizar proyecto" });
    }
  },


  // Eliminar (admin)
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Portafolio.findByIdAndDelete(id);
      if (!eliminado) return res.status(404).json({ error: "Proyecto no encontrado" });

      res.status(200).json({ message: "Proyecto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      res.status(500).json({ error: "Error al eliminar proyecto" });
    }
  }
};

module.exports = portafolioController;
