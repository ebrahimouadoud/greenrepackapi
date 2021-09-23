const DemandeController = require("../Controller/demande.controller");
const { AssoDemandeValidator } = require("../authmiddelwares");
const authService = require("../authmiddelwares/AuthService");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post( "/api/registerrequist/create", [ AssoDemandeValidator.checkRequired ],  DemandeController.createDemande );
    app.put( "/api/registerrequist/accept/:id",[ authService.verifyToken, authService.isAdmin ], DemandeController.acceptDemande );



};