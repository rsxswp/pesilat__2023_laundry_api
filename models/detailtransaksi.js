"use strict";
const { Model } = require("sequelize");
const { uuidType } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class DetailTransaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailTransaksi.belongsTo(models.PriceList, {
        foreignKey: "orderId",
        targetKey: "id",
      });
    }
  }
  DetailTransaksi.init(
    {
      id: uuidType(DataTypes),
      transaksiId: DataTypes.UUID,
      orderId: DataTypes.UUID,
      qty: DataTypes.INTEGER,
      subTotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailTransaksi",
    }
  );
  return DetailTransaksi;
};
