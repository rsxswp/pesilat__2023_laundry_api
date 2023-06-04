"use strict";

const { uuidType } = require("../helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PriceLists", {
      id: uuidType(Sequelize),
      namaPaket: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      beratGram: {
        type: Sequelize.INTEGER,
      },
      beratKiloGram: {
        type: Sequelize.INTEGER,
      },
      harga: {
        allowNull: false,
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
    await queryInterface.dropTable("PriceLists");
  },
};
