"use strict";
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");
const { uuidType, response } = require("../helpers");
const configApp = require("../config/configApp");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static generateToken(payload, expiresIn = 86400) {
      var token =
        "Bearer " +
        jwt.sign(payload, configApp.jwtSecret, {
          expiresIn, // by default 24 jam
        });

      return token;
    }

    static async cekRole({ role, req, res = null, next = null }) {
      try {
        const user = await req.user();
        const roles = user.Roles;
        let isRole = false;
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === role) {
            isRole = true;
          }
        }

        if (!res && !next) {
          return isRole;
        }

        return isRole
          ? next()
          : response(res, 403, {
              errors: "forbidden access",
              message: `role ${role} is required`,
            });
      } catch (e) {
        throw e;
      }
    }

    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: "UserRoles",
        foreignKey: "userId",
        otherKey: "roleId",
      });
    }
  }
  User.init(
    {
      id: uuidType(DataTypes),
      username: DataTypes.STRING,
      namaLengkap: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
