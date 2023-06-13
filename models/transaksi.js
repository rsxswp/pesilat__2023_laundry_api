"use strict";
const { Model } = require("sequelize");
const { uuidType } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaksi.hasMany(models.DetailTransaksi, {
        foreignKey: "transaksiId",
      });
    }
  }
  Transaksi.init(
    {
      id: uuidType(DataTypes),
      kurirId: DataTypes.STRING,
      customerId: DataTypes.STRING,
      karyawanId: DataTypes.STRING,
      status: DataTypes.STRING,
      waktuSelesai: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Transaksi",
    }
  );

  Transaksi.afterCreate(async (tra, options) => {
    await sequelize.models.AuditLog.create({
      model: __dirname + __filename,
      tableName: Transaksi.getTableName(),
      userId: global.userId,
      query: "INSERT",
      data: tra.toJSON(),
      hookName: "afterCreate",
    });
  });

  Transaksi.afterDestroy(async (tra, options) => {
    await sequelize.models.AuditLog.create({
      model: __dirname + __filename,
      tableName: Transaksi.getTableName(),
      userId: global.userId,
      query: "DELETE",
      data: tra.toJSON(),
      hookName: "afterDestroy",
    });
  });

  Transaksi.afterUpdate(async (tra, options) => {
    await sequelize.models.AuditLog.create({
      model: __dirname + __filename,
      tableName: Transaksi.getTableName(),
      userId: global.userId,
      query: "UPDATE",
      data: tra.toJSON(),
      hookName: "afterUpdate",
    });
  });

  return Transaksi;
};
