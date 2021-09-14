const db = require("../models");
const config = require("../conf/auth.conf");
const nodemailer = require("../conf/nodemailer.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const token = jwt.sign({ email: req.body.email }, config.secret);

  // Save User to Database
  User.create({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmationCode: token,
    telephone: req.body.telephone,
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

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
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
          telephone: user.telephone,
          password: user.password,
        });
      });
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
      if (user.status == 'Pending'){
        user.status = 'Active';
        user.save();
        return res.status(200).send({
          message: "User Was validate Successfully"
        });
      } 
      else if (user.status == 'Active'){
        return res.status(500).send({ 
          message: "User Has Already been Validated" 
        });
      }
    })
    .catch(err => {
      return res.status(400).send({ message: err.message });
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

