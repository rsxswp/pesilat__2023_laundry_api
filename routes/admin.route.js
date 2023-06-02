module.exports = (app) => {
  app.post("/", async (req, res) => {
    return res.send("admin");
  });
  return app;
};
