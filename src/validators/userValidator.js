const { Joi } = require("./index");

const addUserSchema = Joi.object({
 body: Joi.object({
  userName: Joi.string().min(3).max(30).required().messages({
    "string.base": `"userName" should be a type of 'text'`,
    "string.min": `"userName" should have at least 3 characters`,
    "string.max": `"userName" should not exceed 30 characters`,
    "any.required": `"userName" is a required field`,
  }),
 }).required()
});

const updateScoreSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().required().messages({
      "string.base": `"userId" should be a type of 'text'`,
      "any.required": `"userId" is a required field`,
    }),
  }).required(),
 body: Joi.object({
  score: Joi.number().min(0).required().messages({
    "number.base": `"score" should be a number`,
    "number.min": `"score" should be at least 0`,
    "any.required": `"score" is a required field`,
  }),
 }).required()
});

const getUserSchema = Joi.object({
  params: Joi.object({
    userId: Joi.string().required().messages({
      "string.base": `"userId" should be a type of 'text'`,
      "any.required": `"userId" is a required field`,
    }),
  }).required()
});

module.exports = {
  addUserSchema,
  updateScoreSchema,
  getUserSchema,
};
