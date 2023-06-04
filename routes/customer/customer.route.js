module.exports = (app) => {
  app.post("/", async (req, res) => {
    return res.send("ini customer");
  });
  return app;
};
