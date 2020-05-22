const User = require('../../models/user')
const {response} = require('../wrapper')

const validateEmail = () => {
    return async (req,res,next) => {
        const {email} = req.body
        const user = await User.findOne({where : {email}})
        if (user) return response(res,false,null,'Email sudah digunakan',400)
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

module.exports = {
    validateEmail,
    validateRepassword
}