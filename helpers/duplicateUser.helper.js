const { responseObject } = require("./response.helper");

const response = responseObject;

const isDuplicateUser = async (req, res, model) => {
  try {
    const username = req.body?.username ? req.body?.username : "";
    const email = req.body?.email ? req.body?.email : "";
    const user = await model.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (user) {
      if (username) {
        return response(res, 422, { errors: "username is already use" });
      }
      if (email) {
        return response(res, 422, { errors: "email is already use" });
      }
    }

    return response(res, 200, { message: "is duplicate user" });
  } catch (e) {
    return response(res, 500, {
      message: "500 internal server error",
      errors: e,
    });
  }
};
