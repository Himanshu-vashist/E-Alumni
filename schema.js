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

module.exports.postSchema = Joi.object({
  post: Joi.object({
      title: Joi.string().required(), // Title is required and should be a string
      content: Joi.string().min(10).required(), // Content should be at least 10 characters long
      type: Joi.string().valid('news', 'blog', 'announcement', 'event').required() // Type must be one of the defined options
  }).required()
});