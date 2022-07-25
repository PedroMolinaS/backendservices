const { response } = require('express')
const { generarJWTcustomer } = require('../helpers/generar-jwt')
const Customer = require('../models/customer')

const customersGet = async (req, res = response) => {

    const customer = await Customer.find()

    res.status(200).json({
        ok: true,
        msg: 'es un GET',
        customer
    })
}

const customerPost = async (req, res = response) => {

    const {nombre, correo,dni, placa, rol} = req.body

    const customer = new Customer({nombre, correo,dni, placa, rol})

    customer.save()
    res.status(201).json({
        ok: true,
        msg: 'conforme POST',
        customer
    })
}

const loginCustomer = async (req, res = response) => {

    const { dni, nombre, placa } = req.body

    try {

        // Verificar si email existe
        const customer = await Customer.findOne({ dni })
        if (!customer) {
            return res.status(400).json({ msg: 'DNI no registrado' })
        }

        // verificar si usuario esta activo
        if (!customer.estado) {
            return res.status(400).json({ msg: 'Cliente inactivo' })
        }

        // Generar JWT
        const token = await generarJWTcustomer(customer.id, nombre, placa, dni)

        res.status(201).json({
            ok: true,
            customer,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'algo salio mal' })
    }
}



module.exports = {
    loginCustomer,
    customersGet,
    customerPost
}