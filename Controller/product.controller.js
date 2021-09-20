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
        where: { userId: req.userId, },
        include: {
            model: Modele,
            attributes: ['name', 'number'],
            include: {
                model: Brand,
                attributes: ['name']
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
//     Product.findAll({
//         where: {
//             id: req.params.id
//         },
//         include: [User, Modele],
//         attributes: ['userId'],



//     }).then(result => {
//         if (!result) {
//             return res.status(404).send({ message: "Product Not found." });
//         } return res.status(200).send({ result })
//             // else {
//             //       nodemailer.sendNotifyEmail(
//             //         user.username,
//             //         user.email,
//             //         user.confirmationCode
//             //       );
//             //       res.redirect("/");
//             //     });
//             //   }
//             .catch(err => {
//                 res.status(500).send({
//                     message: "Error updating User Status with id=" + id
//                 });
//             });
//     })
// }

// exports.updateProduct = (req, res) => {
//     Product.findOne({
//         where: { id: req.params.id },
//     })
//         .then((product) => {
//             if (product.userId == req.userId) {
//                 try {

//                     product.create({
//                         name: _modele.name + ' de ' + user.username,
//                         description: req.body.description,
//                         couleur: req.body.color,
//                         age: req.body.age,
//                         state: {
//                             state_body: req.body.state_body,
//                             state_screen: req.body.state_screen,
//                         },
//                         modeleId: _modele.id,
//                         userId: req.userId,
//                     }).then((produit) => {
//                         const ProposalPrice = randomIntFromInterval(900, 80)
//                         try {
//                             db.revente
//                                 .create({
//                                     prixPropose: ProposalPrice,
//                                     etat: 'En Attendant',
//                                     produitId: produit.id,
//                                     userId: req.userId,
//                                 })
//                                 .then((revente) => {
//                                     return res.status(200).json({
//                                         revente: revente,
//                                     })
//                                 })
//                         } catch (error) {
//                             return res.status(500).json({ error: error.message })
//                         }
//                     })
//                 } catch (error) {
//                     return res.status(500).json({ error: error.message })
//                 }
//             } else {
//                 return res.status(404).json({ message: 'modele not found' })
//             }
//         })
}