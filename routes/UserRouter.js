const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const jwtCheck = require("../utils/CheckJwt");

router.post('/register', userController.register)
router.get('/users', userController.getUsers)
router.post("/block", userController.blockUser)
router.post("/unblock", userController.unBlockUser)
router.post("/delete", userController.deleteUser)


module.exports = router