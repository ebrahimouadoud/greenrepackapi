const config = require("../conf/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
    port: config.PORT,
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
db.modele = require("../models/modele.model.js")(sequelize, Sequelize);
db.brand = require("../models/brand.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model")(sequelize, Sequelize);
db.produit = require("../models/produit.model")(sequelize, Sequelize);
db.revente = require("../models/revente.model")(sequelize, Sequelize);
db.telephone = require("../models/telephone.model")(sequelize, Sequelize);
db.ordinateurportable = require("../models/laptop.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  as: "users",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  as: "roles",
  foreignKey: "userId",
  otherKey: "roleId"

});


db.modele.belongsTo(db.brand, { foreignKey: 'brandId' });
db.modele.belongsTo(db.type, { foreignKey: 'typeId' });

db.produit.belongsTo(db.modele, { foreignKey: 'modeleId' });

db.telephone.belongsTo(db.modele, { foreignKey: 'modeleId' });

db.ordinateurportable.belongsTo(db.modele, { foreignKey: 'modeleId' });

db.revente.belongsTo(db.produit, { foreignKey: 'produitId' });
db.revente.belongsTo(db.modele);
db.revente.belongsTo(db.user, { foreignKey: 'userId' });


db.ROLES = ["user", "admin", "manager", "association"];

module.exports = db;
