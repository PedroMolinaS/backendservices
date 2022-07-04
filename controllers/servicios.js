const { response } = require('express')
const Servicio = require('../models/servicio')
// const Role = require('../models/role')
// const {validationResult} = require('express-validator')
// const bcryptjs = require('bcryptjs')

const servicioGet = async (req = request, res = response) => {

    const { limite = 20, desde = 0 } = req.query

    const [total, servicios] = await Promise.all([
        Servicio.countDocuments({ estado: true }),
        Servicio.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.status(200).json({
        ok: true,
        total,
        servicios
    })
}

const servicioGetByGroup = async (req = request, res = response) => {

    const { limite = 20, desde = 0 } = req.query
    const { grupo } = req.params

    const [total, servicios] = await Promise.all([
        Servicio.countDocuments({ grupo, estado: true }),
        Servicio.find({ grupo, estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.status(200).json({
        ok: true,
        total,
        servicios
    })
}

const servicioPost = async (req, res = response) => {

    const { grupo, nombre, descripcion, img = "", estado } = req.body

    const servicio = new Servicio({ grupo, nombre, descripcion, img, estado })

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
    const { _id, ...resto } = req.body
    const servicio = await Servicio.findByIdAndUpdate(id, resto)

    res.status(201).json({
        ok: true,
        msg: 'conforme PUT',
        servicio
    })
}

const servicioDelete = async (req, res = response) => {

    const { id } = req.params

    const servicio = await Servicio.findByIdAndUpdate(id, { estado: false })

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