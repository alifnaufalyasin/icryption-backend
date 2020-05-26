const router = require('express-promise-router')()
const userController = require('../controllers/userController')

// validation
const {validateBody} = require('../helpers/validator/validateBody')
const validator = require('../helpers/validator/userValidator')
const userSchemas = require('../schemas/userSchemas')
// jwt strategy
const passport = require('passport')
const authConfig = require('../helpers/auth')

router.route('/')
    .get(passport.authenticate('jwt',{session : false}), userController.index)

router.route('/login')
    .post( 
        validateBody(userSchemas.loginSchema) , 
        userController.login
    )

router.route('/register')
    .post(
        validateBody(userSchemas.registerSchema),
        validator.validateEmail(),
        validator.validateRepassword(),
        userController.register
    )
module.exports = router