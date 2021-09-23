const db = require('../models')
 const InsciAssociation = db.inscriptionAssociation;
 var express = require('express');
 var router = express.Router();
 const https = require('https');
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
      console.log("Error: " + err.message);
    });
    /*
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
      });*/
}