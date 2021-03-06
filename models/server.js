const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.servicioPath = '/api/services'
        this.usuarioPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.customerPath = '/api/customer'
        this.conectarDB()
        this.middlewares()
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())

        // Lectura y parseo del Body
        this.app.use(express.json())

        // Directorio Publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.customerPath, require('../routes/customer'))
        this.app.use(this.servicioPath, require('../routes/servicios'))
        this.app.use(this.usuarioPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Conectado en: http://localhost:${this.port}`)
        })
    }

}

module.exports = Server