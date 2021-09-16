const db = require("../models")

const model = db.modele

module.exports = {
    seedSamsungMobiles : function () {
        model.create({
            name: "Galaxy Z",
            number: "FOLD2",
            brandId: 14,
            typeId: 1
        });
        model.create({
            name: "Galaxy S",
            number: "8",
            brandId: 14,
            typeId: 1
        });
        model.create({
            name: "Galaxy Note",
            number: "9",
            brandId: 14,
            typeId: 1
        });
        model.create({
            name: "Galaxy A",
            number: "9",
            brandId: 14,
            typeId: 1
        });
        model.create({
            name: "Galaxy M",
            number: "Galaxy M",
            brandId: 14,
            typeId: 1
        });
        model.create({
            name: "Galaxy XCover",
            number: "Pro",
            brandId: 14,
            typeId: 1
        });
    }
}