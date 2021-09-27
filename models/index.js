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
db.contreOffre = require("../models/contreOffre.model")(sequelize, Sequelize);
db.membre = require("../models/membre.model")(sequelize, Sequelize);
db.adresse = require("../models/adresse.model")(sequelize, Sequelize);
db.association = require("../models/association.model")(sequelize, Sequelize);
db.depot = require("../models/depot.model")(sequelize, Sequelize);
db.projetassociative = require("../models/projetAssociative.model")(sequelize, Sequelize);
db.inscriptionAssociation = require("../models/insciptionAssociation.model")(sequelize, Sequelize);
db.card = require("./card.model")(sequelize, Sequelize);
db.productsCard = require("./products_card.model")(sequelize, Sequelize);
db.command = require("./command.model")(sequelize, Sequelize);

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

// db.card.belongsToMany(db.produit, {
//   through: "item",
//   as: "produits",
//   foreignKey: "cardId",
//   otherKey: "produitId"
// });
// db.produit.belongsToMany(db.card, {
//   through: "item",
//   as: "cards",
//   foreignKey: "produitId",
//   otherKey: "cardId"

// });

db.card.belongsToMany(db.produit, { through: db.productsCard, foreignKey: "cardId" });
db.produit.belongsToMany(db.card, { through: db.productsCard, foreignKey: "produitId" });



db.modele.belongsTo(db.brand, { foreignKey: 'brandId' });
db.modele.belongsTo(db.type, { foreignKey: 'typeId' });
db.modele.belongsTo(db.user);
db.user.hasMany(db.modele);
db.user.hasMany(db.produit);

db.user.hasMany(db.contreOffre);
db.user.hasMany(db.command);

db.produit.belongsTo(db.modele, { foreignKey: 'modeleId' });
db.produit.belongsTo(db.user, { foreignKey: 'userId' });

db.telephone.belongsTo(db.modele, { foreignKey: 'modeleId' });

db.ordinateurportable.belongsTo(db.modele, { foreignKey: 'modeleId' });

db.revente.belongsTo(db.produit, { foreignKey: 'produitId' });
db.revente.belongsTo(db.user, { foreignKey: 'userId' });

db.membre.belongsTo(db.user, { foreignKey: 'userId' });
db.membre.belongsTo(db.adresse, { foreignKey: 'adresseId' });

db.association.belongsTo(db.user, { foreignKey: 'userId' });
db.association.belongsTo(db.adresse, { foreignKey: 'adresseId' });

//db.depot.belongsTo(db.user, { foreignKey: 'userId' });
//db.depot.belongsTo(db.adresse, { foreignKey: 'adresseId' });

db.projetassociative.belongsTo(db.association, { foreignKey: 'associationId' });
//db.inscriptionAssociation.belongsTo(db.association, { foreignKey: 'associationId' });

db.contreOffre.belongsTo(db.user, { foreignKey: 'userId' });
db.contreOffre.belongsTo(db.revente, { foreignKey: 'resallId' });

// db.card.belongsTo(db.produit , { foreignKey: 'produitId' } );
db.card.belongsTo(db.user, { foreignKey: 'userId' });
// db.card.hasMany(db.produit);

db.command.belongsTo(db.user, { foreignKey: 'userId' });

db.ROLES = ["user", "admin", "manager", "association"];

module.exports = db;
