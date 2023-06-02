const express = require("express");

const addRouteApi = (prefixPath, routePath, app) => {
  const prefixCustomer = express.Router();
  const router = express.Router();
  const routeTarget = routePath(router);
  prefixCustomer.use(prefixPath, routeTarget);
  app.use("/api", prefixCustomer);

  return (nextPath, nextRoutePath) => {
    return addRouteApi(prefixPath + nextPath, nextRoutePath, app);
  };
};

module.exports = addRouteApi;
