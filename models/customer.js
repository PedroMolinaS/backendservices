const { Schema, model } = require('mongoose')


const CustomerSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    dni: {
        type: String,
        required: [true, 'El DNI es obligatorio'],
    },
    placa: {
        type: String,
    },
    rol: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true
    }
})

CustomerSchema.methods.toJSON = function(){
    const {__v, _id, ...customer} = this.toObject()
    customer.uid = _id
    return customer
}

module.exports = model('Customer', CustomerSchema)
