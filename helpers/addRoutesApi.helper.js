const express = require("express");

const addRoutesApi = (prefixPath, routePath, app) => {
  const prefixCustomer = express.Router();
  const router = express.Router();
  const routeTarget = routePath(router);
  prefixCustomer.use(prefixPath, routeTarget);
  app.use("/api", prefixCustomer);

  return {
    group: (callback) => {
      callback({
        addRoutesApi: (nextPath, nextRoutePath) =>
          addRoutesApi(prefixPath + nextPath, nextRoutePath, app),
      });
    },
  };
};

module.exports = addRoutesApi;
