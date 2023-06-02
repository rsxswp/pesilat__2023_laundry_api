"use strict";

const { uuidType } = require("../helpers");

/** @type {import('sequelize-cli').Migration} */
// const {uuidType} = req
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaksis", {
      id: uuidType(Sequelize),
      kurirId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      customerId: {
        type: Sequelize.UUID,
        references: {
          model: "Customers",
          key: "id",
        },
        allowNull: false,
      },
      karyawanId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          "dalam_antrian",
          "dikerjakan",
          "selesai",
          "sudah_diambil"
        ),
        defaultValue: "dalam_antrian",
        allowNull: false,
      },
      waktuSelesai: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Transaksis");
  },
};
