const customerController = require("../../controllers/customer/customer.controller");
const { nextRequest } = require("../../helpers");
const loginMiddleware = require("../../middleware/login.middleware");
const registerMiddleware = require("../../middleware/register.middleware");

module.exports = (app, { argumenRouter }) => {
  app.post(
    "/",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    customerController.transaksi().store
  );

  app.put(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    customerController.transaksi().update
  );

  app.get(
    "/",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    customerController.transaksi().index
  );

  app.get(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    customerController.transaksi().show
  );

  app.delete(
    "/:id",
    [loginMiddleware.isTrue, loginMiddleware.isCustomer],
    customerController.transaksi().destroy
  );

  return app;
};
