// const { response, crud, register } = require("../../helpers");
const { response, register, crud } = require("../../helpers");
const db = require("./../../models");
class TransaksiController {
  async store(req, res) {
    try {
      const bodyTransaksi = {
        kurirId: null,
        customerId: req.userId,
        karyawanId: null,
        status: "dalam_antrian",
        waktuSelesai: null,
        detailTransaksi: req.detailTransaksi, // is array of object
      };

      return res.send(bodyTransaksi);
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }
  async update(req, res) {
    try {
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }

  async destroy(req, res) {
    try {
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }
  async index(req, res) {
    try {
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }
  async show(req, res) {
    try {
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }
}

module.exports = new TransaksiController();
