// const authService = require("../authmiddelwares/AuthService");
const nodemailer = require("../conf/nodemailer.config");
const db = require('../models');
const Product = db.produit;
const User = db.user;
const Resall = db.revente
const Modele = db.modele
const Brand = db.brand


exports.getAllProducts = (req, res) => { 

    Product.findAll({
        // Get ALL Product Of User By Id
        where:{userId: req.userId,},
        include: {
            model: Modele,
            attributes:['name', 'number'],
            include: {
                model: Brand,
                attributes:['name']
            }
        }
            })
                .then(products => {
                    res.status(200).send({
                        "Products": products
                    });
                })
                .catch(err => {
                    return res.status(400).send({ message: err.message });
                });

            }
    
exports.notiyArrival = (req, res) => {


    Product.findAll({
        where: {
          id: req.params.id
        },
        include:[User, Modele],
        attributes : ['userId'] ,
        
      
            
      }).then( result => {
        if (!result) {
            return res.status(404).send({ message: "Product Not found." });
        } return res.status(200).send({ result })
        // else {
        //       nodemailer.sendNotifyEmail(
        //         user.username,
        //         user.email,
        //         user.confirmationCode
        //       );
        //       res.redirect("/");
        //     });
        //   }
        .catch(err => {
                res.status(500).send({
                    message: "Error updating User Status with id=" + id
                });
            });
      })
}