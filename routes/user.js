const router = require('express-promise-router')()
const userController = require('../controllers/userController')
const upload = require('../helpers/upload')
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

router.route('/registerCp')
    .post(
        upload.single('fotoId'),
        validateBody(userSchemas.registerCpSchema),
        validator.validateEmailAndUsername(),
        validator.validateRepassword(),
        userController.registerCp
    )

router.route('/registerCtf')
    .post(
        upload.array('fotoId',3),
        validator.parseDataPeserta(),
        validateBody(userSchemas.registerCtfSchema),
        validator.validateAllEmailandUsername(),
        validator.validateRepassword(),
        userController.registerCtf
    )

router.route('/cekEmail/:email')
    .get(userController.cekEmail)

router.route('/cekUsername/:username')
    .get(userController.cekUsername)


module.exports = router