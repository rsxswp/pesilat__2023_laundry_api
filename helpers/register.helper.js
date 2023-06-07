const { Op } = require("sequelize");
const validator = require("./validator.helper");
const bcrypt = require("bcryptjs");
const { responseObject } = require("./response.helper");
const db = require("../models");

const response = responseObject;

const register = async (req, res, roles, { model }) => {
  try {
    const [User, Role] = model;
    const dataRegister = {
      namaLengkap: req.body?.namaLengkap,
      email: req.body?.email,
      username: req.body?.username,
      password: req.body?.password,
      roles,
    };

    const validasi = validator(dataRegister, {
      namaLengkap: {
        type: "string",
      },
      password: {
        type: "string",
        min: 8,
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
      return response(res, 200, {
        message: "success register",
        data: insertUser,
      });
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
    console.log(">> err regis = ", e);
    // throw e;
  }
};

module.exports = register;
