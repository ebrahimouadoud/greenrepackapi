module.exports = (sequelize, Sequelize) => {
    const Laptop = sequelize.define("ordinateurportable", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      systExploitation: {
        type: Sequelize.STRING
      },
      stockage: {
        type: Sequelize.INTEGER,
              validate: {
                  min: 0
              }
      },
      processor: {
        type: Sequelize.STRING
      },
      tailleAffichage: {
        type: Sequelize.STRING
      },
      hdmi: {
        type: Sequelize.BOOLEAN
      },
      ram: {
        type: Sequelize.STRING
      }
    });
  
    return Laptop;
  };
  