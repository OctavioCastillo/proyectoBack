const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Por favor ingresa nombre"]
    },
    year: {
        type: Number,
        required: [true, "Ingresa un año"]
    },
    director: {
        type: String,
        required: [true, "Ingresa el director"]
    },
    score: {
        type: Number,
        default: 0
    },
    sinopsis: {
        type: String,
        required: [true, "Ingresa la sinopsis"]
    },
    img : {
        type: String,
        required: [true, "Ingresa la imagen de la película"]
    }
}, {
    timestamps: true // mongo crea 2 campos, para la fecha de creación y de update
})

module.exports = mongoose.model('Movie', movieSchema)