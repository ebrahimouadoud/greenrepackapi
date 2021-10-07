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
            name: "ordinateur portable"
        });
    }
}