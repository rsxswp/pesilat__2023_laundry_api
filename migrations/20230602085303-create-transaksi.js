"use strict";

/** @type {import('sequelize-cli').Migration} */
// const {uuidType} = req
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transaksis", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      kurirId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: true,
      },
      customerId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      karyawanId: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: true,
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
        allowNull: true,
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
