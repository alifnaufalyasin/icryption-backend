const Joi = require('joi')

const loginSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(6),
})

const registerCpSchema = Joi.object().keys({
    nama : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    notelp : Joi.string().min(6).required(),
    fotoId : Joi.any()
})

const registerCtfSchema = Joi.object().keys({
    namaTeam : Joi.string().min(3).required(),
    daerah : Joi.string().required(),
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