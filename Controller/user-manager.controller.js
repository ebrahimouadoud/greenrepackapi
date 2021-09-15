const authService = require("../authmiddelwares/AuthService");
const User = require("../models/user.model")
const Role = require("../models/role.model")
const db = require("../models")
var bcrypt = require("bcryptjs");

exports.getAllUsers = (req, res) => {
    if(authService.isAdmin){
        db.user.findAll().then( users => { 
            users.forEach(user => {
                if( user.getRoles()[0] == "admin" ){
                    users.splice(users.findIndex(us => user.id == us.id ), 1 )
                }
            });
            })
    }
    if(authService.isManager){
        db.user.findAll().then( users => {
            users.forEach(user => {
                if( user.getRoles()[0] == "admin" ){
                    users.splice(users.findIndex(us => user.id == us.id ), 1 )
                }
            });
            res.status(200).send({
                rows: users
                });
            })
    }

};


exports.getUserById = (req, res) => {
    db.user.findOne({
        where: {
            id: req.params.id
        }
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
                let role_id = db.role.findOne({
                    where: {name: req.body.role}
                })
                user.setRoles([role_id])
                return res.status(201).json({
                    "user": user
                });
            }) ;
        
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};


exports.updateUser = (req, res) => {
    const id = req.params.id;

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
};


exports.toggleActivation = (req, res) => {
    db.user.findOne({
        where: {
          id: req.params.id
        }
      }).then(user => {
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