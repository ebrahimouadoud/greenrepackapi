const db = require('../models')
 const InsciAssociation = db.inscriptionAssociation;


// POST >> Create Demande d insciption (Association)
exports.createDemande = (req, res) => {
    InsciAssociation.create({
        name: req.body.name,
        description: req.body.description,
        adresse: req.body.adresse,
        RNA: req.body.RNA,
        mail: req.body.mail
      }).then((result) => {
        return res.status(200).json({
            "result": result,
          })
      }).catch((error) => {
        return res.status(500).json({ error: error.message })
      });
}