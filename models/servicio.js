const { Schema, model } = require('mongoose')


const ServicioSchema = Schema({
    grupo: {
        type: String,
        required: [true, 'El grupo es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        unique: true,
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Servicio', ServicioSchema)
