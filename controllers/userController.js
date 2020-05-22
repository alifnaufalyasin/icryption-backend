const {response,customError} = require('../helpers/wrapper')
const {hashPassword,comparePassword} = require('../helpers/hash')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const signToken = user => {
    return token = jwt.sign({
        iss : 'icryption',
        sub : user.id,
        iat : Date.now()
    } , process.env.API_KEY , {expiresIn : '24h'})
}

const index = async (req,res,next) => {
    const user = await User.findAll({})
    response(res,true,user,'Semua data sudah ditampilkan',200)
}

const login = async (req,res,next) => {
    const {email,password} = req.body
    const user = await User.findOne({where : {email}})
    // cek email valid atau tidak
    if (!user) return next(customError('Email yang dimasukan tidak benar',401))
    const result = comparePassword(password,user.password)
    // cek password
    if (!result) return next(customError('Password yang dimasukan tidak benar',401))
    // sign token
    const token = signToken(user)
    response(res,true,{token},'Login berhasil',200)
}

const register = async (req,res,next) => {
    const user = new User(req.body)
    user.password = hashPassword(req.body.password)
    user.status = 'Leader'
    await user.save()
    response(res,true,user,'Berhasil melakukan registrasi user',201)
}

module.exports = {
    index,
    login,
    register
}