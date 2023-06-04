const { response } = require("../../helpers");

class CustomerController {
  async store(req, res) {
    try {
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

module.exports = new CustomerController();
