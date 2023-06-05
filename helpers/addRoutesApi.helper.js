const express = require("express");

const addRoutesApi = (prefixPath, routePath, app, argumenRouter = {}) => {
  const prefixCustomer = express.Router();
  const router = express.Router();

  if (routePath) {
    const routeTarget =
      argumenRouter === {}
        ? routePath(router)
        : routePath(router, argumenRouter);
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
        addRoutesApi: (nextPath, nextRoutePath, nextRouterArgumens) => {
          addRoutesApi(
            prefixPath + nextPath,
            nextRoutePath,
            app,
            nextRouterArgumens
          );
        },
      });
    },
  };
};

module.exports = addRoutesApi;
