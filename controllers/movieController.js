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

    const movie = await Movie.create({
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        sinopsis: req.body.sinopsis,
        img: req.body.img
    })

    res.status(201).json(movie)
})

const updateMovie = asyncHandler (async (req, res) =>{

    const movie = await Movie.findById(req.params.id)

    if(!movie) {
        res.status(404)
        throw new Error('La película no existe')
    }

    const movieUpdated  = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(202).json(movieUpdated)
})

const deleteMovie = asyncHandler (async (req, res) =>{

    const movie = await Movie.findById(req.params.id)

    if(!movie) {
        res.status(404)
        throw new Error('La película no existe')
    }

    await Movie.deleteOne(movie)
    res.status(202).json({id: req.params.id})
})

module.exports = {
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}