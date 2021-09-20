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
        if (req.body.dateCreation === 'undefined' || !req.body.dateCreation) {
            res.status(400).send({
                message: "Date Creation is required!"
            });
            return;
        }

    // Date Prevu
        if (req.body.debutPrevu === 'undefined' || !req.body.debutPrevu) {
            res.status(400).send({
                message: "Date Prevu is required!"
            });
            return;
        }

    // finPrevu
        if (req.body.finPrevu === 'undefined' || !req.body.finPrevu) {
            res.status(400).send({
                message: "Date Fin Prevu is required!"
            });
            return;
        }

    // Budget Attendu
        if (req.body.budgetAttendu === 'undefined' || !req.body.budgetAttendu) {
            res.status(400).send({
                message: "Budget Attendu is required!"
            });
            return;
        }
    // Association ID
        if (req.body.associationId === 'undefined' || !req.body.associationId) {
            res.status(400).send({
                message: "Association ID is required!"
            });
            return;
        }
        
        next();
}

const ProjectValidator = {
    checkRequired: checkRequired,
};

module.exports = ProjectValidator;