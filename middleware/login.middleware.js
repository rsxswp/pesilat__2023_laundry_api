const configApp = require("../config/configApp");
const { response } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("./../models");
const db = require("./../models");

class LoginMiddleware {
  async isTrue(req, res, next) {
    try {
      let tokenHeader = req.headers["authorization"];

      if (!tokenHeader) {
        return response(res, 401, {
          errors: "unauthorized",
          message: "token is required",
        });
      }

      if (tokenHeader.split(" ")[0] !== "Bearer") {
        return response(res, 422, {
          message: "token not equal Bearer",
          errors: "token must be a bearer",
        });
      }

      let token = tokenHeader.split(" ")[1];

      if (!token) {
        return response(res, 422, { errors: "no token provided" });
      }

      jwt.verify(token, configApp.jwtSecret, async (err, decoded) => {
        if (err) {
          return response(res, 401, {
            message: "token is invalid",
            errors: err,
          });
        }
        req.userId = decoded.id;
        // req.transaction = await db.sequelize.transaction();
        req.user = async () => {
          const user = await User.findOne({
            where: {
              id: decoded.id,
            },
            include: "Roles",
          });

          return user;
        };
        next();
      });
    } catch (e) {
      return response(res, 500, { errors: "500 internal server erorr" });
    }
  }

  async isAdmin(req, res, next) {
    try {
      return User.cekRole({ role: "ADMIN", req, res, next });
    } catch (e) {
      return response(res, 500, { errors: "500 internal server erorr" });
    }
  }

  async isKaryawan(req, res, next) {
    try {
      return User.cekRole({ role: "KARYAWAN", req, res, next });
    } catch (e) {
      return response(res, 500, { errors: "500 internal server erorr" });
    }
  }

  async isCustomer(req, res, next) {
    try {
      return User.cekRole({ role: "CUSTOMER", req, res, next });
    } catch (e) {
      return response(res, 500, { errors: "500 internal server erorr" });
    }
  }
}

module.exports = new LoginMiddleware();
