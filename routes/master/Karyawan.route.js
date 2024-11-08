const { Router } = require('express')

const router = Router()

const middleware = require('../../middlewares/auth.middleware')
const KaryawanController = require('../../controllers/master/Karyawan.Controller')

router.get('/', middleware.checkRolesAndLogout(['Default Role', 'User']), KaryawanController.gatALl)
router.get('/:id', middleware.checkRolesAndLogout(['Default Role', 'User']), KaryawanController.getOneById)
router.post('/', middleware.checkRolesAndLogout(['Default Role', 'User']), KaryawanController.create)

module.exports = router
