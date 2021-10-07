const db = require("../models");
const Depot = db.depot;
const User = db.user;
const axios = require('axios')
const google_api_key = process.env.google_api_key
// Get All Depot
exports.getAllDepots = (req, res) => {

    Depot.findAll( { include: [db.produit] } )
        .then(depots => {
            res.status(200).send({
                rows: depots
            });
        })
        .catch(err => {
            return res.status(400).send({ message: err.message });
        });

};

function sansAccents(str){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
    
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    
    return str;
}

  
exports.getNearWarehouse = (req, res)=>{
    let distance = 2555555555555;
    let nearist = null
    User.findByPk(req.userId).then(user => {
        if(!user){
            return res.status(404).send("USer not found");
        }
        if(! user.adresse ){
            return res.status(409).send("User has no adress");
        }
        Depot.findAll()
        .then(depots => {
            for (let index = 0; index < depots.length; index++) {
                    var config = {
                        method: 'get',
                        url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins='+ sansAccents(user.adresse)
                          +'&destinations='+ sansAccents(depots[index].adresse ) +'&mode=DRIVING&language=fr-FR&key=' + google_api_key,
                        headers: { }
                      };
                    axios(config)
                    .then(function (response) {
                        if(parseInt(response.data.rows[0].elements[0].distance.value) < distance){
                            distance = parseInt(response.data.rows[0].elements[0].distance.value)
                            nearist = depots[index]
                        }
                        if( index +1 == depots.length ){
                            return res.status(200).send({ warehouse: nearist });
                        }
                    }).catch(function (error) {
                        return res.status(510).send( {error : "Error while computing diatance", message: error})
                    });
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
    });
}

// Post New Depot
exports.createDepot = (req, res) => {
    console.log( ' ::: req.body ::: ', req.body)
    try {
        Depot.create(
            {
                name: req.body.name,
                disponibilite: 'Disponible',
                adresse: req.body.adresse
            }).then(depots => {
                return res.status(201).json({
                    "Warehouses": depots
                });
            });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

// Delete Depot

proceedDeleteDepot = function (id, req, res) {
    Depot.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Warehouses was Delete successfully."
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error Deleting Warehouses with id=" + id
            });
        });
}

exports.deleteDepot = (req, res) => {
    const id = req.params.id;
    Depot.count({ where: { id: id } })
        .then(count => {
            if (count > 0) {
                proceedDeleteDepot(id, req, res)
            } else {
                res.status(404).send({
                    message: "Warehouses not found"
                })
            }
        })
};


// Update Depot
proceedUpdateDepot = function(id, req, res){
    Depot.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Warehouses was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Warehouses with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Warehouses with id=" + id
            });
        });
}

exports.updateDepot = (req, res) => {
    const id = req.params.id;
    Depot.count( { where : { id : id} } )
        .then( count => {
            if(count > 0){
                proceedUpdateDepot(id, req, res)
            }else{
                res.status(404).send({
                    message: "Warehouses not found"
                })
            }
        })
};