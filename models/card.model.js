module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        products: {
            type: Sequelize.JSON,
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return Card;
};
