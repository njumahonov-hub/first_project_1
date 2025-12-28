const joi = require("joi");

exports.UserValidator = function (data) {
  try {
    const schema = joi.object({
      username: joi.string().trim().pattern(new RegExp("^[a-zA-Z0-9]$")).required(),
      email: joi.string().trim().max(50).email().required(),
      password: joi.string().trim().min(8).max(200).required(),
    });

    return schema.validate(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
