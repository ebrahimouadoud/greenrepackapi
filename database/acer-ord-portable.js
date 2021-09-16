const db = require("../models")

const model = db.modele

module.exports = {
    seedAcerLaptop : function () {
        model.create({
            name: "Acer Aspire",
            number: "Aspire One",
            brandId: 18,
            typeId: 4
        });
        model.create({
            name: "Acer Swift",
            number: "Acer Swift",
            brandId: 18,
            typeId: 4
        });
        model.create({
            name: "Acer Predator",
            number: "Acer Predator",
            brandId: 18,
            typeId: 4
        });
        model.create({
            name: "Acer Nitro",
            number: "Acer Nitro",
            brandId: 18,
            typeId: 4
        });
        model.create({
            name: "Acer One",
            number: "Acer One",
            brandId: 18,
            typeId: 4
        });
    }
}