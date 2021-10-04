require('dotenv').config();
const nodemailer = require("../conf/nodemailer.config");
const { card, produit } = require('../models');
const db = require("../models");
const Card = db.card;
const User = db.user;
const Product = db.produit;
const Brand = db.brand;
const Modele = db.modele;
const ProductsCard = db.productsCard;
const Command = db.command;
const request = require('request-promise');
const axios = require('axios')
const greenBankAdress = process.env.greenBankAdress;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); //Put your secret key Stripe
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twl_client = require('twilio')(accountSid, authToken);

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
                    res.status(400).send("Something went wrong");
                }
            } else {
                return res.status(400).send({ "res": "product not on sale phase" });
            }
        }
    })
}


// STRIPE - Create New Customer

var createCustomer = (email, name, description, SumPrice, Number, expMonth, expYear, Cvc, res, next,
     _card, RnId, nameProduitFacture, adresseClt, telephoneClt) => {
    var param = {};
    param.email = email;
    param.name = name;
    param.description = description;


    stripe.customers.create(param, (err, customer) => {
        if (err) {
            return res.status(400).send({ err: err });
        } if (customer) {
            //Retrieve Customer
            stripe.customers.retrieve(customer.id, (err, customer) => {
                if (err) {
                    return res.status(400).send({ err: err });
                } if (customer) {
                    //Create Token
                    var param = {};
                    param.card = {
                        number: Number,
                        exp_month: expMonth,
                        exp_year: expYear,
                        cvc: Cvc
                    }
                    stripe.tokens.create(param, (err, token) => {
                        if (err) {
                            return res.status(500).send({ err: err });
                        } if (token) {
                            //add Card To Customer
                            stripe.customers.createSource(customer.id, { source: token.id }, (err, card) => {
                                if (err) {
                                    return res.status(400).send({ err: err });
                                } if (card) {
                                    // Charge Customer Through CustomerID
                                    var param = {
                                        amount: SumPrice,
                                        currency: 'eur',
                                        description: description,
                                        customer: customer.id
                                    }
                                    stripe.charges.create(param, (err, charge) => {
                                        if (err) {
                                            return res.status(400).send({ err: err });
                                        } else if (charge) {
                                            console.log(' --------------- good next ---------------')
                                            nodemailer.sendFacture(
                                                name,
                                                email,
                                                RnId,
                                                nameProduitFacture,
                                                SumPrice,
                                                new Date('YYYY/MM/DD HH:m').toString(),
                                                adresseClt,
                                                telephoneClt,
                                            );
                                            console.log( '------------ greenBankAdress --------------')
                                            console.log(greenBankAdress)
                                            console.log( '------------ greenBankAdress --------------')
                                            axios.post(greenBankAdress+ '/getReward', {
                                                    "email": "ebr.ouadoud.or@gmail.com",
                                                    "amount": Math.trunc(SumPrice/1000)
                                                })
                                            
                                                const Len = _card.rows[0].produits.length;
                                                for (var i = 0; i < Len; i++) {
                                                    Product.findAll({
                                                        where: { id: _card.rows[0].produits[i].dataValues.id },
                                                    }).then(async resultat => {
                                                        try {
                                                            resultat[0].phase = 'Vendu';
                                                            resultat[0].save();
                                                            // console.log(_card.rows[0].id);
                                                            Card.destroy({
                                                                where: { id: _card.rows[0].id }
                                                            }).then(FinalResult => {
                            
                                                            })
                            
                                                        } catch (error) {
                                                            return res.status(500).send({ message: error })
                                                        }
                                                    })
                                                }
                                                return res.status(200).send("Commande enregistrée.")
                                        } else {
                                            return res.status(400).send("Something wrong in Create Charge");
                                        }
                                    })
                                } else {
                                }
                            })
                        } else {
                        }
                    })
                } else {
                }
            })
        } else {
        }
    })
}


exports.getMyCard = (req, res) => {
    Card.findAndCountAll({
        where: { userId: req.userId },
        include:
            [
                {
                    model: Product
                },
            ]
    }).then(_card => {
        return res.status(200).send(_card)
    })
}

exports.deleteFromCard = (req, res) => {
    console.log(' req.params.id ::',req.params.id)
    Card.findOne({
        where: { userId: req.userId },
    }).then(_card => {
        db.productsCard.destroy( 
            { where: {
                cardId: _card.id ,produitId: req.params.id
            }}
        )
        return res.status(200).send({ res: "ok" })
    })
        
        
    
}

