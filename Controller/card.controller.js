require('dotenv').config();
const { card } = require('../models');
const db = require("../models");
const Card = db.card;
const User = db.user;
const Product = db.produit;
const Brand = db.brand;
const Modele = db.modele;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); //Put your secret key Stripe


// exports.FunctionAddToCart = async (req, res) => {
//     const  productId  = req.params.id;
  
//     const userId = req.userId;
  
//     try {
//       let cart = await Card.findOne({ 
//         where: { userId: req.userId }
//        });
  
//       if (cart) {
//           //product does not exists in cart, add new item
//           cart.products.push({ productId: productId });

//         cart = await cart.save();
//         return res.status(201).send(cart);
//       } else {
//         //no cart for user, create new cart
//         const newCart = await Card.create({
//           userId: userId,
//           products: [{ productId: productId }]
//         });
  
//         return res.status(201).send(newCart);
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Something went wrong");
//     }
//   }

proceedProductAdd = function (req, res) {
    try {
        Card.findOne({
            where: { userId: req.userId }
        }).then(_card => {
            if (!_card) {
                Card.create({
                    userId: req.userId,
                    products: [req.params.id]
                }).then(newCart => {
                    return res.status(201).send(newCart);
                })
            } else {

                //console.log(' 29 PUSHED :: _products ::', _products)
                //let itemIndex = _card.products.findIndex(p => p.produitId == req.params.id);
                //console.log('itemIndex', itemIndex);
                //_products.push({ produitId: req.params.id });
                var _products = _card.dataValues.products;
                //console.log('_card ', _card)
                console.log('34 _products ::: ', _products)
                _products.concat([req.params.id])
                console.log(' 32 PUSHED :: _products ::', _products);
                console.log(' 33 card controller', _card.products);
                _card.save().then(__card => {
                    return res.status(201).send(__card);
                })
                // _card.update({products : _products }).then(__card => {
                //     console.log(' 35 card controller', __card.products)
                //     return res.status(201).send(__card);
                // })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

// PUT >> Add Product To card
exports.addToCard = async (req, res) => {

    Product.findByPk(req.params.id).then(prd => {
        if (!prd) {
            return res.status(404).send({ "res": "product not found" });
        } else {
            if (prd.phase == 'En vente') {
                proceedProductAdd(req, res)
            } else {
                return res.status(400).send({ "res": "product not on sale phase" });
            }
        }
    })
}


// POST >> Create Order
exports.CreateOrder = (req, res) => {
    // Todo 1 - get Card 
    // Todo 2 - récuperer les produits et calculer le prix de la commande .
    // Todo 3 - Générer le numéro de la commande example : 'Commande-de-user.name-numéro' 
    // Todo 4 - créer la commande avec un status (confirmé)
    // Todo 5 - changer le status des articles (phase: vendu)

    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items: [{
    //       name: 'T-shirt',
    //       description: 'Comfortable cotton t-shirt',
    //       images: ['https://example.com/t-shirt.png'],
    //       amount: 500,
    //       currency: 'hkd',
    //       quantity: 1,
    //     }],
    //     success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    //     cancel_url: 'https://example.com/cancel',
    //   });
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