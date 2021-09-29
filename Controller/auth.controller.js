const db = require("../models");
require('dotenv').config();
const nodemailer = require("../conf/nodemailer.config");
const User = db.user;
const Role = db.role;

const { UserValidator } = require('../authmiddelwares')

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { rmSync } = require("fs");

exports.signup = (req, res) => {
  //UserValidator.userSignupValidator()
  // Save User to Database
  User.create({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmationCode: jwt.sign({ email: req.body.email }, process.env.secret),
    telephone: req.body.telephone,
    adresse: req.body.adresse,
  })
    .then(user => {
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully! Please check your email" });
        nodemailer.sendConfirmationEmail(
          user.username,
          user.email,
          user.confirmationCode
        );
        res.redirect("/");
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.setNewPass = (req, res) => {
  let token = req.headers["x-access-token"];
  var newPws = bcrypt.hashSync(req.body.pwd, 8)
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    User.findOne({ where : { id : decoded.id } }).then( user => {
      var newPws = bcrypt.hashSync(req.body.pwd, 8)
      user.password = newPws;
      user.save()
      res.send("updated")
    }) 
  })
}

exports.getNewPass = (req, res) => {
  var pswd = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  var cpwd = bcrypt.hashSync(pswd, 8)
  User.findOne({
    where: {
      email: req.query.email
    }
  })
    .then(user => {
      if (user) {
        user.password = cpwd
        user.save()
        nodemailer.sendNewPassword(
          user.username,
          user.email,
          pswd)
      }
      res.send('done')
      })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    },
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (user.status == "Pending") {
        return res.status(400).send({ message: "User Not Actived. Please Confirme your account " });
      } else if (user.status == "Blocked") {
        return res.status(400).send({ message: "User Blocked. Please Contact Admin " });
      } else {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }

        var token = jwt.sign({ id: user.id }, process.env.secret, {
          expiresIn: 604800 // 24 hours
        });

        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            lastname: user.lastname,
            firstname: user.firstname,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            password: user.password,
            adresse: user.adresse,
          });
        });
      }

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// User ValidationCode
exports.userValidator = (req, res, next) => {
  User.findOne({
    where: {
      confirmationCode: req.params.confirmationCode
    }
  })
    .then((user) => {
      // console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (user.status == 'Pending') {
        user.status = 'Active';
        user.save();
        return res.status(200).send({
          message: "User Was validate Successfully"
        });
      }
      else if (user.status == 'Active') {
        return res.status(500).send({
          message: "User Has Already been Validated"
        });
      }
    })
    .catch(err => {
      return res.status(400).send({ message: err.message });
    });
};

// get user by token
exports.getUserByToken = (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    User.findOne({ where : { id : decoded.id } }).then( user => {
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        return res.status(200).send({
          id: user.id,
          lastname: user.lastname,
          firstname: user.firstname,
          username: user.username,
          email: user.email,
          roles: authorities,
          password: user.password,
          adresse: user.adresse,
        });
      });
      
    })
    
  });
};
// Logout

exports.logout = async function (req, res) {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).send({ message: 'You have been Logged Out' });
    } else {
      res.send({ msg: 'Error' });
    }
  });

};

