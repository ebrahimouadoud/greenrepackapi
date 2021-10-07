const authService = require("../authmiddelwares/AuthService");
const depotController = require("../Controller/depots.controller");
const { DepotValidator } = require("../authmiddelwares");



module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get(
    "/api/warehouses/all",
    [
      authService.verifyToken
    ], 
    depotController.getAllDepots
  );
  //getNearWarehouse
  app.get(
    "/api/warehouses/getnear",
    [
      authService.verifyToken
    ], 
    depotController.getNearWarehouse
  );

  app.post(
    "/api/warehouses/new",
    [
      authService.verifyToken,
      authService.isManagerOrAdmin
    ],
    
    depotController.createDepot
  );

  app.delete(
    "/api/warehouses/:id",
    [
      authService.verifyToken,  
    ],
    authService.isManagerOrAdmin,
    depotController.deleteDepot
  );

  app.put(
    "/api/warehouses/:id",
    [
      authService.verifyToken,  
    ],
    authService.isManagerOrAdmin,
    depotController.updateDepot
  );


};