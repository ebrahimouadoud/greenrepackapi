const db = require("../models");
const Depot = db.depot;


// Get All Depot
exports.getAllDepots = (req, res) => {

    Depot.findAll()
        .then(depots => {
            res.status(200).send({
                rows: depots
            });
        })
        .catch(err => {
            return res.status(400).send({ message: err.message });
        });

};


// Post New Depot
exports.createDepot = (req, res) => {

    try {
        Depot.create(
            {
                name: req.body.name,
                disponibilite: req.body.disponibilite,
                adresseId: req.body.adresseId,
                userId: req.body.userId,
            }).then(depots => {
                return res.status(201).json({
                    "Warehouses": depots
                });
            });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

// Delete Depot

proceedDeleteDepot = function (id, req, res) {
    Depot.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Warehouses was Delete successfully."
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error Deleting Warehouses with id=" + id
            });
        });
}

exports.deleteDepot = (req, res) => {
    const id = req.params.id;
    Depot.count({ where: { id: id } })
        .then(count => {
            if (count > 0) {
                proceedDeleteDepot(id, req, res)
            } else {
                res.status(404).send({
                    message: "Warehouses not found"
                })
            }
        })
};


// Update Depot
proceedUpdateDepot = function(id, req, res){
    Depot.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Warehouses was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Warehouses with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Warehouses with id=" + id
            });
        });
}

exports.updateDepot = (req, res) => {
    const id = req.params.id;
    Depot.count( { where : { id : id} } )
        .then( count => {
            if(count > 0){
                proceedUpdateDepot(id, req, res)
            }else{
                res.status(404).send({
                    message: "Warehouses not found"
                })
            }
        })
};