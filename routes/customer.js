const { Router } = require('express')
const { check } = require('express-validator')
const { loginCustomer, customersGet, customerPost } = require('../controllers/customer')
const { validarCamposCustomer } = require('../middlewares/validarCamposUsuario')

const router = Router()

router.get('/', customersGet)

router.post('/', [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('dni', 'DNI es requerido').not().isEmpty(),
    check('correo', 'Email invalido').isEmail(),
    validarCamposCustomer
], customerPost)

router.post('/logincustomer',[
    check('dni', 'Dni es obligatorio').not().isEmpty(),
    validarCamposCustomer
],loginCustomer)

module.exports = router