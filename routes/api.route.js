const { addRouteApi } = require("../helpers");

module.exports = (app) => {
  const customer = addRouteApi("/customer", require("./customer.route"), app);
  const transaksi = customer("/transaksi", require("./admin.route"));
  const detailtransaksi = transaksi("/detail", require("./karyawan.route"));
};
