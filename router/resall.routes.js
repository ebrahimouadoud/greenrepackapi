const authService  = require("../authmiddelwares/AuthService");
const ResallController = require("../Controller/resall.controller");
const { ResalValidator } = require("../authmiddelwares");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/resall/create",[authService.verifyToken], ResallController.createResall);


    app.post("/api/resall/proposal/accept/:id",[authService.verifyToken], ResallController.aceptResall);


    app.post("/api/resall/proposal/refuse/:id",[authService.verifyToken], ResallController.refuseResall);


    app.post("/api/resall/validate/:id",[authService.verifyToken], ResallController.validateResall)

};