const { response, register, crud } = require("../../helpers");
const { Customer, User, Role, sequelize } = require("./../../models");
class CustomerController {
  async storeOnlyCustomer(req, res) {
    try {
      const body = req.body;
      body.userId = req.userId;

      return await crud.create(req, res, {
        model: Customer,
        requestBody: body,
        validateSchema: {
          namaLengkap: {
            type: "string",
          },
          alamat: {
            type: "string",
          },
          noTelp: {
            type: "string",
          },
          userId: {
            type: "string",
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
  async update(req, res) {
    try {
    } catch (e) {
      return response(res, 500, {
        errors: e,
        message: "500 internal server error",
      });
    }
  }

  async storeWithUser(req, res) {
    try {
      // akan menggunakan method register dari register helper, jadi key req body untuk regster nya harus disamaain seperti request register

      const dataRegister = await register(req, res, ["CUSTOMER"], {
        model: [User, Role],
      });

      if (!dataRegister.statusBoolean) {
        return response(res, dataRegister.statusCode, {
          data: dataRegister.data,
          errors: dataRegister.errors,
          message: dataRegister.message,
        });
      }

      const bodyCustomer = {};
      // filter key
      for (const key in req.body) {
        switch (key) {
          case "namaLengkap":
            bodyCustomer.namaLengkap = req.body[key];
            break;
          case "alamat":
            bodyCustomer.alamat = req.body[key];
            break;
          case "noTelp":
            bodyCustomer.noTelp = req.body[key];
            break;
        }
      }

      bodyCustomer.adminId = req.userId;
      bodyCustomer.customerId = dataRegister.data.id;
      // return res.send(bodyCustomer);
      const insertCustomer = await crud.create(req, res, {
        model: Customer,
        requestBody: bodyCustomer,
        validateSchema: {
          namaLengkap: {
            type: "string",
          },
          alamat: {
            type: "string",
          },
          noTelp: {
            type: "string",
          },
          adminId: {
            type: "string",
          },
          customerId: {
            type: "string",
          },
        },
      });

      return insertCustomer;
    } catch (e) {
      console.log(">>> err store with regis  =", e);
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

module.exports = new CustomerController();
