const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

// importar variables
const {login, register, showdata, getUserName} = require('../controllers/userController')

router.post('/login', login) //público
router.post('/register', register) //público
router.get('/showdata', protect, showdata) //privado
router.get('/:id', getUserName)

module.exports = router