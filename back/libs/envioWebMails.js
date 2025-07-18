// back/libs/envioWebMails.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const enviarWebMail = async ({ nombre, telefono, email, mensaje }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp.zoho.com
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Opcional pero útil para debug y despliegue
    await transporter.verify();
    console.log("📡 Conexión SMTP verificada con éxito");

    const mailOptions = {
      from: `"Formulario Web - Whisky & Co" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_DESTINO,
      replyTo: email, // si el dueño responde, va al cliente
      subject: "📩 Nuevo mensaje desde el formulario de contacto",
      html: `
        <h2>Nuevo contacto recibido desde la web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br>${mensaje}</p>
        <hr>
        <small>Este mensaje fue generado automáticamente por el sistema de contacto de whiskyandco.com.ar</small>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado correctamente");

  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    throw error; // Esto es manejado en el controller
  }
};

module.exports = enviarWebMail;
