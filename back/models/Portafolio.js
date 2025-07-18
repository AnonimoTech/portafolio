const mongoose = require("mongoose");

const portafolioSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  imagenPrincipal: {
    type: String,
    required: true
  },
  galeria: [
    {
      type: String
    }
  ],
  link: {
    type: String,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  destacado: {
    type: Boolean,
    default: false
  },
  categoria: {
  type: String,
  enum: ["Web", "Diseño", "Video", "Otro"], 
  required: true
}

});

module.exports = mongoose.model("Portafolio", portafolioSchema);
