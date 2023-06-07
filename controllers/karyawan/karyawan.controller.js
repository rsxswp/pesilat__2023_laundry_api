const customerController = require("./customer.controller");
const pricelistController = require("./pricelist.controller");

class KaryawanController {
  transaksi() {
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
}

module.exports = new KaryawanController();
