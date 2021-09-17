const db = require("../models");
const Produit  = db.produit

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


// POST >> Create Resall (Revente)
exports.createResall = (req, res) => {

    
    db.modele.findOne({
        where: { id: req.body.modeleId }
    }).then(_modele => {
        if (_modele ) {
            try {
                console.log(req.userId);
                Produit.create(
                    {
                        name: _modele.name + " de " + req.username,
                        description: req.body.description,
                        couleur: req.body.color,
                        age: req.body.age,
                        state: { "state_body": req.body.state_body, "state_screen": req.body.state_screen },
                        modeleId: _modele.id,
                    }).then(produit => {
                        const ProposalPrice = randomIntFromInterval(900, 80);
                        try {
                            db.revente.create(
                                {
                                    prixPropose: ProposalPrice,
                                    etat: 'En Attendant',
                                    produitId: produit.id,
                                    userId: req.userId,
                                }).then(revente => {
                                    return res.status(200).json({
                                        "revente": revente
                                    });
                                });

                        } catch (error) {
                            return res.status(500).json({ error: error.message })
                        }
                    });
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        }else{
            return res.status(404).json({ message: "modele not found" })
        }
    })

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