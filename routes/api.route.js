const { addRoutesApi } = require("../helpers");

module.exports = (app) => {
  // auth
  addRoutesApi("/auth", require("./auth.route"), app);

  // admin
  addRoutesApi("/admin", null, app).group((admin) => {
    admin.addRoutesApi("/price-list", require("./admin/priceList.route"));
    admin.addRoutesApi("/customer", require("./customer/customer.route"), {
      argumenRouter: {
        admin: true,
        isLogin: true,
      },
    });
  });

  addRoutesApi("/customer", null, app).group((customer) => {
    customer.addRoutesApi("/transaksi", require("./customer/transaksi.route"));
  });
};
