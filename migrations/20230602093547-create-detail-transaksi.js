"use strict";

const { uuidType } = require("../helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DetailTransaksis", {
      id: uuidType(Sequelize),
      transaksiId: {
        type: Sequelize.UUID,
        references: {
          model: "Transaksis",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "PriceLists",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      qty: {
        type: Sequelize.INTEGER,
      },
      subTotal: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DetailTransaksis");
  },
};
