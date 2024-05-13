const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router()

// importar variables
const {getComment, createComment, updateComment, deleteComment} = require('../controllers/commentController')

router.route('/').post(protect, createComment)
router.route('/:id').get(getComment).put(protect, updateComment).delete(protect, deleteComment)

module.exports = router