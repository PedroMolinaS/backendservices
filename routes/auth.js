const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { validarCamposUsuario } = require('../middlewares/validarCamposUsuario')

const router = Router()

router.post('/login',[
    check('correo', 'Correo es obligatorio').isEmail(),
    check('password', 'Password es obligatorio').not().isEmpty(),
    validarCamposUsuario
],login)

module.exports = router