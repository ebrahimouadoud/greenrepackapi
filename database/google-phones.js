const db = require("../models")

const model = db.modele

module.exports = {
    seedGooglePhones : function(){
        model.create({
            name: "Pixel XL",
            number: "Pixel XL",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 2 XL",
            number: "Pixel 2 XL",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel",
            number: "Pixel",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 5",
            number: "Pixel 5",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 4a",
            number: "Pixel 4a",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 4 XL",
            number: "Pixel 4 XL",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 4",
            number: "Pixel 4",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 3a XL",
            number: "Pixel 3a XL",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 3a",
            number: "Pixel 3a",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 3 XL",
            number: "Pixel 3 XL",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 3",
            number: "Pixel 3",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 2",
            number: "Pixel 2",
            brandId: 3,
            typeId: 1
        });
        model.create({
            name: "Pixel 2",
            number: "Pixel 2",
            brandId: 3,
            typeId: 1
        });
    }
}