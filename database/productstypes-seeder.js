const db = require("../models");

const Type = db.type;

module.exports = {
    seedTypes : function () {
        Type.create({
            id: 1,
            name: "téléphone"
        });
        Type.create({
            id: 2,
            name: "tablette"
        });
        Type.create({
            id: 3,
            name: "consule de jeux"
        });
        Type.create({
            id: 4,
            name: "ordinateur portable"
        });
        Type.create({
            id: 5,
            name: "ordinateur"
        });
        Type.create({
            id: 6,
            name: "écrans"
        });
    }
}