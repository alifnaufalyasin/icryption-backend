const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define(
    'user',
    {
        nama : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email : {
            type : Sequelize.STRING
        },
        notelp : {
            type : Sequelize.STRING
        },
        fotoId : {
            type : Sequelize.STRING
        },
        status : {
            type : Sequelize.STRING
        },
        password : {
            type : Sequelize.STRING,
        }
    }
)

module.exports = User