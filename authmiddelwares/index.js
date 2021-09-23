const authservice = require('./AuthService')
const SignupValidator = require('./SignupValidator')
const UserValidator = require('./CreateUserValidator')
const TypeValidator = require('./typeValidator')
const BrandValidator = require('./brandValidator')
const ModeleValidator = require('./modeleValidator')
const ResalValidator = require('./resallValidator')
const ProjectValidator = require('./projectValidator')
const DepotValidator = require('./depotValidator')
const AssoDemandeValidator = require('./AssoDemandeValidator')
const ProductValidator = require('./ProductUpdatValidator')

module.exports = {
    authservice, 
    SignupValidator, 
    UserValidator, 
    TypeValidator, 
    BrandValidator, 
    ModeleValidator, 
    ResalValidator,
    ProjectValidator,
    AssoDemandeValidator,
    DepotValidator,
    ProductValidator
}