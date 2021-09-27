const db = require("../models");
const appleMobiles = require('./apple-phones')
const asusPhones = require('./asus-phones')
const googlePhones = require('./google-phones')
const samsungPhone = require('./samsung-phone')
const htcPhones = require('./htc-phones')
const Brand = db.brand;

module.exports = {
  seedBrands: function () {
    Brand.create({
      name: "Apple"
    }).then(brand => {
      appleMobiles.seedAppleMobiles(brand.id);
    }) ;

    Brand.create({
      name: "Asus"
    }).then(brand => {
      asusPhones.seedAsusMobiles(brand.id);
    }) ;

    Brand.create({
      name: "Google"
    }).then(brand => {
      googlePhones.seedGooglePhones(brand.id);
    });

    Brand.create({
      name: "Samsung"
    }).then(brand => {
      samsungPhone.seedSamsungMobiles(brand.id);
    });


    Brand.create({
      name: "HTC"
    }).then(brand => {
      htcPhones.seedHtcPhones(brand.id);
    });

    Brand.create({
      name: "Huawei"
    }).then(brand => {});

    Brand.create({
      name: "Lenovo"
    }).then(brand => {});

    Brand.create({
      name: "OnePlus"
    });


    Brand.create({
      name: "Xiaomi"
    });

    Brand.create({
      name: "Acer"
    });

    Brand.create({
      name: "Dell"
    });

    Brand.create({
      name: "Hp"
    });
  }
}
