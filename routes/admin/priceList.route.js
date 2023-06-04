const adminController = require("../../controllers/admin/admin.controller");
const loginMiddleware = require("../../middleware/login.middleware");

module.exports = (app) => {
  app.get(
    "/",
    [loginMiddleware.isTrue, loginMiddleware.isAdmin],
    adminController.priceList().index
  );

  app.post(
    "/",
    [loginMiddleware.isTrue, loginMiddleware.isAdmin],
    adminController.priceList().store
  );

  app.put(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isAdmin],
    adminController.priceList().update
  );

  app.delete(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isAdmin],
    adminController.priceList().destroy
  );

  app.get(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isAdmin],
    adminController.priceList().show
  );

  return app;
};
