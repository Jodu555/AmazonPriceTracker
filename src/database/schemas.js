const Joi = require('joi');

const userRegisterSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(5).max(50).required(),
    email: Joi.string().email().required(),
});


const productCreationSchema = Joi.object({
    amazon_link: Joi.string().min(10).required(),
})


module.exports = {
    productCreationSchema,
};