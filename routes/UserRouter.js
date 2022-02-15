const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const jwtCheck = require("../utils/CheckJwt");

router.post('/register', jwtCheck, userController.register)
router.get('/users', jwtCheck, userController.getUsers)
router.post("/block", jwtCheck, userController.blockUser)
router.post("/unblock", jwtCheck, userController.unBlockUser)
router.post("/delete", jwtCheck, userController.deleteUser)


module.exports = router