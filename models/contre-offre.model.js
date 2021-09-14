module.exports = (sequelize, Sequelize) => {
    const ContreOffre  = sequelize.define("contreOffres", {
      prixPropose: {
        type: Sequelize.FLOAT
      },
      etat: {
        type: Sequelize.ENUM,
        values: ['Accepté', 'Refusé'],
      },
      achat_id: {
        type: Sequelize.INTIGER
      }
    });
  
    return ContreOffre;
  };
  