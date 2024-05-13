const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

// importar variables
const {getMovie, createMovie, updateMovie, deleteMovie} = require('../controllers/movieController')

router.route('/').get(getMovie).post(protect, createMovie)
router.route('/:id').put(protect, updateMovie).delete(protect, deleteMovie)

module.exports = router