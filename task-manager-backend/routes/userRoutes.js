const express = require('express')
const router = express.Router()
const { testUserRoute } = require('../controllers/userController')

// other test 
router.get('/',testUserRoute)

module.exports = router
