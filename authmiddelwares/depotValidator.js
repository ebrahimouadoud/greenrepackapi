const db = require("../models")
const Depot = db.depot

checkDuplicateDepotName = (req, res, next) => {
    // Depot name
    if (req.body.name === 'undefined' || !req.body.name) {
        res.status(400).send({
            message: "Warehouse Name is required!"
        });
        return;
    }
    // Depot adresseId
    if (req.body.adresse === 'undefined' || !req.body.adresse) {
        res.status(400).send({
            message: "Brand is required!"
        });
        return;
    }
};



const DepotValidator = {
    checkDuplicateDepotName: checkDuplicateDepotName
};

module.exports = DepotValidator;