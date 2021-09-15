const db = require('../models')

const model = db.modele

module.exports = {
    seedAppleMobiles : function () {
        //console.log('Seed')
        model.create({
            name: "iPhone 3G",
            number: "A1324",
            brandId: 1,
            typeId: 1
        });
        model.create({
            name: "iPhone 3GS",
            number: "A1325",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 4",
            number: "A1349",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 5",
            number: "A1428",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 5C",
            number: "A1507",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 5s",
            number: "A1453",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 6",
            number: "A1549",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 6 Plus",
            number: "A1522",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 6s",
            number: "A1633",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 6s Plus",
            number: "A1634",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone SE",
            number: "A2275",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 7",
            number: "A1660",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 7 Plus",
            number: "A1661",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 8",
            number: "A1863",
            brandId: 1,
            typeId: 1
        });
        

        model.create({
            name: "iPhone 8 Plus",
            number: "A1864",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone X",
            number: "A1865",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone XR",
            number: "A1984",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone XS",
            number: "A1920",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone XS Max",
            number: "A1921",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 11",
            number: "A2221",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 11 Pro",
            number: "A2160",
            brandId: 1,
            typeId: 1
        });
            
        model.create({
            name: "iPhone 11 Pro Max",
            number: "A2161",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 12 Mini",
            number: "A176",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 12",
            number: "A2172",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 12 Pro",
            number: "A2341",
            brandId: 1,
            typeId: 1
        });

        model.create({
            name: "iPhone 12 Pro Max",
            number: "A2411",
            brandId: 1,
            typeId: 1
        });

    }
}
