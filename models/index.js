require('dotenv').config();
const config = require("../conf/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.db,
  process.env.dbuser,
  process.env.dbpassword,
  {
    host: process.env.dbhost,
    dialect: process.env.dialect,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});



db.ROLES = ["user", "admin", "manager", "association"];

module.exports = db;
