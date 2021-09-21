require('dotenv').config();
const nodemailer = require("../conf/nodemailer.config");
const db = require('../models');
const Resall = db.revente;
const User = db.user;
const ContrOffre = db.contreOffre;
const Product = db.produit;


// POST >> Create Contre Offre
exports.CreateCO = (req, res) => {
	Resall.findOne({
		where: { id: req.params.id },
	})
		.then((Revente) => {
			if (Revente) {
				try {
					// console.log(Revente.prixPropose);
					const PrixProposall = req.body.prix_propose;
					if (PrixProposall > Revente.prixPropose) {
						ContrOffre.create({
							prixPropose: PrixProposall,
							produitId: ['En Attend'],
							userId: Revente.userId,
							resallId: req.params.id
						})
							.then((contreOffre) => {
								User.findOne({
									where: { id: Revente.userId },
								})
									.then((Users) => {
										// console.log(Users);
										nodemailer.sendContreOffreEmail(
											Users.username,
											Users.email,
										);
										return res.status(200).json({
											contreOffre: contreOffre,
										})
									})
							})

					} else {
						return res.status(404).json({ message: `Proposall Price Must Be Greater Than >> ${Revente.prixPropose}` })
					}

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
exports.RefuseCO = (req, res) => {
	// 1 -  récuperer le contre offre. => conntreoffre.etat = refuser
	// 2 - récupérer la revente => etat = refuser
	// 2 - récupérer le produit => Phase = Renvoyé
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
				ContrOffre.findOne({
					where: {
						userId: req.userId,
					},
					include:
						[
							{
								model: Resall,
								attributes: ['produitId'],
							},
						]
				}).then((contreOffre) => {
					if (contreOffre.etat !== 'Refusé') {
						// Change la Phase de Produit (Renvoye)
						Product.findByPk(contreOffre.revente.produitId)
							.then((result) => {
								contreOffre.etat = 'Refusé';
								resall.etat = 'Refusé'
								result.phase = 'Renvoyé';
								contreOffre.save();
								resall.save();
								result.save();
								contreOffre.save();
								return res.status(200).send({
									message: 'Contre Offre Was Refused Successfully',
								})

							})
					} else if (contreOffre.etat == 'Refusé') {
						return res.status(200).send({
							message: 'Contre Offre has Already Refused',
						})
					}
				})
			}
			else {
				return res.status(401).send({ message: 'manage only your own sales please.' })
			}
		})
		.catch((err) => {
			return res.status(400).send({ message: err.message })
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
				ContrOffre.findOne({
					where: {
						userId: req.userId,
					},
				}).then((contreOffre) => {
					if (contreOffre.etat !== 'Accepté') {
						contreOffre.etat = 'Accepté';
						resall.etat = 'Accepté';
						resall.save();
						contreOffre.save();
						return res.status(200).send({
							message: 'Contre Offre Was Accepted Successfully',
						})
					} else if (contreOffre.etat == 'Accepté') {
						return res.status(200).send({
							message: 'Contre Offre has Already Accepted',
						})
					}
				})
			}
			else {
				return res.status(401).send({ message: 'manage only your own sales please.' })
			}
		})
		.catch((err) => {
			return res.status(400).send({ message: err.message })
		})
};