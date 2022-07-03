const { Router } = require('express')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios')
const { check } = require('express-validator')
const { validarCamposUsuario } = require('../middlewares/validarCamposUsuario')
const { esRolValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators')

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
    check('correo', 'Email invalido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('nombre', 'Longitud mínimo 3 caracteres').isLength({ min: 3 }),
    check('rol').custom(esRolValido),
    validarCamposUsuario
], usuariosPost)

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCamposUsuario
], usuariosPut)

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCamposUsuario
], usuariosDelete)


module.exports = router