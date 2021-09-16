const db = require("../models")

const model = db.modele

module.exports = {
    seedDellLaptop : function () {
        model.create({
            name: "Dell XPS",
            number: "9710",
            brandId: 19,
            typeId: 4
        });
        model.create({
            name: "Dell Latitude",
            number: "Dell Latitude",
            brandId: 19,
            typeId: 4
        });
        model.create({
            name: "Dell Inspiron",
            number: "Dell Inspiron",
            brandId: 19,
            typeId: 4
        });
        model.create({
            name: "Dell G3",
            number: "Dell G3",
            brandId: 19,
            typeId: 4
        });
        model.create({
            name: "Dell ChromeBook",
            number: "Dell ChromeBook",
            brandId: 19,
            typeId: 4
        });
    }
}