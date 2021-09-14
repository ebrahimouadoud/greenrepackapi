module.exports = (sequelize, Sequelize) => {
    const Entrepot = sequelize.define("entrepots", {
      nomEntrepot: {
        type: Sequelize.STRING
      },
      disponibilite: {
        type: Sequelize.ENUM,
        values: ['disponible', 'moyen', 'saturé'],
      },
      adresse_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return Entrepot;
  };
  