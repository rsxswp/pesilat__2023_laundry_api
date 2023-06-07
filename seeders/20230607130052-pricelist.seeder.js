"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("PriceLists", [
      {
        id: "fdade816-8727-41f6-a295-239b4e4d2f5a",
        namaPaket: "CUCI 1 KG",
        beratGram: 1000,
        beratKiloGram: 1,
        harga: 10_000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "49db2e1b-6c7f-45d1-9de4-1e55b20863f7",
        namaPaket: "CUCI 1 KG + SETRIKA",
        beratGram: 1000,
        beratKiloGram: 1,
        harga: 15_000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a3cfad33-94f6-4e0f-8d52-610b46c7743a",
        namaPaket: "CUCI 1 KG + SETRIKA + PEWANGI PILIHAN",
        beratGram: 1000,
        beratKiloGram: 1,
        harga: 20_000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b2a6e7ef-80f3-47f0-a156-42a3e34ed333",
        namaPaket: "ANTAR SAMPAI RUMAH",
        harga: 10_000,
        beratGram: null,
        beratKiloGram: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
