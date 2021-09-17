const { brand } = require("../models");
const db = require("../models");


// Get All Brands
exports.getAllBrands = (req, res) => {

    db.brand.findAll({ attributes: ['id', 'name'] })
        .then(brands => {
            res.status(200).send({
                rows: brands
            });
        })
        .catch(err => {
            return res.status(400).send({ message: err.message });
        });

};


// Post New Brand
exports.createBrand = (req, res) => {

    try {
        db.brand.create(
            {
                name: req.body.name,
            }).then(brand => {
                return res.status(201).json({
                    "brand": brand
                });
            });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

// Delete Brand

proceedDeleteBrand = function (id, req, res) {
    db.brand.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Brand was Delete successfully."
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error Deleting Brand with id=" + id
            });
        });
}




exports.deleteBrand = (req, res) => {
    const id = req.params.id;
    db.brand.count({ where: { id: id } })
        .then(count => {
            if (count > 0) {
                proceedDeleteBrand(id, req, res)
            } else {
                res.status(404).send({
                    message: "Brand not found"
                })
            }
        })
};
