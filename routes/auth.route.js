const authController = require("../controllers/auth.controller");
const registerMiddleware = require("../middleware/register.middleware");

module.exports = (app) => {
  app.post("/login", authController.login);

  app.post(
    "/register",
    registerMiddleware.checkDuplicateUserNameOrEmail,
    authController.register
  );
  return app;
};
