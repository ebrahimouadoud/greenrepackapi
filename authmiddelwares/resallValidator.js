const db = require("../models")



checkRequired = (req, res) => {
    // sim_lock
        if (req.body.sim_lock === 'undefined' || !req.body.sim_lock) {
            res.status(400).send({
                message: "sim_lock is required!"
            });
            return;
        }

    // State Body 
        if (req.body.state_body === 'undefined' || !req.body.state_body) {
            res.status(400).send({
                message: "State Body is required!"
            });
            return;
        }

    // State Screen 
        if (req.body.state_screen === 'undefined' || !req.body.state_screen) {
            res.status(400).send({
                message: "State Screen is required!"
            });
            return;
        }

    // Description
        if (req.body.description === 'undefined' || !req.body.description) {
            res.status(400).send({
                message: "Description is required!"
            });
            return;
        }

    // Color
        if (req.body.color === 'undefined' || !req.body.color) {
            res.status(400).send({
                message: "Color is required!"
            });
            return;
        }

    // Age
        if (req.body.age === 'undefined' || !req.body.age) {
            res.status(400).send({
                message: "Age is required!"
            });
            return;
        }
        
        
}

const ResallValidator = {
    checkRequired: checkRequired,
};

module.exports = ResallValidator;