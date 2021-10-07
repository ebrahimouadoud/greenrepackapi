module.exports = (sequelize, Sequelize) => {
    const ContreOffre = sequelize.define("counter_offer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        prixPropose: {
            type: Sequelize.FLOAT
        },
        etat: {
            type: Sequelize.ENUM,
            values: ['En attente','Accepté', 'Refusé'],
            defaultValue: 'En attente',
          },
        resallId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        }
    });

    return ContreOffre;
};
