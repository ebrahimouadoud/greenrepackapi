module.exports = (sequelize, Sequelize) => {
    const VerrouConectee = sequelize.define("verrouConectee", {
      serie: {
        type: Sequelize.STRING
      }
    });
  
    return VerrouConectee;
  };
  