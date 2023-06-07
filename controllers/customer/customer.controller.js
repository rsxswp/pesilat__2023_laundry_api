const transaksiController = require("./transaksi.controller");

class CustomerController {
  transaksi() {
    return {
      store: (req, res) => {
        return transaksiController.store(req, res);
      },
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

module.exports = new CustomerController();
