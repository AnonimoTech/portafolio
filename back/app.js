const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const novedadesRoutes = require('./routes/novedadesRoutes');
const portafolioRoutes = require("./routes/portafolioRoutes");
const vistaClienteRoutes = require("./routes/vistaClienteRoutes");


const allowedOrigins = [
  'http://localhost:5173',
  'https://app.usinacreativa.ar'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${__dirname}/storage/imgs`));

app.use(session({
  secret: process.env.SESSION_SECRET || 'appsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
}));


// app.use('/auth', authRoutes);
// app.use('/novedades', novedadesRoutes);
// app.use("/portafolio", portafolioRoutes);
// app.use("/vista-cliente", vistaClienteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/novedades', novedadesRoutes);
app.use("/api/portafolio", portafolioRoutes);
app.use("/api/vista-cliente", vistaClienteRoutes);


module.exports = app;
