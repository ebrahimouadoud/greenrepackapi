module.exports = {
    HOST: process.env.dbhost,
    USER: process.env.dbuser,
    PASSWORD: process.env.dbpassword,
    DB: process.env.db,
    DIALECT: process.env.dialect,
    PORT: process.env.port,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };