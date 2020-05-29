const Joi = require('joi')

const loginSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(6),
})

const registerCpSchema = Joi.object().keys({
    token : Joi.string().required(),
    nama : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    notelp : Joi.string().min(6).required(),
    username : Joi.string().min(3).required(),
    password : Joi.string().min(6).required(),
    rePassword : Joi.string().min(6).required(),
    fotoId : Joi.any(),
})

const registerCtfSchema = Joi.object().keys({
    token : Joi.string().required(),
    namaTeam : Joi.string().min(3).required(),
    daerah : Joi.string().required(),
    username : Joi.string().min(3).required(),
    password : Joi.string().min(6).required(),
    rePassword : Joi.string().min(6).required(),
    dataPeserta : Joi.array().items(
        Joi.object({
            nama : Joi.string().min(3).required(),
            email : Joi.string().email().required(),
            notelp : Joi.string().min(6).required(),
            status : Joi.string().required()
        })
    )
})

module.exports = {
    loginSchema,
    registerCpSchema,
    registerCtfSchema
}