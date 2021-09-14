const authService = require("../authmiddelwares/AuthService");
const controller = require("../Controller/user.controller");
const usermanagerController = require("../Controller/user-manager.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authService.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authService.verifyToken, authService.isManager],
    controller.managerBoard
  );

  app.get(
    "/api/user/all",
    [authService.verifyToken, authService.isAdmin || authService.isManager ],
    usermanagerController.getAllUsers
  );
};