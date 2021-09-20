module.exports = (sequelize, Sequelize) => {
    const Adresse = sequelize.define("adresse", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        numero: {
            type: Sequelize.INTEGER,
            validate: {
                min: 0
            }
        },
        voi: {
            type: Sequelize.STRING
        },
        complement: {
            type: Sequelize.STRING
        },
        ville: {
            type: Sequelize.STRING
        },
        codePostal: {
            type: Sequelize.INTEGER(5),
            validate: {
                min: 0
            }
        },
        paye: {
            type: Sequelize.STRING
        }
    });

    return Adresse;
};
