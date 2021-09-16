const db = require("../models")

const model = db.modele

module.exports = {
    seedLenovoLaptop : function () {
        model.create({
            name: "Lenovo IdeaPad",
            number: "5Pro",
            brandId: 4,
            typeId: 4
        });
        model.create({
            name: "Lenovo ThinkBook",
            number: "Lenovo ThinkBook",
            brandId: 4,
            typeId: 4
        });
        model.create({
            name: "Lenovo Legion",
            number: "Lenovo Legion",
            brandId: 4,
            typeId: 4
        });
        model.create({
            name: "Lenovo Yoga",
            number: "S940",
            brandId: 4,
            typeId: 4
        });
        model.create({
            name: "Lenovo Flex",
            number: "6",
            brandId: 4,
            typeId: 4
        });
    }
}