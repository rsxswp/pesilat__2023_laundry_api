const { Op } = require("sequelize");
const { validator, response, register } = require("./../helpers");
const { Role, User } = require("./../models");
const bcrypt = require("bcryptjs");

class AuthController {
  async register(req, res) {
    try {
      // return res.send("regis method");
      // console.log(">>> ROLES CONTROLLER = ", req.body.roles);
      const dataRegister = await register(req, res, req.body.roles, {
        model: [User, Role],
      });

      return response(res, dataRegister.statusCode, {
        data: dataRegister.data,
        errors: dataRegister.errors,
        message: dataRegister.message,
      });
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }

  async login(req, res) {
    try {
      const dataLogin = {
        email: req.body?.email ? req.body?.email : "",
        username: req.body?.username ? req.body?.username : "",
        password: req.body?.password,
      };

      const validasi = validator(dataLogin, {
        password: { type: "string" },
      });

      if (validasi.gagal()) {
        return response(res, 422, {
          message: "validation failed",
          errors: validasi.erorrMessages(),
        });
      }

      if (!dataLogin.username && !dataLogin.email) {
        return response(res, 422, {
          message: "validation failed",
          errors: "email or username is reqiuired",
        });
      }

      const findUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: dataLogin.username },
            { email: dataLogin.email },
          ],
        },
      });

      //   jika user tidak ditemukan
      if (!findUser) {
        return response(res, 404, {
          message: "user is not found",
          errors: "user is not found",
        });
      }

      const passwordValid = bcrypt.compareSync(
        dataLogin.password,
        findUser.password
      );

      if (!passwordValid) {
        return response(res, 401, {
          message: "unauthorized",
          errors: "password is incorrects",
        });
      }
      const dataUser = {
        id: findUser.id,
        username: findUser.username,
        namaLengkap: findUser.namaLengkap,
        email: findUser.email,
      };

      const token = await User.generateToken(dataUser);

      return response(res, 200, {
        message: "success login",
        data: {
          accessToken: token,
          user: dataUser,
        },
      });
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }
}

module.exports = new AuthController();
