"use strict";

const { uuidType } = require("../helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Customers", {
      namaLengkap: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id: uuidType(Sequelize),
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      noTelp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adminId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: true, // karna customer bisa di inputkan oleh admin / karyawan
        onUpdate: "CASCADE",
      },
      customerId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false, // karna customer bisa di inputkan oleh admin / karyawan
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Customers");
  },
};
