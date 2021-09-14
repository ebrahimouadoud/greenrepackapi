const authService = require("../authmiddelwares/AuthService");
const User = require("../models/user.model")
const Role = require("../models/role.model")
const db = require("../models")

exports.getAllUsers = (req, res) => {
    // if(authService.isAdmin){
    //     db.user.findAll().then( users => { 
    //         res.status(400).send({
    //             rows: users
    //           });
    //       })
    // }

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
        const users = db.user.create(req.body);
        return res.status(201).json({
            users,
        });
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

    db.user.update(
              { status: req.body.status},
              { where: {id: req.params.id} }
         ).then(users => {
            res.status(200).send({
                message: "User Status was updated successfully."
            });
         })
         .catch(err => {
            res.status(500).send({
                message: "Error updating User Status with id=" + id
            });
        });
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