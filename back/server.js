// require("dotenv").config();
// const app = require('./app');
// const connectDb = require('./db/mongodb');

// const { appConfig, dbConfig } = require('./config');

// async function initApp(appConfig, dbConfig){
//     try{
//         await connectDb(dbConfig)
//         app.listen(appConfig.port, ()=> console.log(`listen on ${appConfig.port}`))

//     }
//     catch (e){console.error(e)
//         process.exit(0)
//     }
// }

// initApp(appConfig, dbConfig)

require("dotenv").config();
const app = require('./app');
const connectDb = require('./db/mongodb');
const { appConfig } = require('./config'); // solo appConfig

async function initApp() {
  try {
    console.log("🧪 Intentando conectar a MongoDB Atlas...");
    await connectDb();
    console.log("✅ Conectado a MongoDB Atlas");

    console.log("🧪 Intentando iniciar servidor en puerto:", appConfig.port);
    app.listen(appConfig.port, () => {
      console.log(`✅ Servidor corriendo en puerto ${appConfig.port}`);
    });
  } catch (e) {
    console.error("❌ Error al iniciar la app:", e);
    process.exit(1);
  }
}

initApp();

