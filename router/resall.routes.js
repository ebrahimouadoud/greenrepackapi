const authService = require("../authmiddelwares/AuthService");
const ResallController = require("../Controller/resall.controller");
const ContreOffreController = require("../Controller/contre-offre.controller");
const { ResalValidator } = require("../authmiddelwares");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/resall/create", [authService.verifyToken, ResalValidator.checkRequired], ResallController.createResall);

    app.put("/api/resall/proposal/accept/:id", [authService.verifyToken], ResallController.aceptResall);

    app.put("/api/resall/proposal/refuse/:id", [authService.verifyToken], ResallController.refuseResall);

    app.put("/api/resall/validate/:id", [authService.verifyToken, authService.isManager], ResallController.validateResall);


    app.post("/api/resall/counteroffer/:id", [authService.verifyToken, authService.isManager], ContreOffreController.CreateCO);

    app.put("/api/resall/counteroffer/refuse/:id", [authService.verifyToken], ContreOffreController.RefuseCO);

    app.post("/api/resall/counteroffer/accept/:id", [authService.verifyToken], ContreOffreController.AccepteCO);


};