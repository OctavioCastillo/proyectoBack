const  jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler (async(req, res, next) => {
    let token
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //verificar la firma del token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario del payload del token y lo vamos a poner en un objeto
            req.user = await User.findById(decoded.idusuario).select('-password') //.select() quita el valor especificado

            next()

        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado') 
        }

    }

    if(!token){
        res.status(401)
        throw new Error ('Acceso no autorizado, token no proporcionado')
    }
})

module.exports = {
    protect
}