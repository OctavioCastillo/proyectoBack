const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

// importar variables
const {login, register, showdata} = require('../controllers/userController')

router.post('/login', login) //público
router.post('/register', register) //público
router.get('/showdata', protect, showdata) //privado

module.exports = router