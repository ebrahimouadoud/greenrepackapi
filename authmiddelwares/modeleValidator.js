const db = require("../models")
const Modele = db.modele

checkDuplicateModeleName = (req, res, next) => {
    // Modele name
    if (req.body.name === 'undefined' || !req.body.name) {
        res.status(400).send({
            message: "Name is required!"
        });
        return;
    }
    // Modele Number
    if (req.body.number === 'undefined' || !req.body.number) {
        res.status(400).send({
            message: "Modele Number is required!"
        });
        return;
    }
    // Modele BrandId
    if (req.body.brandId === 'undefined' || !req.body.brandId) {
        res.status(400).send({
            message: "Brand is required!"
        });
        return;
    }
    // Modele TypeId
    if (req.body.typeId === 'undefined' || !req.body.typeId) {
        res.status(400).send({
            message: "Type is required!"
        });
        return;
    }
    Modele.findOne({
        where: {
            name: req.body.name
        }
    }).then(modele => {
        if (modele) {
            res.status(400).send({
                message: "Modele Name is use!"
            });
            return;
        }
        next();
    });
};



const ModeleValidator = {
    checkDuplicateModeleName: checkDuplicateModeleName
};

module.exports = ModeleValidator;