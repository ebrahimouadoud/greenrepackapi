module.exports = (sequelize, Sequelize) => {
    const ProjetAssociative = sequelize.define("projetAssociatives", {
      nomProjet: {
        type: Sequelize.STRING
      },
      descProjet: {
        type: Sequelize.TEXT
      },
    dateCreation: {
        type: Sequelize.DATE
      },
      dateDebutPrevu: {
        type: Sequelize.DATE
      },
      dateFinPrevu: {
        type: Sequelize.DATE
      },
      budgetAttendu: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.ENUM,
        values: ['En Attente', 'Validé', 'Refusé', 'Prie En Charge'],
        defaultValue: 'En Attente'
      },
    association_id: {
        type: Sequelize.INTIGER
      },
    });
  
    return ProjetAssociative;
  };
  