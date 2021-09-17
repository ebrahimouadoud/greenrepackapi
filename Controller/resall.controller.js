const { resall } = require("../models");
const db = require("../models");

// POST >> Create Resall (Revente)
exports.createResall = (req, res) => {

    try {
        db.revente.create(
            {
                prixPropose: req.body.prixPropose,
                etat: req.body.etat,
                produitId: req.body.produitId,

            }).then(revente => {
                return res.status(200).json({
                    "revente": revente
                });
            });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

// POST >> Accept Resall By Id (Revente) 
exports.aceptResall = (req, res) => {




};



// POST >> Refuse Resall By Id (Revente) 
exports.refuseResall = (req, res) => {


};


// POST >> Validate By Id Resall (Revente) 
exports.validateResall = (req, res) => {


};