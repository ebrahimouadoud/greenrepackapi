module.exports = (sequelize, Sequelize) => {
    const Modele = sequelize.define("modeles", {
      nomModele: {
        type: Sequelize.STRING
      },
      marque_id: {
        type: Sequelize.INTEGER
      },
      type_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return Modele;
  };
  