"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuditLog.init(
    {
      model: DataTypes.STRING,
      tableName: DataTypes.STRING,
      query: DataTypes.STRING,
      userId: DataTypes.UUID,
      data: DataTypes.JSON,
      hookName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AuditLog",
    }
  );
  return AuditLog;
};
