const { type } = require("../models");
const db = require("../models");


// Get All Types
exports.getAllCategorie = (req, res) => {

    db.type.findAll({ attributes: ['id', 'name'] })
        .then(types => {
            res.status(200).send({
                rows: types
            });
        })
        .catch(err => {
            return res.status(400).send({ message: err.message });
        });

};


// Post New Type
exports.createType = (req, res) => {

    try {
        db.type.create(
            {
                name: req.body.name,
            }).then(type => {
                return res.status(201).json({
                    "type": type
                });
            });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

// Delete Type

proceedDelete = function (id, req, res) {
    db.type.destroy(req.params, {
        where: { id: req.params.id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Type was Delete successfully."
                });
            } else {
                res.send({
                    message: `Cannot Delete type with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error Deleting with id=" + id
            });
        });
}

exports.deleteType = (req, res) => {
    const id = req.params.id;
    db.type.count({ where: { id: id } })
        .then(count => {
            if (count > 0) {
                proceedDelete(id, req, res)
            } else {
                res.status(404).send({
                    message: "type not found"
                })
            }
        })
};
