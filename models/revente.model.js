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
      values: ['En Attendant', 'Validé', 'Refusé', 'Accepté'],
      defaultValue: 'En Attendant'
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Revente;
};
