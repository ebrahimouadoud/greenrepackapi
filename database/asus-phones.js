const db = require("../models")

const model = db.modele

module.exports = {
    seedAsusMobiles : function () {
        model.create({
            name: "ROG Phone 3",
            number: "ROG Phone 3",
            brandId: 2,
            typeId: 1
        });
        model.create({
            name: "ZenFone 7 Pro",
            number: "ZenFone 7 Pro",
            brandId: 2,
            typeId: 1
        });
        model.create({
            name: "ROG Phone 2",
            number: "ROG Phone 2",
            brandId: 2,
            typeId: 1
        });
        model.create({
            name: "Zenfone 6",
            number: "Zenfone 6",
            brandId: 2,
            typeId: 1
        });
        model.create({
            name: "ZENFONE 5Z",
            number: "ZENFONE 5Z",
            brandId: 2,
            typeId: 1
        });
        model.create({
            name: "Zenfone 4 Max",
            number: "Zenfone 4 Max",
            brandId: 2,
            typeId: 1
        });
        model.create({
            name: "Zenfone 3 Max",
            number: "Zenfone 3 Max",
            brandId: 2,
            typeId: 1
        });
    }
}