const nodemailer = require("../conf/nodemailer.config");
const db = require('../models');
const Product = db.produit;
const User = db.user;
const Resall = db.revente
const Modele = db.modele
const Brand = db.brand


exports.getAllProducts = (req, res) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "user" || roles[i].name === "association") {
                    const wheres = { userId: req.userId };
                    Product.findAll({
                        // Get ALL Product Of User By Id
                        where: wheres,
                        include:
                            [
                                { model: User, attributes: ['username', 'email'] },
                                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
                            ]
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
                else if (roles[i].name === "admin" || roles[i].name === "manager") {
                    const wheres = {};
                    Product.findAll({
                        where: wheres,
                        include:
                            [
                                { model: User, attributes: ['username', 'email'] },
                                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
                            ]
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
            }
        });
    });
}

exports.notiyArrival = (req, res) => {
    Product.findByPk(req.params.id,{
        include:
            [
                { model: User, attributes: ['username', 'email'] },
                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
            ]
    }).then((Produits) => {
        console.log(Produits.phase);
        try {
            if (Produits.phase == 'En Attend' || Produits.phase == 'Renvoyé' ) {
                const Username = Produits.user.username;
                const Email = Produits.user.email;
                const ProductName = Produits.name;
                const ModeleName = Produits.modele.name;
                const BrandName = Produits.modele.brand.name;
                nodemailer.sendNotiyArrivalEmail(
                    Username,
                    Email,
                    ProductName,
                    ModeleName,
                    BrandName
                );
                Produits.phase = 'Reçu';
                Produits.save();
                return res.status(500).send({ message: 'Product Received Successfully' });
            }
            else if (Produits.phase == 'Reçu') {
                return res.status(500).send({ message: 'Product in Received Phase' });
            } else {
                return res.status(500).send({ message: 'Product Sold Or in Sales Phase' });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
}

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
// }