const { modele } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const Type = db.type


// Get All Modeled
exports.getAllModeles = (req, res) => {

    db.modele.findAll(
        {
            where :{
                brandId: req.query.brandId ? parseInt(req.query.brandId ) : { [Op.ne]: null }, 
                typeId: req.query.typeId ? parseInt(req.query.typeId ) : { [Op.ne]: null }
            },
            include: [ { model : db.type }, { model : db.brand } ]
        })
        .then(modeles => {
            res.status(200).send({
                rows: modeles
            });
        })
        .catch(err => {
            return res.status(400).send({ message: err.message });
        });

};


// Post New Modele
exports.createModele = (req, res) => {

    try {
        db.modele.create(
            {
                name: req.body.name,
                number: req.body.number,
                typeId: req.body.typeId,
                brandId: req.body.brandId
            }).then(modele => {
                return res.status(201).json({
                    "modele": modele
                });
            });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

// Delete Modele

proceedDeleteModele = function (id, req, res) {
    db.modele.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Modele was Delete successfully."
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error Deleting Modele with id=" + id
            });
        });
}


exports.deleteModele = (req, res) => {
    const id = req.params.id;
    db.modele.count({ where: { id: id } })
        .then(count => {
            if (count > 0) {
                proceedDeleteModele(id, req, res)
            } else {
                res.status(404).send({
                    message: "Modele not found"
                })
            }
        })
};
