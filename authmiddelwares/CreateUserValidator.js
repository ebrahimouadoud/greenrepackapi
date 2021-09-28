const { check, validationResult } = require('express-validator');
const db = require("../models")
// SignUp User Validation
userSignupValidator = (req, res, next) => {

    if (req.body.username === 'undefined' || !req.body.username) {
        res.status(400).send({
            message: "Username in required!"
        });
        return;
    }
    if (req.body.firstname === 'undefined' || !req.body.firstname) {
        res.status(400).send({
            message: "Firstname is required!"
        });
        return;
    }
    if (req.body.lastname === 'undefined' || !req.body.lastname) {
        res.status(400).send({
            message: "Lastname is required!"
        });
        return;
    }
    if (req.body.email === 'undefined' || !req.body.email) {
        res.status(400).send({
            message: "Email in required!"
        });
        return;
    }
    if (req.body.telephone === 'undefined' || !req.body.telephone) {
        res.status(400).send({
            message: "Telephone is required!"
        });
        return;
    }

    if (req.body.password === 'undefined' || !req.body.password) {
        res.status(400).send({
            message: "Password is required!"
        });
        return;
    }
    if (req.body.adresse === 'undefined' || !req.body.adresse) {
        res.status(400).send({
            message: "Adresse is required!"
        });
        return;
    }

    next();

}



// Create User Validation
userCreateValidator = (req, res, next) => {

    if (req.body.username === 'undefined' || !req.body.username) {
        res.status(400).send({
            message: "Username in required!"
        });
        return;
    }
    if (req.body.firstname === 'undefined' || !req.body.firstname) {
        res.status(400).send({
            message: "Firstname is required!"
        });
        return;
    }
    if (req.body.lastname === 'undefined' || !req.body.lastname) {
        res.status(400).send({
            message: "Lastname is required!"
        });
        return;
    }
    if (req.body.email === 'undefined' || !req.body.email) {
        res.status(400).send({
            message: "Email in required!"
        });
        return;
    }
    if (req.body.telephone === 'undefined' || !req.body.telephone) {
        res.status(400).send({
            message: "Telephone is required!"
        });
        return;
    }
    if (req.body.adresse === 'undefined' || !req.body.adresse) {
        res.status(400).send({
            message: "Adresse is required!"
        });
        return;
    }
    if (req.body.role === 'undefined' || !req.body.role) {
        res.status(400).send({
            message: "role is required!"
        });
        return;
    }else{
        db.role.findOne({
            where: {name: req.body.role}
        }).then( role => {
            if(!role){
                res.status(404).send({
                    message: "role not found!"
                });
                return;
            }
          })
    }
    console.log('req.body.password :', req.body.password)
    if (req.body.password === 'undefined' || !req.body.password) {
        res.status(400).send({
            message: "Password is required!"
        });
        return;
    }

    next();
}

// SignUp User Validation
userUpdateValidator = (req, res, next) => {

    if (req.body.username === 'undefined' || !req.body.username) {
        res.status(400).send({
            message: "Username in required!"
        });
        return;
    }
    if (req.body.firstname === 'undefined' || !req.body.firstname) {
        res.status(400).send({
            message: "Firstname is required!"
        });
        return;
    }
    if (req.body.lastname === 'undefined' || !req.body.lastname) {
        res.status(400).send({
            message: "Lastname is required!"
        });
        return;
    }
    if (req.body.email === 'undefined' || !req.body.email) {
        res.status(400).send({
            message: "Email in required!"
        });
        return;
    }
    if (req.body.telephone === 'undefined' || !req.body.telephone) {
        res.status(400).send({
            message: "Telephone is required!"
        });
        return;
    }

    if (req.body.adresse === 'undefined' || !req.body.adresse) {
        res.status(400).send({
            message: "Adresse is required!"
        });
        return;
    }

    if (req.body.password === 'undefined' || !req.body.password) {
        res.status(400).send({
            message: "Password is required!"
        });
        return;
    }

    next();

}

const UserValidator = {
    userSignupValidator: userSignupValidator,
    userCreateValidator: userCreateValidator,
    userUpdateValidator: userUpdateValidator
};

module.exports = UserValidator;