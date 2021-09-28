const nodemailer = require("../conf/nodemailer.config");
const db = require('../models');
require('dotenv').config();
const Product = db.produit;
const User = db.user;
const Modele = db.modele
const Brand = db.brand
const Resall = db.revente
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twl_client = require('twilio')(accountSid, authToken);

exports.getAllProducts = (req, res) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            if (roles[0].name === "user" ) {
                Product.findAll({
                    order: [
                        ['createdAt', 'DESC'],
                    ],
                    where: {phase:'En vente'},
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
            else if (roles[0].name === "admin" || roles[0].name === "manager") {
                const wheres = {};
                Product.findAll({
                    where: wheres,
                    order: [
                        ['createdAt', 'DESC'],
                      ],
                    include:
                        [
                            { 
                                model: Resall
                            },
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
            
        });
    });
}

exports.notiyArrival = (req, res) => {
    Product.findByPk(req.params.id, {
        include:
            [
                { model: User },
                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
            ]
    }).then((Produit) => {
        try {
            if (Produit.phase == 'En Attend' || Produit.phase == 'Renvoyé') {
                const Username = Produit.user.username;
                const Email = Produit.user.email;
                const ProductName = Produit.name;
                const ModeleName = Produit.modele.name;
                const BrandName = Produit.modele.brand.name;
                nodemailer.sendNotiyArrivalEmail(
                    Username,
                    Email,
                    ProductName,
                    ModeleName,
                    BrandName
                );
                Produit.phase = 'Reçu';
                Produit.save();
                if(Produit.user.telephone){
                    twl_client.messages
                    .create({
                        body: 'Votre revente : ' + Produit.name + '. est reçu dans nos locaux, merci pour votre confiance.',
                        from: '+16108398994',
                        to: Produit.user.telephone
                    })
                }
                return res.status(200).send({ message: 'Product Received Successfully' });
            }
            else if (Produit.phase == 'Reçu') {
                return res.status(400).send({ message: 'Product in Received Phase' });
            } else {
                return res.status(400).send({ message: 'Product Sold Or in Sales Phase' });
            }
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    })
}


exports.returnProduct = (req, res) => {
    Product.findByPk(req.params.id, {
        include:
            [
                { model: User, attributes: ['username', 'email'] },
                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
            ]
    }).then((Produits) => {
        if (!Produits) {
            return res.status(404).send({ message: 'Product Not Found.' })
        }
        try {
            if (Produits.phase == 'Reçu') {
                const Username = Produits.user.username;
                const Email = Produits.user.email;
                const ProductName = Produits.name;
                const ModeleName = Produits.modele.name;
                const BrandName = Produits.modele.brand.name;
                nodemailer.returnProductEmail(
                    Username,
                    Email,
                    ProductName,
                    ModeleName,
                    BrandName
                );
                Produits.phase = 'Renvoyé';
                Produits.save();
                return res.status(200).send({ message: 'Product Returned Successfully' });
            }
            else if (Produits.phase == 'En Attend') {
                return res.status(400).send({ message: 'Product is Not yet Received' });
            }
            else if (Produits.phase == 'Renvoyé') {
                return res.status(400).send({ message: 'Product is already returned' });
            } else {
                return res.status(400).send({ message: 'Product Sold Or in Sales Phase' });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
}

exports.saleProduct = (req, res) => {
    Product.findByPk(req.params.id, {
        include:
            [
                { model: User, attributes: ['username', 'email'] },
                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
            ]
    }).then((Produits) => {
        if (!Produits) {
            return res.status(404).send({ message: 'Product Not Found.' })
        }
        try {
            if (Produits.phase == 'Reçu') {
                Produits.prix_vente = req.body.prix_vente;
                Produits.phase = 'En vente';
                Produits.name = req.body.name;
                Produits.save();
                return res.status(200).send({ message: 'Product On sale phase Successfully' });
            }
            else if (Produits.phase == 'En Attend') {
                return res.status(400).send({ message: 'Product in waiting Phase' });
            }
            else if (Produits.phase == 'Renvoyé') {
                return res.status(400).send({ message: 'Product is already returned' });
            } else {
                return res.status(400).send({ message: 'Product in saling Phase' });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    })
}

exports.updateProduct = (req, res) => {
    Product.findByPk(req.params.id, {
        include:
            [
                { model: User, attributes: ['username', 'email'] },
                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
            ]
    }).then((produit) => {
        if (!produit) {
            return res.status(404).send({ message: 'Product Not Found.' })
        }
        produit.update({
            description: req.body.description,
            couleur: req.body.couleur,
            age: req.body.age,
            state: req.body.state,
            modeleId: req.body.modeleId,
            userId: req.body.userId,
            prix_vente: req.body.prix_vente
        }).then((result) => {
            return res.status(200).json({
                message: "Product Updated Successfully",
                "Product": result,
            })
        }).catch((error) => {
            return res.status(400).json({ error: error.message })
        });
    })
}