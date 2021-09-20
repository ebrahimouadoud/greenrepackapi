module.exports = (sequelize, Sequelize) => {
    const Entrepot = sequelize.define("entrepot", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        },
        disponibilite: {
            type: Sequelize.ENUM,
            values: ['Disponible','Moyen', 'Saturé']
        },
        adresseId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return Entrepot;
};
