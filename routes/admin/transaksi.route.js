const adminController = require("../../controllers/admin/admin.controller");
const { nextRequest } = require("../../helpers");
const loginMiddleware = require("../../middleware/login.middleware");
const registerMiddleware = require("../../middleware/register.middleware");

module.exports = (app, { argumenRouter }) => {
  app.put(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    adminController.transaksi().update
  );

  app.get(
    "/",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    adminController.transaksi().index
  );

  app.get(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    adminController.transaksi().show
  );

  app.delete(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    adminController.transaksi().destroy
  );

  return app;
};
