const Joi = require("joi");

    const campgroundSchema = Joi.object({

        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
})


module.exports.campgroundSchema = campgroundSchema;