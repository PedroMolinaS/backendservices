const { response } = require('express')
const Servicio = require('../models/servicio')
// const Role = require('../models/role')
// const {validationResult} = require('express-validator')
// const bcryptjs = require('bcryptjs')

const servicioGet = async (req, res = response) => {

    const servicio = await Servicio.find()

    res.status(200).json({
        ok: true,
        msg: 'es un GET',
        servicio
    })
}

const servicioGetByGroup = async (req=request, res = response) => {

    // const query = req.query
    const { grupo } = req.params
    const servicio = await Servicio.find({ grupo })

    res.status(200).json({
        ok: true,
        msg: 'es un GET de un grupo',
        servicio
    })
}

const servicioPost = async (req, res = response) => {

    const { grupo, nombre, descripcion, img = "", estado } = req.body

    const servicio = new Servicio({ grupo,nombre, descripcion, img, estado })

    // Encriptando la contraseña:
    // const salt = bcryptjs.genSaltSync()
    // usuario.password = bcryptjs.hashSync(password,salt)


    servicio.save()
    res.status(201).json({
        ok: true,
        msg: 'conforme POST',
        servicio
    })
}

const servicioPut = async (req, res = response) => {

    const { id } = req.params
    const {_id, ...resto} = req.body
    const servicio = await Servicio.findByIdAndUpdate(id, resto)

    res.status(201).json({
        ok: true,
        msg: 'conforme PUT',
        servicio
    })
}

const servicioDelete = async (req, res = response) => {

    const { id } = req.params

    const servicio = await Servicio.findByIdAndUpdate(id, {estado: false})

    res.status(201).json({
        ok: true,
        msg: 'conforme Delete'
    })
}

module.exports = {
    servicioGet,
    servicioGetByGroup,
    servicioPost,
    servicioPut,
    servicioDelete
}