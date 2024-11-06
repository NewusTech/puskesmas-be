const { Router } = require('express')
const AuthController = require('../../controllers/Auth/Authentication.Controller')

const router = Router()

router.post('/register', AuthController.RegisterUser)
router.post('/login', AuthController.loginUser)
router.post('/logout', AuthController.logoutUser)

module.exports = router
