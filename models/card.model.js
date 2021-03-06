module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return Card;
};
