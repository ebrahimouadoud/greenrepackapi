const nodemailer = require("../conf/nodemailer.config");
const db = require('../models');
const Product = db.produit;
const User = db.user;
const Modele = db.modele
const Brand = db.brand


exports.getAllProducts = (req, res) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            if (roles[0].name === "user" ) {
                Product.findAll({
                    // Get ALL Product Of User By Id
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
            
        });
    });
}

exports.notiyArrival = (req, res) => {
    Product.findByPk(req.params.id, {
        include:
            [
                { model: User, attributes: ['username', 'email'] },
                { model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] },
            ]
    }).then((Produits) => {
        try {
            if (Produits.phase == 'En Attend' || Produits.phase == 'Renvoyé') {
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
                return res.status(200).send({ message: 'Product Received Successfully' });
            }
            else if (Produits.phase == 'Reçu') {
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