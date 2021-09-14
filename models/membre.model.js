module.exports = (sequelize, Sequelize) => {
    const Membre = sequelize.define("membres", {
      nomMembre: {
        type: Sequelize.STRING
      },
      adresse_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return Membre;
  };
  