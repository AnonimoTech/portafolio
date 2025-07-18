// const config={

// appConfig:
// {
//     port:process.env.APP_PORT,
//     host: process.env.APP_HOST
// },

// dbConfig:
// {
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     dbName: process.env.DB_NAME
// }

// }

// module.exports = config;

const config = {
  appConfig: {
    port: Number(process.env.APP_PORT) || 5000, // 👈 casteo seguro
    host: process.env.APP_HOST
  },
  dbConfig: {
    port: Number(process.env.DB_PORT) || 27017,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME
  }
};
module.exports = config;