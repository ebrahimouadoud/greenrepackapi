require('dotenv').config();
const nodemailer = require("../conf/nodemailer.config");
const db = require('../models');
const Resall = db.revente;
const User = db.user;
const ContrOffre = db.contreOffre;


// POST >> Create Contre Offre
exports.CreateCO = (req, res) => {
	Resall.findOne({
		where: { id: req.params.id },
	})
		.then((Revente) => {
			if (Revente) {
				try {
					// console.log(Revente.prixPropose);
					const PrixProposall = Revente.prixPropose + 100;
					ContrOffre.create({
						prixPropose: PrixProposall,
						produitId: ['En Attend'],
						userId: Revente.userId,
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
	ContrOffre.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((contreOffre) => {
			if (!contreOffre) {
				return res.status(404).send({ message: 'Contre Offre Not Found.' })
			} else {
				contreOffre.etat = 'Accepté'
				contreOffre.save()
				return res.status(200).send({
					message: 'Contre Offre Was Accepted Successfully',
				})
			}
		})
		.catch((err) => {
			return res.status(400).send({ message: err.message })
		})
}


// POST >> Accepte Contre Offre
exports.AccepteCO = (req, res) => {
	ContrOffre.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((contreOffre) => {
			if (!contreOffre) {
				return res.status(404).send({ message: 'Contre Offre Not Found.' })
			} else {
				contreOffre.etat = 'Accepté'
				contreOffre.save()
				return res.status(200).send({
					message: 'Contre Offre Was Accepted Successfully',
				})
			}
		})
		.catch((err) => {
			return res.status(400).send({ message: err.message })
		})
}