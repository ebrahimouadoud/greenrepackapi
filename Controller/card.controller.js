require('dotenv').config();
const { card, produit } = require('../models');
const db = require("../models");
const Card = db.card;
const User = db.user;
const Product = db.produit;
const Brand = db.brand;
const Modele = db.modele;
const ProductsCard = db.productsCard;
const Command = db.command;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); //Put your secret key Stripe


exports.FunctionAddToCart = async (req, res) => {
    const productId = req.params.id;

    const userId = req.userId;

    try {
        let cart = await Card.findOne({
            where: { userId: req.userId },
            include: [Product]
        });

        if (cart) {
            //product does not exists in cart, add new item
            Product.findOne({
                where: { id: productId }
            }).then(produit => {
                produit.setCards(cart.id)
            })
            return res.status(201).json({
                "cart": cart
            });
        } else {
            //no cart for user, create new cart
            const newCart = await Card.create(
                {
                    userId: userId,

                }).then(cart => {
                    Product.findOne({
                        where: { id: productId }
                    }).then(produit => {
                        produit.setCards(cart.id)
                    })
                    return res.status(201).json({
                        "cart": produit
                    });
                });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}


// PUT >> Add Product To card
exports.addToCard = (req, res) => {

    Product.findByPk(req.params.id).then(prd => {
        if (!prd) {
            return res.status(404).send({ "res": "product not found" });
        } else {
            if (prd.phase == 'En vente') {
                try {
                    Card.findOne({
                        where: { userId: req.userId }
                    }).then(_card => {
                        //no cart for user, create new cart
                        if (!_card) {
                            Card.create({
                                userId: req.userId,
                            }).then(newCart => {
                                prd.setCards(newCart.id).then(_newCart => {
                                    return res.status(201).send(_newCart);
                                })
                            })
                        } else {
                            // Else Add new Product To cart
                            prd.setCards(_card.id).then(_cart => {
                                return res.status(201).json({
                                    "newCart": _cart
                                });
                            })
                        }
                    })
                } catch (err) {
                    console.log(err);
                    res.status(500).send("Something went wrong");
                }
            } else {
                return res.status(400).send({ "res": "product not on sale phase" });
            }
        }
    })
}


// POST >> Create Order
exports.CreateOrder = (req, res) => {
    // 1 - get Card 
    // 2 - récuperer les produits et calculer le prix de la commande .
    // Todo 3 - Générer le numéro de la commande example : 'Commande-de-user.name-numéro' 
    // Todo 4 - créer la commande avec un status (confirmé)
    // Todo 5 - changer le status des articles (phase: vendu)

    Card.findAndCountAll({
        where: { userId: req.userId },
        include:
            [
                {
                    model: Product,
                    attributes: ['name', 'description', 'couleur', 'age', 'prix_vente'],
                },
            ]
    }).then(_card => {
        let SumPrice = 0;
        let nameProduits = "";
        for (let i = 0; i < _card.count; i++) {
            value = _card.rows[0].produits[i].dataValues.prix_vente;
            nameP = _card.rows[0].produits[i].dataValues.name;

            SumPrice += value;
            nameProduits += `Prd ${i + 1} : ${nameP} | `

        }

        // console.log(SumPrice);
        // return res.status(200).json({
        //     "result":  _card
        // })

        User.findOne({
            where: { id: req.userId },
            attributes: ['username', 'email']
        }).then(_user => {
            Command.create({
                produits: nameProduits,
                sumPrix: SumPrice,
                userId: req.userId
            })
                .then(async _result => {
                    // Moreover you can take more details from user 
                    // like Address, Name, etc from form 
                    stripe.customers.create({
                        email: _user.email,
                        source: req.body.stripeToken,
                        name: _user.username,
                    })
                        .then((customer) => {

                            return stripe.charges.create({
                                amount: SumPrice,    // Charing Rs 25 
                                description: `Commande-de-${_user.username}-numéro`,
                                currency: 'USD',
                                customer: req.userId
                            });
                        })
                        .then((charge) => {
                            res.send("Success") // If no error occurs 
                        })
                        .catch((err) => {
                            res.send(err)    // If some error occurs 
                        });
                })
        })
    })




}


// GET >> Get My Orders
exports.GetMyOrders = (req, res) => {
    Card.findAll({
        where: { userId: req.userId }
    })
        .then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'card Not Found.' })
            }
            else {
                res.status(200).send({
                    rows: card
                });
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
}


// GET >> Get All Orders By Manager Or Admin
exports.GetAllOrders = (req, res) => {

    Card.findAll({
        include:
            [
                { model: User, attributes: ['username', 'email'] },
                { model: Product, attributes: ['name', 'description'], include: [{ model: Modele, attributes: ['name', 'number'], include: [{ model: Brand, attributes: ['name'] }] }] },
            ]
    })
        .then(card => {
            if (!card) {
                return res.status(404).send({ message: 'card Not Found.' })
            }
            else {
                res.status(200).send({
                    rows: card
                });
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });

}


// PUT >> Submit Order By Manager
exports.SubmitOrderManager = (req, res) => {
}