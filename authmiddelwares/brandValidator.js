const db = require("../models")
const Brand = db.brand

checkDuplicateBrandName = (req, res, next) => {
    // Brand name
    if (req.body.name === 'undefined' || !req.body.name) {
        res.status(400).send({
            message: "Name is required!"
        });
        return;
    }
    Brand.findOne({
        where: {
            name: req.body.name
        }
    }).then(brand => {
        if (brand) {
            res.status(400).send({
                message: "Brand Name in use!"
            });
            return;
        }
        next();
    });
};

const BrandValidator = {
    checkDuplicateBrandName: checkDuplicateBrandName
};

module.exports = BrandValidator;