const authService = require("../authmiddelwares/AuthService");
const brandsController = require("../Controller/brands.controller");
const { BrandValidator } = require("../authmiddelwares");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/brand/all",[authService.verifyToken], brandsController.getAllBrands
  );

  app.post(
    "/api/brand/new",
    [
      authService.verifyToken,  
      (authService.isAdmin || authService.isManager),
      BrandValidator.checkDuplicateBrandName
    ], 
    brandsController.createBrand
  );

  app.delete(
    "/api/brand/:id",
    [
      authService.verifyToken,  
      (authService.isAdmin || authService.isManager),
    ], 
    brandsController.deleteBrand
  );


};