require('dotenv').config();
const nodemailer = require("../conf/nodemailer.config");
const db = require('../models');
const Resall = db.revente;
const User = db.user;
const ContrOffre = db.contreOffre;
const Product = db.produit;

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// POST >> Create Contre Offre
exports.CreateCO = (req, res) => {
	Resall.findOne({
		where: { id: req.params.id },
	})
		.then((Revente) => {
			if (Revente) {
				try {
					// console.log(Revente.prixPropose);
					Revente.etat = "CO"
					Revente.prixPropose = req.body.prix_propose
					Revente.save()
						.then( _revente =>{ 
							return res.status(200).json({
								revente: _revente
							})
						})
				}
				catch (error) {
					return res.status(500).json({ error: error.message })
				}
			} else {
				return res.status(404).json({ message: 'Resall not found' })
			}
		})

}



// PUT >> Refuse Contre Offre
exports.RefuseCO = (req, res, next) => {
	// 1 -  récuperer le contre offre. => conntreoffre.etat = refuser
	// 2 - récupérer la revente => etat = refuser
	// 2 - récupérer le produit => Phase = Renvoyé
	User.findOne({
		where: { id: req.userId },
		attributes: ['username', 'email', 'firstname', 'lastname']
	}).then(_user=>{
		Resall.findOne({
			where: {
				id: req.params.id,
			},
		})
			.then((resall) => {
				if (!resall) {
					return res.status(404).send({ message: 'Contre Offre Not Found.' })
				}
				if (resall.userId == req.userId) {
					if(resall.etat == 'CO')
						{
							createCustomer(_user.email, 
								"CONTRE-OFFFRE :: ID " + resall.id, 
								"PAYEMENT DE CONTRE OFFRE",
								1500, req.body.number,
								req.body.exp_month, req.body.exp_year, req.body.cvc, 
								res, next, resall);
					}else{
						return res.status(400).send({
							message: "La revente ne fait pas objet d'une contre offre",
						})
					}
				}
				else {
					return res.status(401).send({ message: 'manage only your own sales please.' })
				}
			})
			.catch((err) => {
				return res.status(400).send({ message: err.message })
			})
	})
	
};

// POST >> Accepte Contre Offre
exports.AccepteCO = (req, res) => {

	Resall.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((resall) => {
			if (!resall) {
				return res.status(404).send({ message: 'Contre Offre Not Found.' })
			}
			if (resall.userId == req.userId) {
				if(resall.etat = 'CO'){
					resall.etat = 'Validé';
					resall.save().then(rvt=>{
						return res.status(200).send({
							message: 'Contre Offre Was Accepted Successfully',
						})
					})
				}else {
					return res.status(400).send({
						message: "La revente ne fait pas objet d'une contre offre",
					})
				}
			}else {
				return res.status(401).send({ message: 'manage only your own sales please.' })
			}
		})
		.catch((err) => {
			return res.status(400).send({ message: err.message })
		})
};

var createCustomer = (email, name, description, SumPrice, Number, expMonth, expYear, Cvc, res, next, resall) => {
    var param = {};
    param.email = email;
    param.name = name;
    param.description = description;


    stripe.customers.create(param, (err, customer) => {
        if (err) {
            return  res.status(400).send({ err: err });
        } if (customer) {
            //Retrieve Customer
            stripe.customers.retrieve(customer.id, (err, customer) => {
                if (err) {
                    return  res.status(400).send({ err: err });
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
                            return  res.status(500).send({ err: err });
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
                                        } if (charge) {
                                            resall.etat = 'Refusé'
											resall.save();
											return res.status(200).send({
												message: 'Contre Offre Was Refused Successfully',
											})
                                        } else {
                                            return  res.status(400).send("Something wrong in Create Charge");
                                        }
                                    })
                                } else {
                                    return  res.status(400).send("Something wrong in Create Source");
                                }
                            })
                        } else {
                            return res.status(400).send("Something wrong in Create Token");
                        }
                    })
                } else {
                    return res.status(400).send("Something wrong in Customer Retrieve");
                }
            })
        } else {
            return res.status(400).send("Something wrong in Create Customer");
        }
    })
}