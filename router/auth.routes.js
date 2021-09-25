const { SignupValidator } = require("../authmiddelwares");
const authController = require("../Controller/auth.controller");
const { UserValidator } = require("../authmiddelwares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/auth/signup",
      [
        UserValidator.userSignupValidator,
        SignupValidator.checkDuplicateUsernameOrEmail,
        SignupValidator.checkRolesExisted
      ],
      authController.signup
    );
  
    app.post("/api/auth/signin", authController.signin);
    app.get("/api/auth/me", authController.getUserByToken)
    app.get("/api/auth/validate/:confirmationCode", 
    authController.userValidator)
  };