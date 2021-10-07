const nodemailer = require("../conf/nodemailer.config");
const db = require('../models')
const Produit = db.produit
const Resall = db.revente;
const User = db.user;
const Modele = db.modele 
const priceCase = db.PriceCase
const prodType = db.type
const Op = db.Sequelize.Op;
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

exports.makeProposal = (req, res) => {
  //
  Resall.findOne({
    where: {
      id: req.params.id,
    },
    include: [
        {
          model: User
        }
      ]
  })
    .then((resall) => {
      if (!resall) {
        return res.status(404).send({ message: 'Resall Not Found.' })
      }
      resall.prixPropose = req.body.prixPropose
      resall.save()
      nodemailer.notifyProposal(
        resall.user.firstname,
        resall.user.lastname,
        resall.user.email,
      );
      return res.status(200).send({ message: 'Resalle updated.' })
    })
}

// POST >> Create Resall (Revente)
exports.createResall = (req, res) => {
  if(req.body.modeleId == "not found"){
    Produit.create({
      name: req.body.newModele,
      description: req.body.description,
      couleur: req.body.color,
      age: req.body.age,
      state: req.body.state,
      modeleId: null,
      userId: req.userId,
      entrepotId: req.body.localisation
    }).then((produit) => {
      
      try {
        db.revente
          .create({
            prixPropose: null,
            etat: 'En attente',
            produitId: produit.id,
            userId: req.userId,
          })
          .then((revente) => {
              return res.status(201).json({
                revente: revente,
              })
            
          })
      } catch (error) {
        return res.status(500).json({ error: error.message })
      }
    })
  }else{
    db.modele
    .findOne({
      where: { id: req.body.modeleId },
    })
    .then((_modele) => {
      User.findOne({
        where: { id: req.userId },
      })
        .then((user) => {
          if (_modele) {
            priceCase.findOne({
              where:{ modelId: _modele.number, state: req.body.state }
            }).then( _pc => {
                var ProposalPrice = null
                if( _pc ){
                  ProposalPrice = _pc.price 
                }
                try {

                Produit.create({
                  name: _modele.name,
                  description: req.body.description,
                  couleur: req.body.color,
                  age: req.body.age,
                  state: req.body.state,
                  modeleId: _modele.id,
                  userId: req.userId,
                  entrepotId: req.body.localisation
                }).then((produit) => {
                  
                  try {
                    db.revente
                      .create({
                        prixPropose: ProposalPrice,
                        etat: 'En attente',
                        produitId: produit.id,
                        userId: req.userId,
                      })
                      .then((revente) => {
                        if(ProposalPrice){
                          return res.status(200).json({
                            revente: revente,
                          })
                        }else{
                          return res.status(201).json({
                            revente: revente,
                          })
                        }
                        
                      })
                  } catch (error) {
                    return res.status(500).json({ error: error.message })
                  }
                })
              } catch (error) {
                return res.status(500).json({ error: error.message })
              }
            })
          } else {
            return res.status(404).json({ message: 'modele not found' })
          }
        })
    })
  }
}

// PUT >> Accept Resall By Id (Revente)
exports.aceptResall = (req, res) => {
  // console.log(' ACCEPT RESALL ')
  Resall.findOne({
    where: {
      id: req.params.id,
    },
  }).then((resall) => {
      if (!resall) {
        return res.status(404).send({ message: 'Resall Not Found.' })
      }
      if (req.userId != resall.userId) {
        return res.status(401).send({ message: 'manage only your own sales please.' })
      }
      if (resall.etat == 'Accepté') {
        return res.status(400).send({
          message: 'Resall Has Already been Accepted',
        })
        //Validé
      }
      if (resall.etat == 'Validé') {
        return res.status(400).send({
          message: 'Resall Has Been Validate',
        })
      }
      if ( !resall.prixPropose ) {
        return res.status(400).send({
          message: 'No proposal.',
        })
      }
      if (resall.etat == 'Refusé') {
        return res.status(400).send({
          message: 'Resall Has Been Refused',
        })
      } else if (resall.etat == 'En attente') {
        User.findOne({
          where: { id: req.userId },
          attributes: ['username', 'firstname', 'lastname', 'email']
        }).then(users => {
          //console.log(users);
          resall.etat = 'Accepté'
          resall.bic = req.body.bic,
          resall.iban = req.body.iban
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


      } else if (resall.etat == 'En attente') {
        
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
      if (resall.etat == 'Refusé' || resall.etat == 'En attente') {
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
                order: [
                  ['createdAt', 'DESC'],
                ],
                where: {userId: req.userId},
                include:
                [
                  {
                    model: Produit
                  },
                ]
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
          const wheres = {
              etat: req.query.etat ? req.query.etat : { [Op.ne]: null } ,
              '$user.email$' : req.query.usermail ? {[Op.like]: '%' + req.query.usermail + '%'} : { [Op.ne]: null },
          }
          Resall.findAll({
            order: [
              ['createdAt', 'DESC'],
            ],
            where : wheres,
            include:
              [
                {
                  model: Produit, include: [{ model: Modele, include: [ { model: prodType }]  }] 
                },
                {
                  model: User, as: 'user'
                }
              ]
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
        
    });
});
}