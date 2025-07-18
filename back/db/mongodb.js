const mongoose = require('mongoose');

mongoose.connection.on("open", () => console.log("DB connected"));


async function connectDb() {

  const uri = process.env.MONGO_URI_LOCAL

  // const uri = `mongodb://${host}:${port}/${dbName}`;
  await mongoose.connect(uri, { useNewUrlParser: true });
}

module.exports = connectDb;

// codigo de produccion

// const mongoose = require('mongoose');

// mongoose.connection.on("open", () => console.log("🟢 DB conectada a MongoDB Atlas"));

// async function connectDb() {
//   const uri = process.env.MONGO_URI;
//   try {
//     await mongoose.connect(uri); // sin opciones extra
//   } catch (error) {
//     console.error("🔴 Error al conectar a la base de datos:", error);
//     process.exit(1);
//   }
// }

// module.exports = connectDb;

