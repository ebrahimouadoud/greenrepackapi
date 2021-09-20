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
            values: ['En Attend','Accepté', 'Refusé'],
            defaultValue: 'En Attend',
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
