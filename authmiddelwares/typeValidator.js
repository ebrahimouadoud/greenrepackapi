const db = require("../models")
const Type = db.type

checkDuplicateTypeName = (req, res, next) => {
    // Type name
    if (req.body.name === 'undefined' || !req.body.name) {
        res.status(400).send({
            message: "Name is required!"
        });
        return;
    }
    Type.findOne({
        where: {
            name: req.body.name
        }
    }).then(type => {
        if (type) {
            res.status(400).send({
                message: "Type Name in use!"
            });
            return;
        }
        next();
    });
};

const TypeValidator = {
    checkDuplicateTypeName: checkDuplicateTypeName
};

module.exports = TypeValidator;