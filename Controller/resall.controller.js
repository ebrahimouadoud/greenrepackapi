const db = require('../models')
const Produit = db.produit
const Resall = db.revente;
const User = db.user;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// POST >> Create Resall (Revente)
exports.createResall = (req, res) => {
  db.modele
    .findOne({
      where: { id: req.body.modeleId },
    })
    .then((_modele) => {
      User.findOne({
        where: { id: req.userId },
      })
        .then((user) => {
          // console.log(user.username)
          if (_modele) {
            try {

              Produit.create({
                name: _modele.name + ' de ' + user.username,
                description: req.body.description,
                couleur: req.body.color,
                age: req.body.age,
                state: {
                  state_body: req.body.state_body,
                  state_screen: req.body.state_screen,
                },
                modeleId: _modele.id,
                userId: req.userId,
              }).then((produit) => {
                const ProposalPrice = randomIntFromInterval(900, 80)
                try {
                  db.revente
                    .create({
                      prixPropose: ProposalPrice,
                      etat: 'En Attendant',
                      produitId: produit.id,
                      userId: req.userId,
                    })
                    .then((revente) => {
                      return res.status(200).json({
                        revente: revente,
                      })
                    })
                } catch (error) {
                  return res.status(500).json({ error: error.message })
                }
              })
            } catch (error) {
              return res.status(500).json({ error: error.message })
            }
          } else {
            return res.status(404).json({ message: 'modele not found' })
          }
        })
    })
}

// PUT >> Accept Resall By Id (Revente)
exports.aceptResall = (req, res) => {
  Resall.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((resall) => {
      if (!resall) {
        return res.status(404).send({ message: 'Resall Not Found.' })
      }
      if (resall.etat == 'Accepté') {
        return res.status(500).send({
          message: 'Resall Has Already been Accepted',
        })
        //Validé
      }
      if (resall.etat == 'Validé') {
        return res.status(500).send({
          message: 'Resall Has Been Validate',
        })
      }
      if (resall.etat == 'Refusé') {
        return res.status(500).send({
          message: 'Resall Has Been Refused',
        })
      } else if (resall.etat == 'En Attendant') {
        resall.etat = 'Accepté'
        resall.save();

        // Ticket Colissimo PDF
        res.download("../docs/doc.pdf");

        return res.status(200).send({
          message: 'Resall Was Accepted Successfully',
        })
      }
    })
    .catch((err) => {
      return res.status(400).send({ message: err.message })
    })
};

// PUT >> Refuse Resall By Id (Revente)
exports.refuseResall = (req, res, next) => {
  Resall.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((resall) => {
      if (!resall) {
        return res.status(404).send({ message: 'Resall Not Found.' })
      }
      if (resall.etat == 'Refusé') {
        return res.status(500).send({
          message: 'Resall Has Already been Refused',
        })


      }
      if (resall.etat == 'Validé' || resall.etat == 'Accepté') {
        return res.status(500).send({
          message: 'Resall Has Been Accepted Or Validate',
        })


      } else if (resall.etat == 'En Attendant') {
        resall.etat = 'Refusé'
        resall.save();
        return res.status(200).send({
          message: 'Resall Was Refused Successfully',
        })
      }
      next();
    })
    .catch((err) => {
      return res.status(400).send({ message: err.message })
    })
};

// PUT >> Validate By Id Resall (Revente)
exports.validateResall = (req, res, next) => {
  Resall.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((resall) => {
      if (!resall) {
        return res.status(404).send({ message: 'Resall Not Found.' })
      }
      if (resall.etat == 'Validé') {
        return res.status(500).send({
          message: 'Resall Has Already been Validate',
        })


      }
      if (resall.etat == 'Refusé' || resall.etat == 'En Attendant') {
        return res.status(500).send({
          message: 'Resall Has Been Pending Or Refused',
        })


      } else if (resall.etat == 'Accepté') {
        resall.etat = 'Validé'
        resall.save();
        return res.status(200).send({
          message: 'Resall Was Validate Successfully',
        })
      }
      next();
    })
    .catch((err) => {
      return res.status(400).send({ message: err.message })
    })
};
