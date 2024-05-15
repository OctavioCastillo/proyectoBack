const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //es tipo id de un objeto
        required: true,
        ref:'User' //busca el object id en la coleccion user
    },
    comment: {
        type: String,
        required : [true, "Por favor ingresa tu comentario"]
    },
    score: {
        type: Number,
        required : [true, "Por favor califica la película"]
    },
    movie: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // mongo crea 2 campos, para la fecha de creación y de update
})

module.exports = mongoose.model('Comment', commentSchema)