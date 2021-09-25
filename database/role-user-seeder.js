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
          status: "Active",
          password: bcrypt.hashSync("0000", 8)
        }).then(user => {
          user.setRoles([2])
        })
        User.create({
          username: "user1",
          firstname: "user1",
          lastname: "user1-L",
          email: "user1@local.dev",
          status: "Active",
          password: bcrypt.hashSync("0000", 8)
        }).then(user => {
          user.setRoles([1])
        })
        User.create({
          username: "user2",
          firstname: "user2",
          lastname: "user2-L",
          email: "user2@local.dev",
          status: "Active",
          password: bcrypt.hashSync("0000", 8)
        }).then(user => {
          user.setRoles([1])
        })
        User.create({
          username: "manager",
          firstname: "manager",
          lastname: "manager-L",
          email: "manager@local.dev",
          status: "Active",
          password: bcrypt.hashSync("0000", 8)
        }).then(user => {
          user.setRoles([3])
        })
        User.create({
          username: "asso",
          firstname: "asso",
          lastname: "asso-L",
          email: "asso@local.dev",
          status: "Active",
          password: bcrypt.hashSync("0000", 8)
        }).then(user => {
          user.setRoles([4])
        })
      }

};