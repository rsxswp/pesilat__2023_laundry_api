const adminController = require("../../controllers/admin/admin.controller");
const { nextRequest } = require("../../helpers");
const loginMiddleware = require("../../middleware/login.middleware");
const registerMiddleware = require("../../middleware/register.middleware");

module.exports = (app, { argumenRouter }) => {
  const { admin, isLogin } = argumenRouter;
  const middleware =
    admin && isLogin ? [loginMiddleware.isTrue, loginMiddleware.isAdmin] : [];

  app.post("/", middleware, adminController.customer().storeOnlyCustomer);

  app.post(
    "/with-register",
    [loginMiddleware.isTrue, registerMiddleware.checkDuplicateUserNameOrEmail],
    adminController.customer().storeWithUser
  );
  return app;
};
