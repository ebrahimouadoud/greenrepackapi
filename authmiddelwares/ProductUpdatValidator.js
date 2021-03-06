const db = require("../models")



checkRequired = (req, res, next) => {

    if (req.body.name === 'undefined' || !req.body.name) {
        res.status(400).send({
            message: "Name is required!"
        });
        return;
    }
    // Description
    if (req.body.description === 'undefined' || !req.body.description) {
        res.status(400).send({
            message: "Description is required!"
        });
        return;
    }

    // Color
    if (req.body.couleur === 'undefined' || !req.body.couleur) {
        res.status(400).send({
            message: "Color is required!"
        });
        return;
    }

    // Age
    if (req.body.age === 'undefined' || !req.body.age) {
        res.status(400).send({
            message: "Age is required!"
        });
        return;
    }

    next();
}

const ProductValidator = {
    checkRequired: checkRequired,
};

module.exports = ProductValidator;