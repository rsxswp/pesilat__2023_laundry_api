const { Op } = require("sequelize");
const { response, register, crud } = require("../../helpers");
const { Transaksi, DetailTransaksi, PriceList } = require("./../../models");
class TransaksiController {
  async store(req, res) {
    try {
      const detailTransaksi = req.body.detailTransaksi; // is array of object ( dan bisa langsung diolah tanpa parse json )
      //   return res.send(detailTransaksi);
      const findPL = await PriceList.findAll({
        where: {
          id: {
            [Op.or]: detailTransaksi.map((item, key) => {
              return item.orderId;
            }),
          },
        },
      });

      const dataPL = {};

      findPL.forEach((item) => {
        dataPL[item.id] = item;
      });

      //   return res.send(dataPL);
      const bodyTransaksi = {
        kurirId: null,
        customerId: req.userId,
        karyawanId: null,
        status: "dalam_antrian",
        waktuSelesai: null,
      };

      const insertTransaksi = await crud.createReturnObject(req, res, {
        model: Transaksi,
        requestBody: bodyTransaksi,
        validateSchema: {
          customerId: {
            type: "string",
          },
          status: {
            type: "string",
          },
        },
        returnJson: false,
      });

      if (!insertTransaksi.statusBoolean) {
        return response(res, insertTransaksi.statusCode, {
          message: insertTransaksi.message,
          data: insertTransaksi.data,
          errors: insertTransaksi.errors,
        });
      }

      for (let i = 0; i < detailTransaksi.length; i++) {
        const bodyDetailTransaksi = {
          transaksiId: insertTransaksi.data.id,
          orderId: detailTransaksi[i].orderId,
          qty: detailTransaksi[i].qty,
          subTotal:
            detailTransaksi[i].qty * dataPL[detailTransaksi[i].orderId].harga,
        };

        // return res.send(bodyDetailTransaksi);
        const insertDetailTransaksi = await crud.createReturnObject(req, res, {
          model: DetailTransaksi,
          requestBody: bodyDetailTransaksi,
          validateSchema: {
            transaksiId: {
              type: "string",
            },
            orderId: {
              type: "string",
            },
            qty: {
              type: "number",
            },
            subTotal: {
              type: "number",
            },
          },
        });

        if (!insertDetailTransaksi.statusBoolean) {
          return response(res, insertDetailTransaksi.statusCode, {
            message: insertDetailTransaksi.message,
            errors: insertDetailTransaksi.errors,
          });
        }
      }

      return response(res, insertTransaksi.statusCode, {
        message: insertTransaksi.message,
        data: insertTransaksi.data,
        errors: insertTransaksi.errors,
      });
    } catch (e) {
      console.log(">>> err di store transaksi customer", e);
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }

  async update(req, res) {
    try {
      const bodyDetailTransaksi = req.body.detailTransaksi;
      const findPL = await Transaksi.findByPk(req.params.id, {
        include: {
          model: DetailTransaksi,
          include: {
            model: PriceList,
          },
        },
      });

      if (findPL.status !== "dalam_antrian") {
        return response(res, 400, {
          errors: "fail to update when status not dalam_antrian",
        });
      }

      if (findPL.customerId !== req.userId) {
        return response(res, 403, { errors: "forbidden access" });
      }

      const dataDetailTra = {};

      for (const item of findPL.DetailTransaksis) {
        dataDetailTra[item.id] = item;
      }

      for (const item of bodyDetailTransaksi) {
        if (!dataDetailTra[item.id]) {
          return response(res, 404, {
            errors: "data not found when id = " + item.id,
          });
        }
      }

      for (const item of bodyDetailTransaksi) {
        const findDetailTra = await DetailTransaksi.findByPk(item.id);

        const updateDetailTra = await findDetailTra.update({
          orderId: item.orderId,
          qty: item.qty,
          subTotal: item.qty * dataDetailTra[item.id].PriceList.harga,
        });

        if (!updateDetailTra) {
          return response(res, 500, {
            errors: "update fail when id " + item.id,
          });
        }
      }

      const dataAfterUpdate = await Transaksi.findByPk(req.params.id, {
        include: {
          model: DetailTransaksi,
          include: {
            model: PriceList,
          },
        },
      });

      return response(res, 200, {
        message: "success update",
        data: dataAfterUpdate,
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

      if (findTra.status !== "dalam_antrian") {
        return response(res, 400, {
          errors: "fail to update when status not dalam_antrian",
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
      return await crud.readAll(req, res, {
        model: Transaksi,
        findQuery: {
          where: {
            customerId: req.userId,
          },
          include: {
            model: DetailTransaksi,
            include: {
              model: PriceList,
            },
          },
        },
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

      const findTra = findTraFromDB.map((x) => x.get({ plain: true }))[0]; // merubah menjadi object biasa

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
