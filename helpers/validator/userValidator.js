const User = require('../../models/user')
const Team = require('../../models/team')
const {response} = require('../wrapper')
const {deleteFoto} = require('./validateBody')
const axios = require('axios')
require('dotenv').config()

const validateEmailAndUsername = () => {
    return async (req,res,next) => {
        const {email,username} = req.body
        const user = await User.findOne({where : {email}})
        const userName = await Team.findOne({where : {username}})
        if (user && userName) {
            deleteFoto(req)
            return response(res,false,null,'Email dan Username sudah digunakan',400)
        }else if (user) {
            deleteFoto(req)
            return response(res,false,null,'Email sudah digunakan',400)
        }else if (userName){
            deleteFoto(req)
            return response(res,false,null,'Username sudah digunakan',400)
        }
        next()
    }
}

const validateAllEmailandUsername = () => {
    return async (req,res,next) => {
        const {dataPeserta,username} = req.body
        const userName = await Team.findOne({where : {username}})
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
        if (errData.length !== 0 && userName) {
            deleteFoto(req)
            return response(res,false,errData,`Username dan Email sudah digunakan, silahkan cek kembali Username team anda dan Email setiap anggota`,400)
        }else if (errData.length !== 0) {
            deleteFoto(req)
            return response(res,false,errData,`Email sudah digunakan, silahkan cek kembali Email setiap anggota`,400)
        }else if (userName) {
            deleteFoto(req)
            return response(res,false,errData,`Email sudah digunakan, silahkan cek kembali Email setiap anggota`,400)
        }
        next()
    }
}

const validateRepassword = () => {
    return async (req,res,next) => {
        const {password, rePassword} = req.body
        if (password !== rePassword) {
            deleteFoto(req)
            return response(res,false,null,'Re-Password tidak sesuai dengan password',400)
        }
        next()
    }
}

const parseDataPeserta = () => {
    return async (req,res,next) => {
        req.body.dataPeserta = JSON.parse(req.body.dataPeserta)
        next()
    }
}

const validateCaptcha = () => {
    return async (req,res,next) => {
        const secret_key = process.env.SECRET_KEY;
        const token = req.body.token;
        console.log(token);
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
        const hasil = await axios({
            method: 'post',
            url: url,
        })
        console.log(hasil.data)
        if(hasil.data.success && (hasil.data.score >= 0.5)){
            delete req.body.token
        }else{
            return response(res,false,null,'Maaf, kami mendeteksi adanya bot',400)
        }
        next()
    }
}

module.exports = {
    validateEmailAndUsername,
    validateRepassword,
    parseDataPeserta,
    validateAllEmailandUsername,
    validateCaptcha
}