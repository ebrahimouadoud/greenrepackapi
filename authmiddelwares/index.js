const authservice = require('./AuthService')
const SignupValidator = require('./SignupValidator')
const UserValidator = require('./CreateUserValidator')
const TypeValidator = require('./typeValidator')
const BrandValidator = require('./brandValidator')
const ModeleValidator = require('./modeleValidator')

module.exports = {
    authservice, SignupValidator, UserValidator, TypeValidator, BrandValidator , ModeleValidator
}