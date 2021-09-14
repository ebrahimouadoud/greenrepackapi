

const User = require("../models/user.model")
const Role = require("../models/role.model")
const db = require("../models")

exports.getAllUsers =  (req, res) => {
  db.user.findAll().then( users => {
    res.status(400).send({
        rows: users
      });
  })
   
};

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {

        if(err || !user) {
            return res.status(404).json({
                error: "user not found !"
            })
        }

        req.profile = user
        next()
    })
}