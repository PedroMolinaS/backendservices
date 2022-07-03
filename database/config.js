const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conexion a DB exitosa');

    } catch (error) {
        console.error(error)
        throw new Error('Error al conectar BD');
    }

}

module.exports = {
    dbConnection
}
