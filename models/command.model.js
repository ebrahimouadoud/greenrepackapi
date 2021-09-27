module.exports = (sequelize, Sequelize) => {
    const Command = sequelize.define("command", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        produits: {
            type: Sequelize.TEXT
        },
        sumPrix: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM,
            values: ['Confirmé', 'Envoyé',],
            defaultValue: 'Confirmé',
        },
        trackingNumber: {
            type: Sequelize.STRING
        },
    });

    return Command;
};
