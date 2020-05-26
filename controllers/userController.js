const {response,customError} = require('../helpers/wrapper')
const {hashPassword,comparePassword} = require('../helpers/hash')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Team = require('../models/team')
const {deleteFoto} = require('../helpers/validator/validateBody')

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

const registerCp = async (req,res,next) => {
    if (!req.file) return response(res,false,null,'Photo is null',422)
    // create user
    const user = new User(req.body)
    user.fotoId = req.file.url
    user.status = 'Leader'
    await user.save()
    // create team 
    const team = new Team(
        {
            status : 'CP'
        }
    )
    await team.save()
    // tambahkan relasi
    user.setTeam(team)
    response(res,true,{user,team},'Berhasil melakukan registrasi lomba CP',201)
}

const registerCtf = async (req,res,next) => {
    const {dataPeserta} = req.body
    const {namaTeam, daerah} = req.body
    const {files} = req
    let pesertaArr = []
    if (dataPeserta.length !== files.length) {
        await deleteFoto(req)
        return response(res,false,null,'Tidak dapat memproses data yang kurang, silahkan lengkapi data atau hubungi panitia',422)
    }
    // create team
    const team = await Team.create({
        namaTeam ,
        daerah,
        status : 'CTF'
    })
    // create user
    for (let i = 0; i < dataPeserta.length; i++) {
        let {nama,email,notelp,status} = dataPeserta[i]
        let index = pesertaArr.length
        let user = await User.create({
            nama,email,notelp,status,
            fotoId : files[index].url
        })
        pesertaArr.push(user)
        user.setTeam(team)
    }
    response(res,true,{team,pesertaArr},'Berhasil melakukan registrasi lomba CTF',201)
}

module.exports = {
    index,
    login,
    registerCp,
    registerCtf
}