// hash.js
const bcrypt = require('bcrypt');

const contraseña = '!Atlan1234'; // Cambiá esto por cualquier contraseña que quieras hashear

bcrypt.hash(contraseña, 10)
  .then(hash => {
    console.log("Hash generado:");
    console.log(hash);
  })
  .catch(err => console.error("Error al generar hash:", err));
