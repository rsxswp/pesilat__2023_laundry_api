const customerController = require("./customer.controller");
const pricelistController = require("./pricelist.controller");
const transaksiController = require("./transaksi.controller");

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
      storeOnlyCustomer: (req, res) => {
        return customerController.storeOnlyCustomer(req, res);
      },
      storeWithUser: (req, res) => {
        return customerController.storeWithUser(req, res);
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

  transaksi() {
    return {
      update: async (req, res) => {
        return transaksiController.update(req, res);
      },
      destroy: async (req, res) => {
        return transaksiController.destroy(req, res);
      },
      index: async (req, res) => {
        return transaksiController.index(req, res);
      },
      show: async (req, res) => {
        return transaksiController.show(req, res);
      },
    };
  }
}

module.exports = new AdminController();
