const db = require("../models")



checkRequired = (req, res, next) => {
    // name
        if (req.body.name === 'undefined' || !req.body.name) {
            res.status(400).send({
                message: "name is required!"
            });
            return;
        }
    // description
        if (req.body.description === 'undefined' || !req.body.description) {
            res.status(400).send({
                message: "Description is required!"
            });
            return;
        }

    // Date Creation 
        if (req.body.adresse === 'undefined' || !req.body.adresse) {
            res.status(400).send({
                message: "Adresse is required!"
            });
            return;
        }

    // Date Prevu
        if (req.body.RNA === 'undefined' || !req.body.RNA) {
            res.status(400).send({
                message: "RNA is required!"
            });
            return;
        }

    // finPrevu
        if (req.body.mail === 'undefined' || !req.body.mail) {
            res.status(400).send({
                message: "mail is required!"
            });
            return;
        }

        
        next();
}

const AssoDemandeValidator = {
    checkRequired: checkRequired,
};

module.exports = AssoDemandeValidator;