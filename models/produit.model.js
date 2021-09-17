module.exports = (sequelize, Sequelize) => {
    const Produit = sequelize.define("produit", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        couleur: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER,
            validate: {
                min: 0
            }
        },
        state: {
            type: Sequelize.JSON,
        },
        modeleId: {
            type: Sequelize.INTEGER
        }
    });

    return Produit;
};
