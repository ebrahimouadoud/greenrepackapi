module.exports = (sequelize, Sequelize) => {
    const Depot = sequelize.define("entrepot", {
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
        adresse: {
            type: Sequelize.STRING
        }
    });

    return Depot;
};
