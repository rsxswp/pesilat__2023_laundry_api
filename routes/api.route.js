const { addRoutesApi } = require("../helpers");

module.exports = (app) => {
  addRoutesApi("/customer", require("./customer.route"), app).group(
    (customer) =>
      customer
        .addRoutesApi("/admin", require("./admin.route"))
        .group((admin) =>
          admin.addRoutesApi("/karyawan", require("./karyawan.route"))
        )
  );
};
