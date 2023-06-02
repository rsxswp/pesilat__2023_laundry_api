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
  return Transaksi;
};
