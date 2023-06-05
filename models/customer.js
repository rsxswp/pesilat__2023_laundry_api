"use strict";
const { Model } = require("sequelize");
const { uuidType } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      id: uuidType(DataTypes),
      namaLengkap: DataTypes.STRING,
      alamat: DataTypes.TEXT,
      noTelp: DataTypes.STRING,
      adminId: DataTypes.UUID,
      customerId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
