const authService = require("../authmiddelwares/AuthService");
const { SignupValidator, UserValidator } = require("../authmiddelwares");
const controller = require("../Controller/user.controller");
const usermanagerController = require("../Controller/user-manager.controller");
const authController = require("../Controller/auth.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users/all",
    [authService.verifyToken,  authService.isAdmin],
    usermanagerController.getAllUsers
  );

  app.get(
    "/api/user/:id",
    [authService.verifyToken, authService.isManagerOrAdmin],
    usermanagerController.getUserById
  );

  app.get(
    "/api/checkadresse",
    [ authService.verifyToken ],
    usermanagerController.checkAdress
  );

  app.get( "/api/mybalance", [authService.verifyToken ], usermanagerController.getMyBalance );

  app.post(
    "/api/user",
    [
      UserValidator.userCreateValidator,
      SignupValidator.checkDuplicateUsernameOrEmail,
      authService.verifyToken,
      authService.isAdmin
  ],
      usermanagerController.createUser,
      
  );

  app.put(
    "/api/user/:id",
    [
      UserValidator.userUpdateValidator,
      authService.verifyToken, 
      authService.isAdmin,
    ],
      usermanagerController.updateUser
  );

  app.put(
    "/api/user/toggleActivation/:id",
    [authService.verifyToken, authService.isAdmin], 
    usermanagerController.toggleActivation
  );

  app.put(
    "/api/setadress",
    [authService.verifyToken], 
    usermanagerController.setAdresse
  );

  app.delete(
    "/api/user/:id",
    [authService.verifyToken, authService.isAdmin],
    usermanagerController.deleteUserById
  );


};