const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const cors = require('cors')
// another file
const {response} = require('./helpers/wrapper')
const {deleteFoto} = require('./helpers/validator/validateBody')
// database and relation
const db = require('./config/database')
const relation = require('./config/relation')

// cors
var allowedOrigins = [
    "http://127.0.0.1:5501",
    "http://localhost:3001",
    "bot-linecoba.herokuapp.com",
    "icyption.aliven.my.id",
    "https://icyption.aliven.my.id",
    "http://icyption.aliven.my.id"
]

app.use(
    cors({
        origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
        }
    })
)

// middleware
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// router
const userRoute = require('./routes/user')

app.get('/', function(req,res){
    res.send('Hello')
})
app.use('/api/users' , userRoute)

// error handling
app.use((req,res,next) => {
    let err = new Error('Route not found')
    err.status = 404
    next(err)
})

app.use(async (err,req,res,next) => {
    deleteFoto(req)
    const {message} = err
    const status = err.status || 500
    console.log(err)
    response(res,false,null,message,status)
})


const port = process.env.PORT || 3000

app.listen(port , () => {
    db.sync({})
    .then(() => console.log(`app is running on port ${port}`))
    .catch(err => console.log(err.message))
}) 