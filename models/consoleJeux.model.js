module.exports = (sequelize, Sequelize) => {
    const ConsoleJeux = sequelize.define("consoleJeux", {
      typeConsole: {
        type: Sequelize.ENUM,
        values: ['.....', '.....', '.....'],
      },
      poid: {
        type: Sequelize.ENTIER
      },
      capaciteStokage: {
        type: Sequelize.ENTIER
      },
      platforme: {
        type: Sequelize.STRING
      },
      ram: {
        type: Sequelize.ENTIER
      },
    });
  
    return ConsoleJeux;
  };
  