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
      adresse: {
        type: Sequelize.STRING
      },
      RNA: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['En Attendant', 'Validé', 'Refusé', 'Prie En Charge'],
        defaultValue: 'En Attendant'
      }
    });
  
    return InsciAssociation;
  };