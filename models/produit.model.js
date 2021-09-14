module.exports = (sequelize, Sequelize) => {
    const Produit = sequelize.define("produits", {
      nomProduit: {
        type: Sequelize.STRING
      },
      descProduit: {
        type: Sequelize.TEXT
      },
      coleur: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.ENTIER
      },
      state: {
        type: Sequelize.ENUM,
        values: ['neuf', 'comme neuf', 'bonne etat', 'moyen', 'mauvaise etat']
      },
      valeur: {
        type: Sequelize.FLOAT
      },
      modele_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return Produit;
  };
  