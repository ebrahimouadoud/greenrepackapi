const db = require("../models");

const depot = db.depot;

module.exports = {
    seedWarehouses: function () {
    depot.create({
      name: "Paris 20",
      disponibilite: "Disponible",
      adresse: "150 Rue de Bagnolet, 75020 Paris"
    });

    depot.create({
        name: "Orly 1",
        disponibilite: "Disponible",
        adresse: "113 Avenue de la Victoire, 94310 Orly"
    });

    depot.create({
        name: "Serris 1",
        disponibilite: "Disponible",
        adresse: "14 Avenue de Saria, 77700 Serris"
    });

  }
}
