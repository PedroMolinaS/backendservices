const { Router } = require('express')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios')
const { check } = require('express-validator')
const Role = require('../models/role')
const { validarCamposUsuario } = require('../middlewares/validarCamposUsuario')

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
    check('correo', 'Email invalido').isEmail(),
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('nombre', 'Longitud mínimo 3 caracteres').isLength({ min: 3 }),
    check('rol').custom( async(rol)=>{
        const existeRol = await Role.findOne({rol})
        if(!existeRol){
            throw new Error(`Rol ${rol}, no existe`)
        }
    }),
    validarCamposUsuario
], usuariosPost)

router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete)


module.exports = router