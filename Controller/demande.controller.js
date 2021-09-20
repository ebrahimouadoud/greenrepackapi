const db = require('../models')
 const InsciAssociation = db.inscriptionAssociation;


// POST >> Create Demande d insciption (Association)
exports.createDemande = (req, res) => {
    InsciAssociation.create({
        name: req.body.name,
        description: req.body.description,
        dateCreation: req.body.dateCreation,
        debutPrevu: req.body.debutPrevu,
        finPrevu: req.body.finPrevu,
        budgetAttendu: req.body.budgetAttendu,
        associationId: req.body.associationId,
        
      }).then((result) => {
        return res.status(200).json({
            "result": result,
          })
      }).catch((error) => {
        return res.status(500).json({ error: error.message })
      });
}