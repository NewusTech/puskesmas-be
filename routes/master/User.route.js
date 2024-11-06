const { Router } = require('express')
const UserController = require('../../controllers/master/User.Controller')

const router = Router()

const middleware = require('../../middlewares/auth.middleware')

router.get('/', middleware.checkRolesAndLogout(['Default Role', 'User']), UserController.getAllUser)
router.get('/:id', middleware.checkRolesAndLogout(['Default Role', 'User']), UserController.getUserById)
router.post('/', middleware.checkRolesAndLogout(['Default Role', 'User']), UserController.craeteUser)
router.put('/:id', middleware.checkRolesAndLogout(['Default Role', 'User']), UserController.updateUser)
router.delete('/:id', middleware.checkRolesAndLogout(['Default Role', 'User']), UserController.deleteUser)

module.exports = router
