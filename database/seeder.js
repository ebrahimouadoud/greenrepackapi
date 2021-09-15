
const db = require('../models')
const DBseeder = require('./role-user-seeder')
const ProductsTypesSeeder = require("./productstypes-seeder")
const BrandsSeeder = require("./Brands-Seeder")
const ModelsSeeder = require("./model-seeder")

module.exports = {
    seedBase : function(){
        db.sequelize.sync({force: true}).then(() => {
            console.log('DATABASE SYNC');
            DBseeder.seedRoles()
            ProductsTypesSeeder.seedTypes()
            BrandsSeeder.seedBrands()
            ModelsSeeder.seedModels()
        });
    }
    
}

