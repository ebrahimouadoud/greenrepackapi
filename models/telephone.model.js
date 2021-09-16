module.exports = (sequelize, Sequelize) => {
  const Telephone = sequelize.define("telephone", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    systExploitation: {
      type: Sequelize.STRING
    },
    stockage: {
      type: Sequelize.INTEGER,
      validate: { min: 0 }
    },
    technologie: {
      type: Sequelize.STRING
    },
    tailleAffichage: {
      type: Sequelize.STRING
    },
    dualSim: {
      type: Sequelize.BOOLEAN
    },
    ram: {
      type: Sequelize.STRING
    },
    modeleId: {
      type: Sequelize.INTEGER
    }
  });

  return Telephone;
};
