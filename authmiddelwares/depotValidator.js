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
    // Depot Disponibilite
    if (req.body.disponibilite === 'undefined' || !req.body.disponibilite) {
        res.status(400).send({
            message: "Warehouse Disponibilite is required!"
        });
        return;
    }
    // Depot adresseId
    if (req.body.adresseId === 'undefined' || !req.body.adresseId) {
        res.status(400).send({
            message: "Brand is required!"
        });
        return;
    }
    // Depot userId
    if (req.body.userId === 'undefined' || !req.body.userId) {
        res.status(400).send({
            message: "User is required!"
        });
        return;
    }
    Depot.findOne({
        where: {
            name: req.body.name
        }
    }).then(depots => {
        if (depots) {
            res.status(400).send({
                message: "Warehouse Name is use!"
            });
            return;
        }
        next();
    });
};



const DepotValidator = {
    checkDuplicateDepotName: checkDuplicateDepotName
};

module.exports = DepotValidator;