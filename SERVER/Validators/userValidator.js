const joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const userSchema = joi.object({
  name: joi.string().required(),
  user_name: joi.string().required(),
  password: joi.string().required(),
  religion: joi.string().required(),
});

exports.userValidator = validator(userSchema);
