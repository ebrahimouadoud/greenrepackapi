const db = require("../models")

const model = db.modele

module.exports = {
    seedHpLaptop : function () {
        model.create({
            name: "HP Pavilion",
            number: "15",
            brandId: 20,
            typeId: 4
        });
        model.create({
            name: "HP Chromebook",
            number: "x360",
            brandId: 20,
            typeId: 4
        });
        model.create({
            name: "HP Laptop",
            number: "14t",
            brandId: 20,
            typeId: 4
        });
        model.create({
            name: "HP EliteBook",
            number: "850 G8",
            brandId: 20,
            typeId: 4
        });
        model.create({
            name: "HP ProBook",
            number: "430 G8",
            brandId: 20,
            typeId: 4
        });
    }
}