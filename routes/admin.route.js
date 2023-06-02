module.exports = (app) => {
  app.post("/", async (req, res) => {
    return res.send("ini admin");
  });
  return app;
};
