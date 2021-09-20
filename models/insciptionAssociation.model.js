module.exports = (sequelize, Sequelize) => {
    const InsciAssociation = sequelize.define("insciption_Association", {
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
        values: ['En Attendant', 'Validé', 'Refusé', 'Prie En Charge'],
        defaultValue: 'En Attendant'
      },
      associationId: {
        type: Sequelize.INTEGER
      }
    });
  
    return InsciAssociation;
  };