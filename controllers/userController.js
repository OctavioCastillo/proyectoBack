const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const getUserName = asyncHandler (async (req, res) =>{

    const userId = req.params.id

    if(!userId){
        res.status(400)
        throw new Error('Falta el id del usuario')
    }

    const name = await User.find({_id: userId})
    res.status(200).json(name)
})

const register = asyncHandler(async (req, res) => {

    //desestructurar un objeto 
    const {name, email, password} = req.body

    //verificar que me pasen los datos
    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Faltan datos')
    }

    //verificar que el usuario no existe
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('El usuario ya existe')
    }

    //Hacemos el HASH
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Crear un usuario
    const user = await User.create({
        name, //si la propiedad y la variable se llaman igual, se pueden quedar así
        email,
        password: hashedPassword
    })

    res.status(201).json(user)
})

const login = asyncHandler (async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(401)
        throw new Error ('Credenciales Incorrectas')
    }
})

const generarToken = (idusuario)=> {
    return jwt.sign({idusuario}, process.env.JWT_SECRET, { //3 parámetros: payload, llave secreta y opciones
        expiresIn: '30d'
    })
}

const showdata = asyncHandler (async (req, res) => {

    res.status(200).json(req.user) // se obtiene del authMiddleware
})


module.exports = {
    getUserName,
    register,
    login,
    showdata
}