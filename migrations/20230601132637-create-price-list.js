"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PriceLists", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      namaPaket: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      beratGram: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      beratKiloGram: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
