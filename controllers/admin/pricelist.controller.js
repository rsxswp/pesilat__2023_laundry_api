const { response, validator } = require("../../helpers");
const { PriceList } = require("./../../models");

class PricelistController {
  async store(req, res) {
    try {
      const body = {
        namaPaket: req.body?.namaPaket,
        beratGram: req.body?.beratGram ? parseInt(req.body?.beratGram) : null,
        beratKiloGram: req.body?.beratKiloGram
          ? parseInt(req.body?.beratKiloGram)
          : null,
        harga: parseInt(req.body?.harga),
      };

      const validasi = validator(body, {
        namaPaket: {
          type: "string",
        },
        harga: {
          type: "number",
        },
      });

      if (validasi.gagal()) {
        return response(res, 422, {
          errors: validasi.erorrMessages(),
          message: "validation failed",
        });
      }

      const insertData = await PriceList.create(body);

      if (insertData) {
        return response(res, 201, {
          message: "success add price list",
          data: insertData,
        });
      } else {
        return response(res, 500, { errors: "insert failed" });
      }
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const pL = await PriceList.findByPk(id);

      if (!pL) {
        return response(res, 404, { errors: "data not found" });
      }

      const dataUpdate = pL.update(req.body);
      if (dataUpdate) {
        return response(res, 200, {
          message: "data success updated",
          data: pL,
        });
      } else {
        return response(res, 500, { errors: "update failed" });
      }
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  }

  async destroy(req, res) {
    try {
      const id = req.params.id;
      const pL = await PriceList.findByPk(id);

      if (!pL) {
        return response(res, 404, { errors: "data not found" });
      }

      const dataUpdate = pL.destroy();
      if (dataUpdate) {
        return response(res, 200, {
          message: "data success deleted",
        });
      } else {
        return response(res, 500, { errors: "delete failed" });
      }
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  }

  async index(req, res) {
    try {
      const pL = await PriceList.findAll();

      if (!pL) {
        return response(res, 204, { message: "no content" });
      }

      return response(res, 200, {
        message: "success get all data price list",
        data: pL,
      });
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  }
  async show(req, res) {
    try {
      const id = req.params.id;
      const pL = await PriceList.findByPk(id);

      if (!pL) {
        return response(res, 404, { errors: "data not found" });
      }

      return response(res, 200, { message: "success get data", data: pL });
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  }
}

module.exports = new PricelistController();
