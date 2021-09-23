const db = require('../models')
 const InsciAssociation = db.inscriptionAssociation;
 var express = require('express');
 var router = express.Router();
 const https = require('https');
 const nodemailer = require("../conf/nodemailer.config");
 var bcrypt = require("bcryptjs");

// POST >> Create Demande d insciption (Association)
exports.createDemande = (req, res) => {
    //
    https.get('https://entreprise.data.gouv.fr/api/rna/v1/id/' + req.body.RNA, (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });
      //console.log(' resp ', resp)
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        if(resp.statusCode == 404){
          return res.status(404).json({ error: "RNA non trouvé" })
        }else if(resp.statusCode == 200){
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
      });

    }).on("error", (err) => {
      return res.status(500).json({ error: error.message })
    });
}

exports.acceptDemande = (req, res) => {
  var pswd = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  var cpwd = bcrypt.hashSync(pswd, 8)
  db.inscriptionAssociation.findOne({
      where: {
        id: req.params.id
      }
    }).then(demande => {
      if (!demande) {
          return res.status(404).send({ message: "Not found." });
      }
        let ns = "Validé"
        if(demande.status == "En Attendant"){
            ns = "Validé"
        }
        demande.update(
            {status: ns }
        ).then( us => {
          db.user.create(
            {
                lastname: demande.name,
                firstname: demande.name,
                username: demande.name,
                email: demande.mail,
                password: cpwd,
                status: "Active",
                telephone: null,
            }).then(user => {
                let role_id = db.role.findOne({
                    where: {name: "association"}
                })
                user.setRoles([4])
                nodemailer.sendDemandeAccept(
                  user.username, 
                  demande.mail, 
                  pswd)
                  /** 
                   * 
                      name:
                      description: 
                      RNA:
                      adresseId: 
                      userId: 
                   */
                  db.association.create({
                      name:user.username,
                      description: demande.description,
                      RNA: demande.RNA,
                      adresseId: null,
                      userId: user.id
                    } )
                  return res.status(200).json({
                    "user": user
                });

            }) ;
        }).catch(err => {
              res.status(500).send({
                  message: "Error updating Status with id=" + id
              });
          });
    })
}

exports.getAllDemandes = (req, res) => {
  db.inscriptionAssociation.findAll()
        .then( demandes => { 
            res.status(200).send({
                rows: demandes
              });
          })
        .catch(err => {
            return res.status(400).send({ message: err.message });
        });
}