"use strict";
const { Model } = require("sequelize");
const { uuidType } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class PriceList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PriceList.init(
    {
      id: uuidType(DataTypes),
      namaPaket: DataTypes.STRING,
      beratGram: DataTypes.INTEGER,
      beratKiloGram: DataTypes.INTEGER,
      harga: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PriceList",
    }
  );
  return PriceList;
};
