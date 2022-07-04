const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

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

const usuariosPut = async (req=request, res = response) => {

    const {id} = req.params
    const {_id, password, google,...resto} = req.body

    // TODO para validar contra BD: 
    
    if(password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.status(201).json({
        ok: true,
        msg: 'conforme PUT',
        id, usuario
    })
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params
    const usuarioAutenticado = req.usuario
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    if(!usuario){
        return res.status(401).json({msg: 'Token inválido - usuario no existe'})
    }

    // Verificar si usuario autenticado esta activo
    if(!usuario.estado){
        return res.status(401).json({msg: 'Token inválido - estado usuario inactivo'})
    }

    res.status(200).json({
        ok: true,
        msg: "conforme Delete",
        usuario,
        usuarioAutenticado
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}