const User = require('../../models/user')
const {response} = require('../wrapper')
const {deleteFoto} = require('./validateBody')

const validateEmail = () => {
    return async (req,res,next) => {
        const {email} = req.body
        const user = await User.findOne({where : {email}})
        if (user) {
            deleteFoto(req)
            return response(res,false,null,'Email sudah digunakan',400)
        }
        next()
    }
}

const validateAllEmail = () => {
    return async (req,res,next) => {
        const {dataPeserta} = req.body
        let errData = []
        for (let i = 0; i < dataPeserta.length; i++) {
            try {
                let {email} = dataPeserta[i]
                let user = await User.findOne({where : {email}})
                if (user) {
                    errData.push({email , index : i})
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (errData.length !== 0) {
            deleteFoto(req)
            return response(res,false,errData,`Email ini sudah digunakan`,400)
        }
        next()
    }
}

const validateRepassword = () => {
    return async (req,res,next) => {
        const {password, rePassword} = req.body
        if (password !== rePassword) return response(res,false,null,'rePassword tidak sesuai dengan password',400)
        next()
    }
}

const parseDataPeserta = () => {
    return async (req,res,next) => {
        req.body.dataPeserta = JSON.parse(req.body.dataPeserta)
        next()
    }
}

module.exports = {
    validateEmail,
    validateRepassword,
    parseDataPeserta,
    validateAllEmail
}