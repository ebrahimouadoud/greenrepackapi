const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt")
require('dotenv').config();
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
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
    req.userId = decoded.id;
    next();
  });
};

// exports.requireSignIn = expressJWT({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['HS256'],
//   userProperty: 'auth'
// })

// exports.isAuth = (req, res, next) => {
//   let user = req.profile && req.auth && (req.profile._id == req.auth._id)
  
//   if(!user){
//       res.status(403).json({
//           error: "Access Denied"
//       })
//   }

//   next()
// }

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Manager Role!"
      });
    });
  });
};

isManagerOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Agent or Admin Role!"
      });
    });
  });
};

isAssociation = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "association") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Agent Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isManager: isManager,
  isManagerOrAdmin: isManagerOrAdmin,
  isAssociation: isAssociation,
};
module.exports = authJwt;