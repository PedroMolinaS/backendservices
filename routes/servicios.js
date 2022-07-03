const { Router } = require('express')
const { check } = require('express-validator')
const { validarCamposServicio } = require('../middlewares/validarCamposUsuario')
const { servicioGet, servicioPost, servicioPut, servicioDelete, servicioGetByGroup } = require('../controllers/servicios')
const { esGrupoValido, servicioExiste, servicioExisteById } = require('../helpers/db-validators')

const router = Router()

router.get('/', servicioGet)

router.get('/:grupo', servicioGetByGroup)

router.post('/', [
    check('nombre', 'Nombre del servicio es requerido').not().isEmpty(),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('grupo').custom(esGrupoValido),
    check('nombre').custom(servicioExiste),
    validarCamposServicio
], servicioPost)

router.put('/:id',[
    check('id', 'No es un ID de servicio valido').isMongoId(),
    check('id').custom(servicioExisteById),
    check('descripcion', 'La descripcion es requerida').not().isEmpty(),
    check('grupo').custom(esGrupoValido),
    validarCamposServicio
], servicioPut)

router.delete('/:id', [
    check('id', 'No es un ID de servicio valido').isMongoId(),
    check('id').custom(servicioExisteById),
    validarCamposServicio
], servicioDelete)


module.exports = router