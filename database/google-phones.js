const db = require("../models")

const model = db.modele

module.exports = {
    seedGooglePhones : function(brandID){
        model.create({
            name: "Pixel XL",
            number: "Pixel XL",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 2 XL",
            number: "Pixel 2 XL",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel",
            number: "Pixel",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 5",
            number: "Pixel 5",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 4a",
            number: "Pixel 4a",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 4 XL",
            number: "Pixel 4 XL",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 4",
            number: "Pixel 4",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 3a XL",
            number: "Pixel 3a XL",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 3a",
            number: "Pixel 3a",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 3 XL",
            number: "Pixel 3 XL",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 3",
            number: "Pixel 3",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 2",
            number: "Pixel 2",
            brandId: brandID,
            typeId: 1
        });
        model.create({
            name: "Pixel 2",
            number: "Pixel 2",
            brandId: brandID,
            typeId: 1
        });
    }
}