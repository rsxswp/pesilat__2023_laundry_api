module.exports = (app) => {
  app.post("/", async (req, res) => {
    return res.send("ini adalah transaksi guysyaaaa");
  });
  return app;
};
