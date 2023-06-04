const { Op } = require("sequelize");
const { response } = require("../helpers");
const { User } = require("./../models");

class RegisterMiddleware {
  async checkDuplicateUserNameOrEmail(req, res, next) {
    try {
      const username = req.body?.username ? req.body?.username : "";
      const email = req.body?.email ? req.body?.email : "";
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (user) {
        if (username) {
          return response(res, 422, { errors: "username is already use" });
        }
        if (email) {
          return response(res, 422, { errors: "email is already use" });
        }
      }

      next();
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  }
}

module.exports = new RegisterMiddleware();
