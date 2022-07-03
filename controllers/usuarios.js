const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const {validationResult} = require('express-validator')
const Role = require('../models/role')

const usuariosGet = async (req, res = response) => {

    const usuario = await Usuario.find()

    res.status(200).json({
        ok: true,
        msg: 'es un GET',
        usuario
    })
}

const usuariosPost = async (req, res = response) => {

    const {nombre, correo,password, rol, google = false} = req.body

    const usuario = new Usuario({nombre, correo, password, rol, google})

    // consulto si correo existe:
    const existeCorreo = await Usuario.findOne({correo : correo})
    if(existeCorreo){
        return res.status(400).json({ok: false, msg: 'Correo ya existe'})
    }

    // Encriptando la contraseña:
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password,salt)


    usuario.save()
    res.status(201).json({
        ok: true,
        msg: 'conforme POST',
        usuario
    })
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params
    const usuario = await Usuario.findOne({id})
    const {nombre, apellido, edad} = req.body

    // Actualizando:
    usuario.nombre = nombre
    usuario.apellido = apellido
    usuario.edad = edad

    usuario.save()
    res.status(201).json({
        ok: true,
        msg: 'conforme PUT',
        id, usuario
    })
}

const usuariosDelete = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'conforme Delete'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}