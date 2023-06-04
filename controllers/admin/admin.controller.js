const customerController = require("./customer.controller");
const pricelistController = require("./pricelist.controller");

class AdminController {
  priceList() {
    return {
      store: (req, res) => {
        return pricelistController.store(req, res);
      },
      update: async (req, res) => {
        return pricelistController.update(req, res);
      },
      destroy: async (req, res) => {
        return pricelistController.destroy(req, res);
      },
      index: async (req, res) => {
        return pricelistController.index(req, res);
      },
      show: async (req, res) => {
        return pricelistController.show(req, res);
      },
    };
  }

  customer() {
    return {
      store: (req, res) => {
        return customerController.store(req, res);
      },
      update: async (req, res) => {
        return customerController.update(req, res);
      },
      destroy: async (req, res) => {
        return customerController.destroy(req, res);
      },
      index: async (req, res) => {
        return customerController.index(req, res);
      },
      show: async (req, res) => {
        return customerController.show(req, res);
      },
    };
  }
}

module.exports = new AdminController();
