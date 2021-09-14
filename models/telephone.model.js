module.exports = (sequelize, Sequelize) => {
    const Telephone = sequelize.define("telephones", {
        systExploitation: {
        type: Sequelize.STRING
      },
      stockage: {
        type: Sequelize.ENTIER
      },
      technologie: {
        type: Sequelize.STRING
      },
      tailleAffichage: {
        type: Sequelize.STRING
      },
      dualSim: {
        type: Sequelize.BOOLEAN
      },
      ram: {
        type: Sequelize.ENTIER
      }
    });
  
    return Telephone;
  };
  