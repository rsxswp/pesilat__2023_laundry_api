const { addRoutesApi } = require("../helpers");

module.exports = (app) => {
  // auth
  addRoutesApi("/auth", require("./auth.route"), app);

  // admin
  addRoutesApi("/admin", null, app).group((admin) => {
    admin.addRoutesApi("/price-list", require("./admin/priceList.route"));
  });
};
