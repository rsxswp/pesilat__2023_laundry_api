const { Op } = require("sequelize");
const { validator, response } = require("./../helpers");
const { Role, User } = require("./../models");
const bcrypt = require("bcryptjs");
const configApp = require("../config/configApp");

class AuthController {
  async register(req, res) {
    try {
      const dataRegister = {
        namaLengkap: req.body?.namaLengkap,
        email: req.body?.email,
        username: req.body?.username,
        password: req.body?.password,
        roles: req.body?.roles,
      };

      const validasi = validator(dataRegister, {
        namaLengkap: {
          type: "string",
        },
        password: {
          type: "string",
        },
        roles: {
          type: "array",
        },
      });

      // jika validasi gagal
      if (validasi.gagal()) {
        return response(res, 422, {
          message: "validation failed",
          errors: validasi.erorrMessages(),
        });
      }

      // jika tidak memasukan body email dan username
      if (!dataRegister.username && !dataRegister.email) {
        return response(res, 422, {
          message: "validation failed",
          errors: "email or username is reqiuired",
        });
      }

      //   mencari role
      const findRole = await Role.findAll({
        where: {
          name: {
            [Op.or]: dataRegister.roles,
          },
        },
      });

      if (findRole.length <= 0) {
        return response(res, 404, { errors: "role is not found" });
      }

      const insertUser = await User.create({
        username: dataRegister?.username ? dataRegister?.username : null,
        email: dataRegister?.email ? dataRegister?.email : null,
        namaLengkap: dataRegister.namaLengkap,
        password: bcrypt.hashSync(dataRegister.password, 8),
      });

      if (!insertUser) {
        return response(res, 500, {
          errors: "500 inertnal server error",
          message: "insert user is invalid",
        });
      }

      const insertUserRole = await insertUser.setRoles(findRole);

      if (insertUserRole) {
        return response(res, 200, { message: "success register" });
      } else if (!insertUserRole) {
        return response(res, 500, {
          message: "insert user role is invalid",
          errors: "500 internal server error",
        });
      }

      return response(res, 204, {
        message: "ok, but nothing changes",
        data: findRole,
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
