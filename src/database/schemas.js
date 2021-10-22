const Joi = require('joi');


const productCreationSchema = Joi.object({
    amazon_link: Joi.string().min(10).required(),
})


module.exports = {
    productCreationSchema,
};