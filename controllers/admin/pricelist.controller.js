const { response, validator, crud } = require("../../helpers");
const { PriceList } = require("./../../models");

class PricelistController {
  async store(req, res) {
    return await crud.create(req, res, {
      model: PriceList,
      requestBody: req.body,
      validateSchema: {
        namaPaket: {
          type: "string",
        },
        harga: {
          type: "string",
        },
      },
    });
  }

  async update(req, res) {
    return await crud.update(req, res, {
      model: PriceList,
      requestBody: req.body,
    });
  }

  async destroy(req, res) {
    return await crud.delete(req, res, PriceList);
  }

  async index(req, res) {
    return await crud.readAll(req, res, { model: PriceList });
  }

  async show(req, res) {
    return await crud.readOne(req, res, { model: PriceList });
  }
}

module.exports = new PricelistController();
