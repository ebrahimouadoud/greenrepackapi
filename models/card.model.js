module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        produitId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return Card;
};
