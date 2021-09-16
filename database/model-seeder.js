const appleMobiles = require('./apple-phones')
const htcPhones = require('./htc-phones')
const googlePhones = require('./google-phones')
const asusPhones = require('./asus-phones')
const samsungPhone = require('./samsung-phone')


const acerLaptopPortable = require('./acer-ord-portable')
const dellLaptopPortable = require('./dell-ord-portable')
const hpLaptopPortable = require('./hp-ord-portable')
const lenovoLaptopPortable = require('./lenovo-ord-portable')

module.exports = {
    seedModels : function () {
        appleMobiles.seedAppleMobiles();
        htcPhones.seedHtcPhones();
        googlePhones.seedGooglePhones();
        asusPhones.seedAsusMobiles();
        samsungPhone.seedSamsungMobiles();

        acerLaptopPortable.seedAcerLaptop();
        dellLaptopPortable.seedDellLaptop();
        hpLaptopPortable.seedHpLaptop();
        lenovoLaptopPortable.seedLenovoLaptop();

    }
}
