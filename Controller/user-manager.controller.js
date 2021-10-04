const authService = require("../authmiddelwares/AuthService");
const User = require("../models/user.model")
const Role = require("../models/role.model")
const db = require("../models")
var bcrypt = require("bcryptjs");
const axios = require('axios')
const Op = db.Sequelize.Op;
const greenBankAdress = process.env.greenBankAdress;
const google_api_key = process.env.google_api_key

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

exports.getAllUsers = (req, res) => {
        let _ppages = req.query.ppage ? parseInt(req.query.ppage ) : 5
        let _offset = req.query.page ? parseInt(req.query.page ) - 1 : 0

        db.user.findAndCountAll({
            limit: _ppages,
            offset: !req.query.search ?_offset * _ppages: 0,
            where :{
                firstname: { [Op.like]: req.query.search ? '%' + req.query.search + '%' : "%%" }
            },
            include: [ {model:db.role, as:'roles', ttributes: ["name"]} ]
        })
        .then( users => { 
            return res.status(200).send({
                rows: users.rows,
                total: users.count,
                tpages: Math.ceil(users.count / _ppages) 
            });
          })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
    
}

exports.checkAdress = (req, res) => {
    console.log( ' eq.query.adresse  ', req.query.adresse )
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + sansAccents(req.query.adresse) + "&key=" + google_api_key)
                    .then( result => {
                        if(result.data.results){
                            if(result.data.results[0].formatted_address){
                                return res.status(200).send(result.data.results[0].formatted_address);
                            }
                        }
                    }, err => {
                        return res.status(500).send({ err });
                    } )
}

exports.getUserById = (req, res) => {
    db.user.findOne({
        where: {
            id: req.params.id
        },
        include: [ {model:db.role, as:'roles', ttributes: ["name"]} ]
    })
        .then(users => {
            if (!users) {
                return res.status(404).send({ message: "User Not found." });
            }
            res.status(200).send({
                users
            });
        })
        .catch(err => {
            return res.status(400).send({ message: err.message });
        });
};

exports.setAdresse = (req, res) => {
    db.user.findOne({ where : { id : req.userId } }).then( user => {
      user.adresse = req.body.adresse;
      user.save()
      res.send("updated")
    })
}

exports.getMyBalance = (req, res ) => {
    db.user.findOne({
        where: {
            id: req.userId
        }
    }).then(user => {
        axios.get(greenBankAdress+'/mybalace?email=' + user.email)
            .then( result => {
                return res.status(200).json( { balance: result.data.balance } )
            })
    })
}

exports.createUser = (req, res) => {
    try {
        db.user.create(
            {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                status: "Active",
                telephone: req.body.telephone,
            }).then(user => {
                db.role.findOne({
                    where: {name: req.body.role}
                }).then( role => {
                    user.setRoles([role.id])
                  })
                return res.status(201).json({
                    "user": user
                });
            }) ;
        
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

proceedUpdate = function(id, req, res){
    db.user.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
}


exports.updateUser = (req, res, next) => {  
    const id = req.params.id;

    db.user.count( { where : { id : id} } )
        .then( count => {
            if(count > 0){
                proceedUpdate(id, req, res)
            }else{
                res.status(404).send({
                    message: "user not found"
                })
            }
        })

    
};


exports.toggleActivation = (req, res) => {
    db.user.findOne({
        where: {
          id: req.params.id
        }
      }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
          let ns = "Blocked"
          if(user.status == "Blocked"){
              ns = "Active"
          }
          user.update(
              {status: ns }
          ).then( us => {
                res.status(200).send({
                    message: "User Status was updated successfully."
                });
          }).catch(err => {
                res.status(500).send({
                    message: "Error updating User Status with id=" + id
                });
            });
      })
}

exports.deleteUserById = (req, res) => {
    const id = req.params.id;
  
    db.user.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };