module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("type", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Type;
  };
  