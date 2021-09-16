const authService = require("../authmiddelwares/AuthService");
const typesController = require("../Controller/types.controller");
const { TypeValidator } = require("../authmiddelwares");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/categories/all", typesController.getAllCategorie
  );

  app.post(
    "/api/categories/new",
    [
      authService.verifyToken,  
      (authService.isAdmin ,authService.isManager),
      TypeValidator.checkDuplicateTypeName
    ], 
    typesController.createType
  );

  app.delete(
    "/api/categories/:id",
    [
      authService.verifyToken,  
      (authService.isAdmin ,authService.isManager),
    ], 
    typesController.deleteType
  );


};