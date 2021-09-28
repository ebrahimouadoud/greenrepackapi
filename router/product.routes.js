const authService = require("../authmiddelwares/AuthService");
const productController = require("../Controller/product.controller");
const { ProductValidator } = require("../authmiddelwares");


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
      authService.isManagerOrAdmin
    ],
    productController.notiyArrival
  );

  app.put("/api/product/return/:id",
    [
      authService.verifyToken,
      authService.isManager
    ],
    productController.returnProduct
  );

  app.post("/api/product/sale/:id",
    [
      authService.verifyToken,
      authService.isManager
    ],
    productController.saleProduct
  );

  app.put("/api/product/:id",
    [
      authService.verifyToken,
      authService.isManager,
      ProductValidator.checkRequired
    ],
    productController.updateProduct
  );

};

