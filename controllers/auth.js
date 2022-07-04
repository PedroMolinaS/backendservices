const { response } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req, res = response) => {

    const { correo, password } = req.body

    try {

        // Verificar si email existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({msg: 'Usuario / Password incorrectos - correo'})
        }

        // verificar si usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({msg: 'Usuario / Password incorrectos - estado: false'})
        }
        
        // Verificar contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validaPassword){
            return res.status(400).json({msg: 'Usuario / Password incorrectos - password'})
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.status(201).json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'algo salio mal' })
    }
}



module.exports = {
    login
}