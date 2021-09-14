module.exports = (sequelize, Sequelize) => {
    const Electromenager = sequelize.define("electromenager", {
      serie: {
        type: Sequelize.STRING
      }
    });
  
    return Electromenager;
  };
  