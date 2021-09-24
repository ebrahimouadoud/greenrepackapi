const nodemailer = require("../conf/nodemailer.config");
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
                state: req.body.state,
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
  // console.log(' ACCEPT RESALL ')
  Resall.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((resall) => {
      if (!resall) {
        return res.status(404).send({ message: 'Resall Not Found.' })
      }
      if (req.userId != resall.userId) {
        return res.status(401).send({ message: 'manage only your own sales please.' })
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
        User.findOne({
          where: { id: req.userId },
          attributes: ['username', 'firstname', 'lastname', 'email']
        }).then(users => {
          console.log(users);
          resall.etat = 'Accepté'
          resall.save();
          // Ticket Colissimo PDF(NodeMailer)
          nodemailer.sendAcceptResall(
            users.username,
            users.firstname,
            users.lastname,
            users.email,
          );
          return res.status(200).send({
            message: 'Resall Was Accepted Successfully',
          })
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
    include:
            [
                { model: Produit, attributes: ['phase'] },
            ]
  })
    .then((resall) => {
      if (!resall) {
        return res.status(404).send({ message: 'Resall Not Found.' })
      }
      if (req.userId != resall.userId) {
        return res.status(401).send({ message: 'manage only your own sales please.' })
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
        
        // Change la Phase de Produit (Renvoye)
        // Recuperation produit By Id


        Produit.findByPk(resall.produitId)
        .then((result) => {
          resall.etat = 'Refusé';
          result.phase = 'Renvoyé';
          resall.save();
          result.save();
        })
        return res.status(200).send({
          message: 'Resall Has Been Refused Successfully',
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

exports.getAllResall = (req, res) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
        if (roles[0].name === "user" ) {
          Resall.findAll({
                // Get ALL Resall Of User By Id
                where: {userId: req.userId},
            })
                .then(revente => {
                    res.status(200).send({
                        "Resall": revente
                    });
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message });
                });
        }
        else if (roles[0].name === "admin" || roles[0].name === "manager") {

          Resall.findAll()
                .then(revente => {
                    res.status(200).send({
                      "Resall": revente
                    });
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message });
                });
        }
        
    });
});
}