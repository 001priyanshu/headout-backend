const { Joi } = require("./index");

const checkAnswerSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required().messages({
      "string.base": `"id" should be a type of text`,
      "any.required": `"id" is a required field`,
    }),
    selectedAnswer: Joi.string().required().messages({
      "string.base": `"selectedAnswer" should be a type of text`,
      "any.required": `"selectedAnswer" is a required field`,
    }),
  }).required()
});

module.exports = {
  checkAnswerSchema,
};
