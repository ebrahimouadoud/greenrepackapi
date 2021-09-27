const db = require("../models")



checkRequired = (req, res, next) => {
    // State
        if (req.body.state === 'undefined' || !req.body.state) {
            res.status(400).send({
                message: "State is required!"
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
        if (req.body.color === 'undefined' || !req.body.color) {
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
    //modeleId
        if (req.body.modeleId === 'undefined' || !req.body.modeleId) {
            res.status(400).send({
                message: "modeleId is required!"
            });
            return;
        }
        
        next();
}

const ResallValidator = {
    checkRequired: checkRequired,
};

module.exports = ResallValidator;