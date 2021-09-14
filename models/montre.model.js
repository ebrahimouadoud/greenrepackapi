module.exports = (sequelize, Sequelize) => {
    const MontreConectee = sequelize.define("montreConectee", {
      serie: {
        type: Sequelize.STRING
      }
    });
  
    return MontreConectee;
  };
  