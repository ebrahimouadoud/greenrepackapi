const db = require("../models")
const Roles = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    if( req.body.username === 'undefined' || !req.body.username ){
      res.status(400).send({
        message: "Username in required!"
      });
      return;
    }
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Username in use!"
        });
        return;
      }
  
      // Email
      if( req.body.email === 'undefined' || !req.body.email ){
        res.status(400).send({
          message: "Email in required!"
        });
        return;
      }
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Email in use!"
          });
          return;
        }
  
        next();
      });
    });
  };
  checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };

  const SignupValidator = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = SignupValidator;