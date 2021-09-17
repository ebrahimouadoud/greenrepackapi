module.exports = (sequelize, Sequelize) => {
  const Revente = sequelize.define("revente", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    prixPropose: {
      type: Sequelize.FLOAT
    },
    etat: {
      type: Sequelize.ENUM,
      values: ['Envoyé','En Attendant', 'Pris En Charge', 'Retourné', 'En Vente', 'Vendu']
    },
    produitId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Revente;
};
