const authService = require("../authmiddelwares/AuthService");
const modeleController = require("../Controller/modele.controller");
const { ModeleValidator } = require("../authmiddelwares");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/model/all", modeleController.getAllModeles
  );

  app.post(
    "/api/model/new",
    [
      authService.verifyToken,  
      authService.isAdmin, 
      ModeleValidator.checkDuplicateModeleName
    ], 
    modeleController.createModele
  );

//   app.delete(
//     "/api/model/:id",
//     [
//       authService.verifyToken,  
//       authService.isAdmin
//     ], 
//     modeleController.createModele
//   );


};