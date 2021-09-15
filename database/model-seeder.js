const appleMobiles = require('./apple-phones')
const htcPhones = require('./htc-phones')
const googlePhones = require('./google-phones')
const asusPhones = require('./asus-phones')

module.exports = {
    seedModels : function () {
        appleMobiles.seedAppleMobiles();
        htcPhones.seedHtcPhones()
        googlePhones.seedGooglePhones()
        asusPhones.seedAsusMobiles()
    }
}
