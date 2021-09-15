module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define("brand", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        name: {
            type: Sequelize.STRING
        }
    });

    return Brand;
};
