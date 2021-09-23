require('dotenv').config();
const db = require("../models");
const Card = db.card;
const User = db.user;
const Product = db.produit;
const Brand = db.brand;
const Modele = db.modele;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); //Put your secret key Stripe


// PUT >> Add Product To card
exports.addToCard = (req, res) => {
    try {
        Card.save(
            {
                // Todo 
                produitId: req.body.produitId,
            }).then(card => {
                return res.status(201).json({
                    "Carts": card
                });
            });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


// POST >> Create Order
exports.CreateOrder = (req, res) => {
    // Todo : 1- get Card >> 2-
    // 2 - récuperer les produits et calculer le prix de la commande .
    // 3 - Générer le numéro de la commande example : 'Commande-de-user.name-numéro' 
    // 4 - créer la commande avec un status (confirmé)
    // 5 - changer le status des articles (phase: vendu)

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