const asyncHandler = require('express-async-handler')
const Movie = require('../models/moviesModel')

const getMovie = asyncHandler (async (req, res) => {

    const movies = await Movie.find() 
    res.status(200).json(movies)
})

const createMovie = asyncHandler (async (req, res) =>{ 

    if(!req.body.title || !req.body.year || !req.body.director || !req.body.sinopsis || !req.body.img){
        res.status(400)
        throw new Error('Faltan datos')
    }

    if (req.user.esAdmin){
        const movie = await Movie.create({
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            sinopsis: req.body.sinopsis,
            img: req.body.img,
            admin: req.user._id
        })
        res.status(201).json(movie)
    }else{
        res.status(400)
        throw new Error('No eres admin')
    }

})

const updateMovie = asyncHandler (async (req, res) =>{

    const movie = await Movie.findById(req.params.id)

    if(!movie) {
        res.status(404)
        throw new Error('La película no existe')
    }

    if (req.user.esAdmin){
        const movieUpdated  = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(202).json(movieUpdated)
    }else {
        res.status(400)
        throw new Error('No eres admin')
    }

})

const deleteMovie = asyncHandler (async (req, res) =>{

    const movie = await Movie.findById(req.params.id)

    if(!movie) {
        res.status(404)
        throw new Error('La película no existe')
    }

    if(req.user.esAdmin){
        res.status(202).json({id: req.params.id})
        await Movie.deleteOne(movie)
    }else{
        res.status(405)
        throw new Error('No eres admin')
    }

})

module.exports = {
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}