const db = require('../models')

const model = db.modele

module.exports = {
    seedAppleMobiles : function (brandID) {
        //console.log('Seed')

        model.create({
            name: "iPhone 5",
            number: "A1428",
            brandId: brandID,
            typeId: 1,
        });

        model.create({
            name: "iPhone 5C",
            number: "A1507",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 5s",
            number: "A1453",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 6",
            number: "A1549",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 6 Plus",
            number: "A1522",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 6s",
            number: "A1633",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 6s Plus",
            number: "A1634",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone SE",
            number: "A2275",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 7",
            number: "A1660",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 7 Plus",
            number: "A1661",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 8",
            number: "A1863",
            brandId: brandID,
            typeId: 1
        });
        

        model.create({
            name: "iPhone 8 Plus",
            number: "A1864",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone X",
            number: "A1865",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone XR",
            number: "A1984",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone XS",
            number: "A1920",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone XS Max",
            number: "A1921",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 11",
            number: "A2221",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 11 Pro",
            number: "A2160",
            brandId: brandID,
            typeId: 1
        });
            
        model.create({
            name: "iPhone 11 Pro Max",
            number: "A2161",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 12 Mini",
            number: "A176",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 12",
            number: "A2172",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 12 Pro",
            number: "A2341",
            brandId: brandID,
            typeId: 1
        });

        model.create({
            name: "iPhone 12 Pro Max",
            number: "A2411",
            brandId: brandID,
            typeId: 1
        });

    }
}
