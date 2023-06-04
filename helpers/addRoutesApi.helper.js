const express = require("express");

const addRoutesApi = (prefixPath, routePath, app) => {
  const prefixCustomer = express.Router();
  const router = express.Router();

  if (routePath) {
    const routeTarget = routePath(router);
    prefixCustomer.use(prefixPath, routeTarget);
  } else {
    prefixCustomer.use(prefixPath, (req, res, next) => {
      next();
    });
  }

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
