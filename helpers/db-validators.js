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
    existeCorreo = await Usuario.findOne({ correo: correo })
    if (existeCorreo) {
        throw res.status(400).json({ ok: false, msg: 'Correo ya existe' })
    }
}

const esGrupoValido = async (grupo) => {
    const existeGrupo = await Grupo.findOne({ grupo })
    if (!existeGrupo) {
        throw new Error(`Tipo de servicio ${grupo}, no existe`)
    }
}

const servicioExiste = async (nombre) => {
    const existeNombre = await Servicio.findOne({ nombre: nombre })
    if (existeNombre) {
        throw res.status(400).json({ ok: false, msg: 'El servicio ya existe' })
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    esGrupoValido,
    servicioExiste
}