const db = require("../models");
const Role = db.role;
const User = db.user;
var bcrypt = require("bcryptjs");

module.exports ={

    seedRoles: function () {
        // création des roles.
        Role.create({
          id: 1,
          name: "user"
        });
       
        Role.create({
          id: 2,
          name: "admin"
        });

        Role.create({
          id: 3,
          name: "manager"
        });

        Role.create({
          id: 4,
          name: "association"
        });
        //création d'utilisateur par défaut (admin 0 )
        User.create({
          username: "eouadoud",
          firstname: "Ebrahim",
          lastname: "OUADOUD",
          email: "ebr.ouadoud@gmail.com",
          password: bcrypt.hashSync("0000", 8)
        }).then(user => {
          user.setRoles([2])
        })
      }

};