// POST >> Create Order
exports.CreateOrder = (req, res, next) => {

    Card.findAndCountAll({
        where: { userId: req.userId },
        include:
            [
                {
                    model: Product,
                    attributes: ['id', 'name', 'description', 'couleur', 'age', 'prix_vente', 'phase'],
                },
            ]
    }).then(_card => {
        let SumPrice = 0;
        let nameProduits = "",
            nameProduitFacture = "",
            totalFacture = 0;

        if (!_card.rows[0]) {
            return res.status(404).send({ res: "EMPTY CARD" })
        } else if (_card.rows[0].produits.length == 0) {
            return res.status(404).send({ res: "EMPTY CARD" })
        }
        for (let i = 0; i < _card.count; i++) {
            value = _card.rows[0].produits[i].dataValues.prix_vente;
            nameP = _card.rows[0].produits[i].dataValues.name;
            exmple = _card.rows[0].produits[i];
            SumPrice += value;
            nameProduits += `Prd ${i + 1} : ${nameP} | `;

            nameProduitFacture += `<tr style="box-sizing: border-box;margin: 0;padding: 0;background: #fdfdfd;border-right: 1px solid #ddd;width: 100%;"><td style="box-sizing: border-box;font-family: 'Nunito';border: 1px solid #e3e3e3;border-top: 1px solid #fff;border-left-color: #fff;font-size: 11pt;background: #fdfdfd;min-width: 75px;padding: 3px 6px;line-height: 1.25;">${nameP}</td><td style="box-sizing: border-box;font-family: 'Nunito';border: 1px solid #e3e3e3;border-top: 1px solid #fff;border-left-color: #fff;font-size: 11pt;background: #fdfdfd;min-width: 75px;padding: 3px 6px;line-height: 1.25;">${value}&#8202;€</td></tr>`;
        }

        User.findOne({
            where: { id: req.userId },
            attributes: ['username', 'email', 'firstname', 'lastname', 'telephone', 'adresse']
        }).then(_user => {
            Command.create({
                produits: nameProduits,
                sumPrix: SumPrice,
                userId: req.userId,
                adresseLivraison: req.body.adresse
            })
                .then(async _result => {
                    const myRnId = () => parseInt(Date.now() * Math.random());
                    const RnId = myRnId();
                    totalFacture = SumPrice;
                    const dateCreation = `${_result.createdAt}`,
                        adresseClt = `${req.body.adresse}`,
                        telephoneClt = `${_user.telephone}`,
                        email = _user.email,
                        name = `${_user.firstname} ${_user.lastname}`,
                        username = `${_user.username}`,
                        description = `Commande-de-${_user.username}-N-${RnId}`,
                        Number = req.body.number,
                        expMonth = req.body.exp_month,
                        expYear = req.body.exp_year,
                        Cvc = req.body.cvc;
                    SumPrice = Math.round(SumPrice * 100); // gives .00

                    createCustomer(email, name, description, SumPrice, Number, expMonth,
                        expYear, Cvc, res, next, _card, RnId, nameProduitFacture, adresseClt, telephoneClt);

                        

                })
        })
    })
}


// GET >> Get My Orders
exports.GetMyOrders = (req, res) => {
    Command.findAll({
        where: { userId: req.userId }
    })
        .then((command) => {
            if (!command) {
                return res.status(404).send({ message: 'order Not Found.' })
            }
            else {
                res.status(200).send({
                    rows: command
                });
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
}

// GET >> Get All Orders By Manager Or Admin
exports.GetAllOrders = (req, res) => {
    Command.findAll({
        include:
            [
                { model: User},
            ]
    })
        .then(command => {
            if (!command) {
                return res.status(404).send({ message: 'order Not Found.' })
            }
            else {
                return res.status(200).send({
                    rows: command
                });
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
}


// PUT >> Send Order By Manager
exports.SendOrderManager = (req, res) => {
    Command.findOne({
        where: {
            id: req.params.id,
        },
        include:
            [
                { model: User},
            ]
    })
        .then((Commande) => {
            if (!Commande) {
                return res.status(404).send({ message: 'Command Not Found.' })
            }
            if (Commande.status == 'Confirmé') {
                Commande.trackingNumber = req.body.tracking
                Commande.status = 'Envoyé';
                Commande.save();
                twl_client.messages
                    .create({
                        body: 'Votre Commande est envoyé, numéro de suivie : ' + req.body.tracking ,
                        from: '+16108398994',
                        to: Commande.user.telephone
                    })
                return res.status(200).send({
                    message: 'Order Was Sent Successfully',
                })
            } else if (contreOffre.etat == 'Envoyé') {
                return res.status(400).send({
                    message: 'Order has already been sent',
                })
            }
        })
        .catch((err) => {
            return res.status(400).send({ message: err.message })
        })
}