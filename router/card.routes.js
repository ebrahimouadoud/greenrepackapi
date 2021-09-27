const authService = require("../authmiddelwares/AuthService");
const cardController = require("../Controller/card.controller");



module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post(
    "/api/card/:id", [authService.verifyToken], cardController.addToCard
  );

  app.post(
    "/api/orders/create",
    [
      authService.verifyToken,
    ],
    cardController.CreateOrder
  );

  app.get(
    "/api/orders/me",
    [
      authService.verifyToken,
    ],
    cardController.GetMyOrders
  );

  app.get(
    "/api/orders",
    [
      authService.verifyToken,
    ],
    cardController.GetAllOrders
  );

  app.put(
    "/api/orders/send/:id",
    [
      authService.verifyToken,
      authService.isManagerOrAdmin,
    ],
    cardController.SendOrderManager
  );


};