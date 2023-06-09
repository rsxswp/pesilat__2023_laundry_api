const response = (
  res,
  status,
  { message = null, data = null, errors = null }
) => {
  if (errors) {
    return res.status(status).json({
      status_bool: false,
      message: message,
      data: null,
      errors,
    });
  } else {
    return res.status(status).json({
      status_bool: true,
      message,
      data,
      errors,
    });
  }
};

const responseObject = (
  res,
  statusCode,
  { message = null, data = null, errors = null }
) => {
  return {
    statusBoolean: !errors ? true : false,
    statusCode,
    message,
    data,
    errors,
  };
};

module.exports = { responseObject, response };
