const { Schema, model } = require('mongoose')

const ServicioSchema = Schema({
    grupo: {
        type: String,
        required: [true, 'El grupo es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
        // unique: true,
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    img: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }
})

ServicioSchema.methods.toJSON = function(){
    const {__v, estado,_id, ...servicios} = this.toObject()
    servicios.idservicio = _id
    return servicios
}

module.exports = model('Servicio', ServicioSchema)
