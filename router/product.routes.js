const authService = require("../authmiddelwares/AuthService");
const productController = require("../Controller/product.controller");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/products/all",
    [
      authService.verifyToken,
    ], 
    productController.getAllProducts
  );

  app.post("/api/product/notifyarrival/:id",
  [
    authService.verifyToken,
    authService.isManager
  ], productController.notiyArrival 
  )

};

