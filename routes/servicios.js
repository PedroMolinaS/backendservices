const { Router } = require('express')
const { check } = require('express-validator')
const { validarCamposServicio } = require('../middlewares/validarCamposUsuario')
const { servicioGet, servicioPost, servicioPut, servicioDelete, servicioGetByGroup } = require('../controllers/servicios')
const Grupo = require('../models/grupo')

const router = Router()

router.get('/', servicioGet)

router.get('/:grupo', servicioGetByGroup)

router.post('/', [
    // check('correo', 'Email invalido').isEmail(),
    check('nombre', 'Nombre del servicio es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    // check('nombre', 'Longitud mínimo 3 caracteres').isLength({ min: 3 }),
    check('grupo').custom( async(grupo)=>{
        const existeGrupo = await Grupo.findOne({grupo})
        if(!existeGrupo){
            throw new Error(`Tipo de servicio ${grupo}, no existe`)
        }
    }),
    // validarCamposUsuario
    validarCamposServicio
], servicioPost)

router.put('/:id', servicioPut)

router.delete('/:id', servicioDelete)


module.exports = router