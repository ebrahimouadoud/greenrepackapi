const db = require("../models")

const model = db.modele

module.exports = {
    seedSamsungMobiles : function (brandID) {
        model.create({
            name: "Galaxy Z",
            number: "FOLD2",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Galaxy S",
            number: "8",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Galaxy Note",
            number: "9",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Galaxy A",
            number: "9",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Galaxy M",
            number: "Galaxy M",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Galaxy XCover",
            number: "Pro",
            brandId: brandID,
            typeId: 1
        });
    }
}