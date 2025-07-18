const VistaCliente = require("../models/VistaCliente");

const vistaClienteController = {
  create: async (req, res) => {
    try {
      const { cliente, titulo, descripcion, textoAdicional, linkIframe } = req.body;
      const logoAgencia = req.files?.logoAgencia?.[0]?.filename;
      const logoCliente = req.files?.logoCliente?.[0]?.filename;

      const yaExiste = await VistaCliente.findOne({ cliente });
      if (yaExiste) return res.status(400).json({ error: "Ya existe una vista para este cliente." });

      const nueva = new VistaCliente({
        cliente,
        titulo,
        descripcion,
        textoAdicional,
        linkIframe,
        logoAgencia,
        logoCliente
      });

      await nueva.save();
      res.status(201).json({ message: "Vista creada correctamente", data: nueva });
    } catch (error) {
      console.error("❌ Error al crear vista:", error);
      res.status(500).json({ error: "Error al crear vista" });
    }
  },

  getByCliente: async (req, res) => {
    try {
      const clienteId = req.params.clienteId;

      const vista = await VistaCliente.findOne({ cliente: clienteId }).populate("cliente", "username email");
      if (!vista) return res.status(404).json({ error: "Vista no encontrada" });

      res.status(200).json(vista);
    } catch (error) {
      console.error("❌ Error al obtener vista:", error);
      res.status(500).json({ error: "Error al obtener vista" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion, textoAdicional, linkIframe } = req.body;
      const logoAgencia = req.files?.logoAgencia?.[0]?.filename;
      const logoCliente = req.files?.logoCliente?.[0]?.filename;

      const updateData = { titulo, descripcion, textoAdicional, linkIframe };
      if (logoAgencia) updateData.logoAgencia = logoAgencia;
      if (logoCliente) updateData.logoCliente = logoCliente;

      const actualizada = await VistaCliente.findByIdAndUpdate(id, updateData, { new: true });
      if (!actualizada) return res.status(404).json({ error: "Vista no encontrada" });

      res.status(200).json({ message: "Vista actualizada correctamente", data: actualizada });
    } catch (error) {
      console.error("❌ Error al actualizar vista:", error);
      res.status(500).json({ error: "Error al actualizar vista" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const vista = await VistaCliente.findByIdAndDelete(id);
      if (!vista) return res.status(404).json({ error: "Vista no encontrada" });

      res.status(200).json({ message: "Vista eliminada correctamente" });
    } catch (error) {
      console.error("❌ Error al eliminar vista:", error);
      res.status(500).json({ error: "Error al eliminar vista" });
    }
  },
  getAll: async (req, res) => {
    try {
      const vistas = await VistaCliente.find().populate("cliente", "username email");
      res.status(200).json(vistas);
    } catch (error) {
      console.error("❌ Error al obtener todas las vistas:", error);
      res.status(500).json({ error: "Error al obtener vistas" });
    }
  },

};

module.exports = vistaClienteController;
