const { Op } = require("sequelize");
const {
  response,
  register,
  crud,
  dataModelToObject,
} = require("../../helpers");
const { Transaksi, DetailTransaksi, PriceList } = require("./../../models");
class TransaksiController {
  async update(req, res) {
    try {
      return await crud.update(req, res, {
        model: Transaksi,
        requestBody: {
          status: req.body.status,
          kurirId: req.body?.kurirId === "me" ? req.userId : req.body?.kurirId, // as a karyawan
          waktuSelesai: req.body.status === "selesai" ? new Date() : null,
        },
      });
    } catch (e) {
      console.log(">>> err = ", e);
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }

  async destroy(req, res) {
    try {
      // return res.send("destroy tra");
      const findTra = await Transaksi.findByPk(req.params.id);
      if (!findTra) {
        return response(res, 404, {
          message: "data not found",
          errors: "data not found",
        });
      }

      const hapusTra = await findTra.destroy();
      if (hapusTra) {
        return response(res, 200, { message: "success delete data" });
      } else {
        return response(res, 500, {
          errors: "500 internal server error",
          message: "fail delete data",
        });
      }

      // return await crud.delete(req, res, { model: Transaksi });
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }

  async index(req, res) {
    try {
      const dataTra = await crud.readAllReturnObject(req, res, {
        model: Transaksi,
        findQuery: {
          include: {
            model: DetailTransaksi,
            include: {
              model: PriceList,
            },
          },
        },
      });

      const dataTraObject = dataModelToObject(dataTra.data)
        .get()
        .map((tra, key) => {
          let totalPerTra = 0;
          tra.DetailTransaksis.map((detailTra, key) => {
            totalPerTra += detailTra.subTotal;
          });
          tra.total = totalPerTra;
          return tra;
        });

      return response(res, dataTra.statusCode, {
        message: dataTra.message,
        data: dataTraObject,
      });
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }
  async show(req, res) {
    try {
      const findTraFromDB = await Transaksi.findAll({
        where: {
          id: req.params.id,
        },
        include: {
          model: DetailTransaksi,
          include: {
            model: PriceList,
          },
        },
      });

      // mengubah menjadi object biasa

      const findTra = dataModelToObject(findTraFromDB).first(); // merubah menjadi object biasa

      if (!findTra) {
        return response(res, 404, { errors: "data not found" });
      }

      if (findTra.customerId !== req.userId) {
        return response(res, 403, {
          message: "forbidden access",
          errors: "forbidden",
        });
      }

      let total = 0;

      for (const tra of findTra.DetailTransaksis) {
        total += tra.subTotal;
      }

      findTra.total = total;

      return response(res, 200, { message: "success get data", data: findTra });
    } catch (e) {
      console.log(">>> ERR = ", e);
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }
}

module.exports = new TransaksiController();
