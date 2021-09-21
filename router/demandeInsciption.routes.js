const DemandeController = require("../Controller/demande.controller");
const { ProjectValidator } = require("../authmiddelwares");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post
    (
        "/api/registerrequist/create", 
    [
        ProjectValidator.checkRequired
    ], 
        DemandeController.createDemande
    );



};