module.exports = (sequelize, Sequelize) => {
    const Revente= sequelize.define("reventes", {
      prixPropose: {
        type: Sequelize.FLOAT
      },
      etat: {
        type: Sequelize.ENUM,
        values: ['Envoyé', 'Pris En Charge', 'Retourné', 'En Vente', 'Vendu']
      },
      produit_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return Revente;
  };
  