const Joi = require('joi');

const userRegisterSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(5).max(50).required(),
    email: Joi.string().email().required(),
});

const userLoginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().alphanum().min(8).max(50).required(),
}).xor('username', 'email');

const productCreationSchema = Joi.object({
    amazon_link: Joi.string().min(10).required(),
})


module.exports = {
    userRegisterSchema,
    userLoginSchema,
    productCreationSchema,
};