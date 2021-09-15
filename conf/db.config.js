module.exports = {
    HOST: process.env.dbhost,
    USER: process.env.dbuser,
    PASSWORD: process.env.dbpassword,
    DB: process.env.db,
    dialect: process.env.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };