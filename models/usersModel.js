const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor teclea un nombre"]
    },
    email: {
        type: String,
        required: [true, "Por favor teclea un email"],
        unique: true //propiedad única
    },
    password: {
        type: String, //se guarda con el hash
        required: [true, "Pro favor teclea una contraseña"]
    },
    esAdmin: {
        type: Boolean,
        default: false //si al crearse un usuario no se le asigna un valor por defecto es false (en este caso)
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)