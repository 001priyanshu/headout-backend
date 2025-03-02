const Joi = require("joi");

const validateRequest = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    return {
      success: false,
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    };
  }

  return { success: true, errors: [] };
};

module.exports = { validateRequest, Joi };
