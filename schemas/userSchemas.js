const Joi = require('joi')

const loginSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(6),
})

const registerSchema = Joi.object().keys({
    nama : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    notelp : Joi.string().min(6).required(),
    password : Joi.string().min(6).required(),
    rePassword : Joi.string().min(6).required(),
})

module.exports = {
    loginSchema,
    registerSchema
}