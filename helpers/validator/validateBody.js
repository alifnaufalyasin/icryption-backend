const Joi = require('joi')
const {response} = require('../wrapper')
const cloudinary = require('cloudinary')

const deleteFoto = async req => {
    if (req.files) {
        req.files.map(async item => {
            try {
                await cloudinary.v2.uploader.destroy(item.public_id)
            } catch (error) {
                console.log(error)
            }
        })
    }else if (req.file) {
        await cloudinary.v2.uploader.destroy(req.file.public_id)
    }
}

const validateBody = schema => {
    return async (req,res,next) => {
        const result = Joi.validate(req.body,schema,{abortEarly : false})
        if (result.error) {
            let errorData = []
            result.error.details.map(item => {
                let error = {
                    path : item.path[0],
                    message : item.message
                }
                errorData.push(error)
            })
            await deleteFoto(req)
            return response(res,false,errorData,'Validasi gagal',422)
        }
        next()
    }
}

module.exports = {
    validateBody,
    deleteFoto
}