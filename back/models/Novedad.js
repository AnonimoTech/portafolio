const mongoose = require("mongoose");

const novedadSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  bajada: {
    type: String,
    required: true,
    trim: true
  },
  imagen: {
    type: String, // nombre del archivo (webp, jpg, png, etc.)
    required: false
  },
  link: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    enum: ["Noticia", "Comunicado", "Evento", "Otro"],
    default: "Noticia"
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Novedad", novedadSchema);
