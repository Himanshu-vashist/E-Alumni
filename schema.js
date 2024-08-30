const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        name:Joi.string().required(),
        bio : Joi.string().required(),
        image:Joi.string().allow("",null),
        degree:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        graduationYear:Joi.number().required().min(0),
       
    }
    ).required()
});

module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),

    }).required(),
})