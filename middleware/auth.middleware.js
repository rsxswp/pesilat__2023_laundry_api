class AuthMiddleware {
  async isTrue(req, res, next) {}

  async isAdmin(req, res, next) {}

  async isKaryawan(req, res, next) {}

  async isCustomer(req, res, next) {}
}

module.exports = new AuthMiddleware();
