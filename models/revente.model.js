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
    bic:{
      type: Sequelize.STRING
    },
    iban:{
      type: Sequelize.STRING
    },
    etat: {
      type: Sequelize.ENUM,
      values: ['En attente', 'Validé', 'CO' , 'Refusé', 'Accepté'],
      defaultValue: 'En attente'
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Revente;
};
