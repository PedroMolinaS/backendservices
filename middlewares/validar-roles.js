const { response } = require("express")


const esAdminRole = (req, res= response, next) => {

    if(!req.usuario){
        return res.status(500).json({msg: 'Se quiere verificar el role sin validar el token primero'})
    }
    
    const {rol} = req.usuario
    
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({msg: 'no es admin'})
    }
    
    next()
}

const tieneRole = (...roles) => {
    
    return (req, res = response, next) => {
        
        if(!req.usuario){
            return res.status(500).json({msg: 'Se quiere verificar el role sin validar el token primero'})
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({msg: 'No tiene un rol valido'})
        }

        next()
    }    


}

module.exports = {
    esAdminRole,
    tieneRole
}