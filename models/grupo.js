const {Schema, model} = require('mongoose')

const GrupoSchema = new Schema({
    grupo:{
        type: String,
        required: true
    }
})

module.exports = model('Grupo', GrupoSchema)
