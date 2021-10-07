module.exports = (sequelize, Sequelize) => {
    const ProjetAssociative = sequelize.define("projet_associative", {
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
      dateCreation: {
        type: Sequelize.DATEONLY
      },
      collected:{
        type : Sequelize.FLOAT
      },
      debutPrevu: {
        type: Sequelize.DATEONLY
      },
      finPrevu: {
        type: Sequelize.DATEONLY
      },
      budgetAttendu: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.ENUM,
        values: ['En attente', 'Validé', 'Refusé', 'Prie En Charge'],
        defaultValue: 'En attente'
      },
      associationId: {
        type: Sequelize.INTEGER
      }
    });
  
    return ProjetAssociative;
  };