const { request, response } = require("express")
const jwt = require('jsonwebtoken')
const Customer = require("../models/customer")
const Usuario = require("../models/usuario")

const validarJWT = async (req= request, res= response, next) => {

    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({msg: 'Token inválido'})
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const usuario = await Usuario.findById(uid)
        req.usuario = usuario
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg: 'Token inválido'})
    }

}

const validarJWTcustomer = async (req= request, res= response, next) => {

    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({msg: 'Token inválido'})
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const customer = await Customer.findById(uid)
        req.customer = customer
        
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({msg: 'Token inválido'})
    }

}


module.exports = {
    validarJWT,
    validarJWTcustomer
}
