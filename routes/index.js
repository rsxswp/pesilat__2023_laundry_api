module.exports = (app) => {
  require("./admin.route")(app);
  require("./customer.route")(app);
  require("./karyawan.route")(app);
};
