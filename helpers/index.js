const uuidType = require("./uuidType.helper");

const addRoutesApi = require("./addRoutesApi.helper");
const validator = require("./validator.helper");
const { response, responseObject } = require("./response.helper");
const crud = require("./crud.helper");
const nextRequest = require("./nextRequest.helper");
const register = require("./register.helper");

module.exports = {
  uuidType,
  addRoutesApi,
  validator,
  response,
  crud,
  nextRequest,
  register,
  responseObject,
};
