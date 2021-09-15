module.exports = (sequelize, Sequelize) => {
  const Membre = sequelize.define("membres", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    adresseId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
  });

  return Membre;
};
