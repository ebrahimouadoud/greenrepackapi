module.exports = (sequelize, Sequelize) => {
    const Association = sequelize.define("association", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        },
        immatriculation: {
            type: Sequelize.STRING
        },
        dateCreation: {
            type: Sequelize.DATEONLY
        },
        adresseId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
    });

    return Association;
};
