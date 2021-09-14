module.exports = (sequelize, Sequelize) => {
    const Association = sequelize.define("associations", {
      nomAssociation: {
        type: Sequelize.STRING
      },
      immatriculation: {
        type: Sequelize.STRING,
      },
      date_creation: {
        type: Sequelize.DATE,
      },
      adresse_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return Association;
  };
  