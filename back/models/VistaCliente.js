const mongoose = require("mongoose");

const vistaClienteSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
    unique: true 
  },
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  logoAgencia: {
    type: String, 
    required: false
  },
  logoCliente: {
    type: String, 
    required: false
  },
  descripcion: {
    type: String,
    trim: true
  },
  textoAdicional: {
    type: String,
    trim: true
  },
  linkIframe: {
    type: String,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("VistaCliente", vistaClienteSchema);
