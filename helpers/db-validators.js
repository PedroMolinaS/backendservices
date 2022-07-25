const Role = require('../models/role')
const Usuario = require('../models/usuario')
const Grupo = require('../models/grupo')
const Servicio = require('../models/servicio')

const esRolValido = async (rol) => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`Rol ${rol}, no existe`)
    }
}

const emailExiste = async (correo) => {
    existeCorreo = await Usuario.findOne({ correo: correo, estado:true })
    if (existeCorreo) {
        throw new Error('Correo ya existe')
    }
}
const existeUsuarioById = async (id) => {
    existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error('Usuario inválido')
    }
}

const esGrupoValido = async (grupo) => {
    const existeGrupo = await Grupo.findOne({ grupo })
    if (!existeGrupo) {
        throw new Error(`Tipo de servicio ${grupo}, no existe`)
    }
}

const servicioExiste = async (nombre) => {
    const existeNombre = await Servicio.findOne({ nombre: nombre, estado:true })
    console.log({existeNombre})
    if (existeNombre) {
        throw new Error('El servicio ya existe')
    }
}

const servicioExisteById = async (id) => {
    const existeNombreById = await Servicio.findById(id)
    
    if (!existeNombreById) {
        throw new Error('Servicio Inválido')
    }
}

const customerExiste = async (dni) => {
    const existeCustomer = await Customer.findOne({ dni: dni, estado:true })
    // console.log({existeNombre})
    if (existeCustomer) {
        throw new Error('El servicio ya existe')
    }
}


const existeCustomerById = async (id) => {
    existeCustomer = await Customer.findById(id)
    if (!existeCustomer) {
        throw new Error('Cliente inválido')
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioById,
    esGrupoValido,
    servicioExiste,
    servicioExisteById,
    existeCustomerById,
    customerExiste
}