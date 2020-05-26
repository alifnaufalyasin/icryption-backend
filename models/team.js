const Sequelize = require('sequelize')
const db = require('../config/database')

const Team = db.define(
    'team',
    {
        namaTeam : {
            type : Sequelize.STRING
        },
        daerah : {
            type : Sequelize.STRING
        },
        status : {
            type : Sequelize.STRING,
            allowNull : false
        }
    }
)

module.exports = Team