const { Router } = require('express')
const UserController = require('../../controllers/master/User.Controller')

const router = Router()

router.get('/', UserController.getAllUser)
router.get('/:id', UserController.getUserById)
router.post('/', UserController.craeteUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
