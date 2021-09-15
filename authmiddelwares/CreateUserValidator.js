const { check, validationResult } = require('express-validator');

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
    if (req.body.role === 'undefined' || !req.body.role) {
        res.status(400).send({
            message: "Password is required!"
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