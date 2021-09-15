module.exports = (sequelize, Sequelize) => {
  const Modele = sequelize.define("modele", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.STRING
    },
    brandId: {
      type: Sequelize.INTEGER
    },
    typeId: {
      type: Sequelize.INTEGER
    }
  });

  return Modele;
};