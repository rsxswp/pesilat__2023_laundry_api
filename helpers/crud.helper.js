const response = require("./response.helper");
const validator = require("./validator.helper");

module.exports = {
  create: async (req, res, { model, requestBody, validateSchema }) => {
    try {
      const body = requestBody;

      const validasi = validator(body, validateSchema);

      if (validasi.gagal()) {
        return response(res, 422, {
          errors: validasi.erorrMessages(),
          message: "validation failed",
        });
      }

      const insertData = await model.create(body);

      if (insertData) {
        return response(res, 201, {
          message: "success add",
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
  },
  update: async (
    req,
    res,
    { model, requestBody, validateSchema = {}, keyParam = "id" }
  ) => {
    try {
      const id = req.params[keyParam];
      const dataModel = await model.findByPk(id);

      if (!dataModel) {
        return response(res, 404, { errors: "data not found" });
      }

      const validasi = validator(requestBody, validateSchema);

      if (validasi.gagal()) {
        return response(res, 422, {
          errors: validasi.erorrMessages(),
          message: "validation failed",
        });
      }

      const dataUpdate = dataModel.update(requestBody);
      if (dataUpdate) {
        return response(res, 200, {
          message: "data success updated",
          data: dataModel,
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
  },
  delete: async (req, res, { model, keyParam = "id" }) => {
    try {
      const id = req.params[keyParam];
      const dataModel = await model.findByPk(id);

      if (!dataModel) {
        return response(res, 404, { errors: "data not found" });
      }

      const dataUpdate = dataModel.destroy();
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
  },

  readAll: async (req, res, { model, findQuery = {} }) => {
    try {
      const dataModel = await model.findAll(findQuery);

      if (!dataModel) {
        return response(res, 204, { message: "no content" });
      }

      return response(res, 200, {
        message: "success get all data price list",
        data: dataModel,
      });
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  },

  readOne: async (req, res, { keyParam = "id", model, findQuery = {} }) => {
    try {
      const id = req.params[keyParam];
      const dataModel = await model.findByPk(id, findQuery);

      if (!dataModel) {
        return response(res, 404, { errors: "data not found" });
      }

      return response(res, 200, {
        message: "success get data",
        data: dataModel,
      });
    } catch (e) {
      return response(res, 500, {
        message: "500 internal server error",
        errors: e,
      });
    }
  },
};
