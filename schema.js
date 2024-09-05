const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().required(),
    graduationYear: Joi.number().required(),
    degree: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});
module.exports.feedbackSchema = Joi.object({
  feedback: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      subject: Joi.string().required(),
      message: Joi.string().required(),
  }).required()
});