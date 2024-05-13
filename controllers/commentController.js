const asyncHandler = require('express-async-handler')
const Comment = require('../models/commentsModel')

const getComment = asyncHandler (async (req, res) =>{

    const movieId = req.params.id

    if(!movieId){
        res.status(400)
        throw new Error('Falta el id de la película')
    }

    const comments = await Comment.find({movie: movieId})
    res.status(200).json(comments)
})

const createComment = asyncHandler (async (req, res) =>{ 
    
    if(!req.body.comment || !req.body.score || !req.body.movie){
        res.status(400)
        throw new Error('Faltan datos')
    }

    const comment = await Comment.create({
        comment: req.body.comment,
        score: req.body.score,
        user: req.user._id,
        movie: req.body.movie
    })

    res.status(201).json(comment)
})

const updateComment = asyncHandler (async (req, res) =>{

    const comment = await Comment.findById(req.params.id)

    if(!comment) {
        res.status(404)
        throw new Error('El comentario no existe')
    }

    const commentUpdated  = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(202).json(commentUpdated)
})

const deleteComment = asyncHandler (async (req, res) =>{

    const comment = await Comment.findById(req.params.id)

    if(!comment) {
        res.status(404)
        throw new Error('El comentario no existe')
    }

    await Comment.deleteOne(comment)
    res.status(202).json({id: req.params.id})
})

module.exports = {
    getComment,
    createComment,
    updateComment,
    deleteComment
}